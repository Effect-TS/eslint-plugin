import { createRule } from "@effect/eslint-plugin/utils/eslint"
import { AST_NODE_TYPES } from "@typescript-eslint/utils"
import type { RuleFixer } from "@typescript-eslint/utils/ts-eslint"

export type Options = {
  packageNames: Array<string>
}
export type MessageIds = "replaceImport"

export const noImportFromBarrelPackage = createRule<[Options], MessageIds>({
  name: "no-import-from-barrel-package",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow importing from barrel packages, and encourages importing the specific module instead.",
    },
    fixable: "code",
    messages: {
      replaceImport: `Use import * as {{localName}} from "{{packageName}}/{{moduleName}}" instead`,
    },
    schema: [
      {
        type: "object",
        properties: {
          packageNames: {
            type: "array",
            description: "List of packages to check for barrel imports",
            items: [
              {
                type: "string",
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ packageNames: [] }],
  create: (context, options) => {
    return {
      ImportDeclaration: node => {
        // destruct options
        const [{ packageNames }] = options
        // first we check if the import is from one of the configured modules
        const packageName = node.source.value
        if (packageNames.indexOf(packageName) > -1) {
          for (const specifier of node.specifiers) {
            // check only imports with style import {A, B} from "foo"
            if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
              // we are fine with type imports
              if (specifier.importKind === "type") continue
              const moduleName =
                specifier.imported.type === AST_NODE_TYPES.Identifier
                  ? specifier.imported.name
                  : specifier.imported.value
              const localName = specifier.local.name
              // fix only with a single specifier
              const fixable =
                node.specifiers.length === 1
                  ? {
                      fix: (fixer: RuleFixer) =>
                        fixer.replaceTextRange(
                          node.range,
                          `import * as ${localName} from "${packageName}/${moduleName}"`,
                        ),
                    }
                  : {}
              // report the error
              context.report({
                loc: specifier.loc,
                node: specifier,
                messageId: "replaceImport",
                data: {
                  packageName,
                  moduleName,
                  localName,
                },
                ...fixable,
              })
            }
          }
        }
      },
    }
  },
})
