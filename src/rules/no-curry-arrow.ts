import * as utils from "@effect/eslint-plugin/utils/eslint"
import { AST_NODE_TYPES } from "@typescript-eslint/utils"

export default utils.createRule({
  create(context) {
    return {
      // given (_) => T.log(_)
      ArrowFunctionExpression(node) {
        // has only 1 parameter
        if (node.params.length === 1) {
          const parameter = node.params[0]
          // (_) should be an identifier
          if (parameter.type === AST_NODE_TYPES.Identifier) {
            const callExpression = node.body
            // T.log(_) is a call expression
            if (callExpression.type === AST_NODE_TYPES.CallExpression) {
              const args = callExpression.arguments
              // T.log(_) has only one argument
              if (args.length === 1) {
                const callArg = args[0]
                // T.log(_) argument should be an identifier
                if (callArg.type === AST_NODE_TYPES.Identifier) {
                  // and _ should be the same as the argument
                  if (callArg.name === parameter.name) {
                    context.report({
                      messageId: "noCurryArrow",
                      node,
                      fix: (fixer) => [
                        // remove part before call expression's expression (arrow declaration)
                        fixer.removeRange([node.range[0], callExpression.callee.range[0]]),
                        // remove part after expression (parenthesis and arguments)
                        fixer.removeRange([callExpression.callee.range[1], node.range[1]])
                      ]
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  name: "no-curry-arrow",
  meta: {
    docs: {
      description: "There should be no curry arrow functions, like T.map((_) => log(_)) should be T.map(log) instead",
      recommended: "warn"
    },
    messages: {
      noCurryArrow: "There should be no curry arrow functions, like T.map((_) => log(_)) should be T.map(log) instead"
    },
    type: "suggestion",
    schema: [],
    fixable: "code"
  },
  defaultOptions: []
})
