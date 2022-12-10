import * as utils from "@effect/eslint-plugin/utils/eslint"
import { AST_NODE_TYPES } from "@typescript-eslint/utils"

export default utils.createRule({
  create(context) {
    return {
      // given (_) => T.log(_) or () => T.unit()
      ArrowFunctionExpression(node) {
        const callExpression = node.body
        const params = node.params
        // T.log(_) is a call expression
        if (callExpression.type === AST_NODE_TYPES.CallExpression) {
          const args = callExpression.arguments
          // T.log(_) has same number of arguments as the arrow
          if (args.length === params.length) {
            // parameters and arguments are both identifiers, with same name
            if (
              args.every((arg, idx) => {
                const param = params[idx]
                return arg.type === AST_NODE_TYPES.Identifier && param.type === AST_NODE_TYPES.Identifier &&
                  arg.name === param.name
              })
            ) {
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
