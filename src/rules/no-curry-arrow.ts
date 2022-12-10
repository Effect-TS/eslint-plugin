import * as AST from "@effect/eslint-plugin/utils/AST"
import * as utils from "@effect/eslint-plugin/utils/eslint"
import * as ts from "typescript"

export default utils.createRule({
  create(context) {
    const parserServices = utils.getParserServices(context)

    return {
      ArrowFunctionExpression(node) {
        const result = AST.parseCurryArrow(ts)(parserServices.esTreeNodeToTSNodeMap.get(node))
        if (result) {
          const { expression } = result
          const tsExpression = parserServices.tsNodeToESTreeNodeMap.get(expression)
          context.report({
            messageId: "noCurryArrow",
            node,
            fix: (fixer) => [
              // remove part before call expression's expression (arrow declaration)
              fixer.removeRange([node.range[0], tsExpression.range[0]]),
              // remove part after expression (parenthesis and arguments)
              fixer.removeRange([tsExpression.range[1], node.range[1]])
            ]
          })
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
