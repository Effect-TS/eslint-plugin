import { createFromBuffer } from "@dprint/formatter"
import { getPath } from "@dprint/typescript"
import { ConfigSchema } from "@effect/eslint-plugin/Dprint"
import type { Addition, Removal, Replacement } from "@effect/eslint-plugin/Diff"
import { DiffIterator } from "@effect/eslint-plugin/DiffIterator"
import * as RegularExpression from "@effect/eslint-plugin//RegularExpression"
import * as Fs from "fs"
import * as path from "path"
import { createRule } from "@effect/eslint-plugin/utils/eslint"

const formatter = createFromBuffer(Fs.readFileSync(getPath()))

export interface Message {
  messageId: keyof (typeof dprint)["meta"]["messages"]
  data: Record<string, string>
}

/**
 * Count line breaks in the head whitespace sequence.
 */
function getLineNumberOfFirstCode(s: string): number {
  const match = RegularExpression.STARTS_WITH_WHITESPACE_REGEX.exec(s)
  if (match == null) {
    return 0
  }
  const m0 = match[0]
  if (m0 == null) {
    return 0
  }
  let count = 0
  while (RegularExpression.GLOBAL_LINE_BREAK_REGEX.exec(m0) != null) {
    count += 1
  }
  return count
}

/**
 * Create the report message of a given difference.
 */
function createMessage(diff: Addition | Removal | Replacement): Message {
  switch (diff._tag) {
    case "Addition": {
      if (RegularExpression.isWhitespace(diff.newText)) {
        if (RegularExpression.hasLineBreak(diff.newText)) {
          return {
            messageId: "requireLinebreak",
            data: {},
          }
        }
        return {
          messageId: "replaceWhitespace",
          data: {},
        }
      }
      return {
        messageId: "requireCode",
        data: {
          text: JSON.stringify(diff.newText.trim()),
        },
      }
    }
    case "Removal": {
      if (RegularExpression.isWhitespace(diff.oldText)) {
        if (RegularExpression.hasLineBreak(diff.oldText)) {
          return {
            messageId: "extraLinebreak",
            data: {},
          }
        }
        return {
          messageId: "extraWhitespace",
          data: {},
        }
      }
      return {
        messageId: "extraCode",
        data: {
          text: JSON.stringify(diff.oldText.trim()),
        },
      }
    }
    case "Replacement": {
      if (
        RegularExpression.isWhitespace(diff.oldText) &&
        RegularExpression.isWhitespace(diff.newText)
      ) {
        const oldHasLinebreak = RegularExpression.hasLineBreak(diff.oldText)
        const newHasLinebreak = RegularExpression.hasLineBreak(diff.newText)
        return {
          messageId:
            !oldHasLinebreak && newHasLinebreak
              ? "requireLinebreak"
              : oldHasLinebreak && !newHasLinebreak
              ? "extraLinebreak"
              : "replaceWhitespace",
          data: {},
        }
      }

      if (diff.oldText.trim() == diff.newText.trim()) {
        const oldLine = getLineNumberOfFirstCode(diff.oldText)
        const newLine = getLineNumberOfFirstCode(diff.newText)
        return {
          messageId:
            newLine > oldLine
              ? "moveCodeToNextLine"
              : newLine < oldLine
              ? "moveCodeToPrevLine"
              : "moveCode",
          data: { text: JSON.stringify(diff.oldText.trim()) },
        }
      }

      return {
        messageId: "replaceCode",
        data: {
          newText: JSON.stringify(diff.newText.trim()),
          oldText: JSON.stringify(diff.oldText.trim()),
        },
      }
    }
  }
}

export const dprint = createRule({
  name: "dprint",
  meta: {
    type: "layout",
    docs: {
      description: "Format code with dprint",
      recommended: "strict",
    },
    fixable: "code",
    messages: {
      requireLinebreak: "Require line break(s).",
      extraLinebreak: "Extra line break(s).",
      requireWhitespace: "Require whitespace(s).",
      extraWhitespace: "Extra whitespace(s).",
      requireCode: "Require code {{text}}.",
      extraCode: "Extra code {{text}}.",
      replaceWhitespace: "Require tweaking whitespace(s).",
      replaceCode: "Require code {{newText}} instead of {{oldText}}.",
      moveCodeToNextLine: "Move code {{text}} to the next line.",
      moveCodeToPrevLine: "Move code {{text}} to the previous line.",
      moveCode: "Require tweaking whitespaces around code {{text}}.",
    },
    schema: {
      type: "array",
      definitions: ConfigSchema.definitions,
      items: [
        {
          type: "object",
          properties: { config: ConfigSchema },
          additionalProperties: false,
        },
      ],
      additionalItems: false,
    },
  },
  defaultOptions: [{ config: {} }],
  create: (context, options) => {
    return {
      Program() {
        const sourceCode = context.getSourceCode()
        const filePath = context.getFilename()
        const fileText = sourceCode.getText()
        const config = options[0]?.config ?? {}

        if (!filePath || !path.isAbsolute(filePath)) {
          return
        }

        let formattedText: string
        try {
          formattedText = formatter.formatText(filePath, fileText, config)
        } catch {
          return
        }

        if (typeof formattedText !== "string") {
          return
        }

        const diffIterator = new DiffIterator(fileText, formattedText)

        for (const diff of diffIterator) {
          if (diff._tag === "NoChange") {
            continue
          }

          const range = diff.range

          const loc =
            diff._tag === "Addition"
              ? sourceCode.getLocFromIndex(range[0])
              : {
                  start: sourceCode.getLocFromIndex(range[0]),
                  end: sourceCode.getLocFromIndex(range[1]),
                }

          const { data, messageId } = createMessage(diff)

          context.report({
            loc,
            messageId,
            data,
            fix(fixer) {
              switch (diff._tag) {
                case "Addition": {
                  return fixer.insertTextAfterRange(range, diff.newText)
                }
                case "Removal": {
                  return fixer.removeRange(range)
                }
                case "Replacement": {
                  return fixer.replaceTextRange(range, diff.newText)
                }
              }
            },
          })
        }
      },
    }
  },
})
