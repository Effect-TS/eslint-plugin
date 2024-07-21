import { createFromBuffer } from "@dprint/formatter"
import { getPath } from "@dprint/typescript"
import * as RegularExpression from "@effect/eslint-plugin/RegularExpression"
import type { Difference } from "prettier-linter-helpers"
import { generateDifferences } from "prettier-linter-helpers"
import { ConfigSchema } from "@effect/eslint-plugin/Dprint"
import { createRule } from "@effect/eslint-plugin/utils/eslint"
import * as Fs from "fs"
import * as path from "path"

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
function createMessage(diff: Difference): Message {
  switch (diff.operation) {
    case "insert": {
      if (RegularExpression.isWhitespace(diff.insertText!)) {
        if (RegularExpression.hasLineBreak(diff.insertText!)) {
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
          text: JSON.stringify(diff.insertText!.trim()),
        },
      }
    }
    case "delete": {
      if (RegularExpression.isWhitespace(diff.deleteText!)) {
        if (RegularExpression.hasLineBreak(diff.deleteText!)) {
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
          text: JSON.stringify(diff.deleteText!.trim()),
        },
      }
    }
    case "replace": {
      if (
        RegularExpression.isWhitespace(diff.deleteText!) &&
        RegularExpression.isWhitespace(diff.insertText!)
      ) {
        const oldHasLinebreak = RegularExpression.hasLineBreak(diff.deleteText!)
        const newHasLinebreak = RegularExpression.hasLineBreak(diff.insertText!)
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

      if (diff.deleteText!.trim() == diff.insertText!.trim()) {
        const oldLine = getLineNumberOfFirstCode(diff.deleteText!)
        const newLine = getLineNumberOfFirstCode(diff.insertText!)
        return {
          messageId:
            newLine > oldLine
              ? "moveCodeToNextLine"
              : newLine < oldLine
                ? "moveCodeToPrevLine"
                : "moveCode",
          data: { text: JSON.stringify(diff.deleteText!.trim()) },
        }
      }

      return {
        messageId: "replaceCode",
        data: {
          newText: JSON.stringify(diff.insertText!.trim()),
          oldText: JSON.stringify(diff.deleteText!.trim()),
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
        const sourceCode = context.sourceCode
        const filePath = context.filename
        const fileText = sourceCode.getText()
        const config = options[0]?.config ?? {}

        if (!filePath || !path.isAbsolute(filePath)) {
          return
        }

        let formattedText: string
        try {
          formattedText = formatter.formatText({
            filePath,
            fileText,
            overrideConfig: config,
          })
        } catch {
          return
        }

        if (typeof formattedText !== "string") {
          return
        }

        const diffIterator = generateDifferences(fileText, formattedText)

        for (const diff of diffIterator) {
          const range = [
            diff.offset,
            diff.offset + (diff.deleteText?.length ?? 0),
          ] as const
          const loc =
            diff.operation === "insert"
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
              switch (diff.operation) {
                case "insert": {
                  return fixer.insertTextAfterRange(
                    range,
                    diff.insertText ?? "",
                  )
                }
                case "delete": {
                  return fixer.removeRange(range)
                }
                case "replace": {
                  return fixer.replaceTextRange(range, diff.insertText ?? "")
                }
              }
            },
          })
        }
      },
    }
  },
})
