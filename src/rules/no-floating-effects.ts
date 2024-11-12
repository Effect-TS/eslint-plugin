import {
  createRule,
  getParserServices,
  isEffectType,
} from "@effect/eslint-plugin/utils/eslint"

type Options = [{}]
type MessageId = "floating"

export const noFloatingEffects = createRule<Options, MessageId>({
  name: "no-floating-effects",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require Effects to be run, exported or assigned to a variable",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    hasSuggestions: true,
    messages: {
      floating: "Effects must be run, exported or assigned to a variable.",
    },
    schema: [
      {
        type: "object",
        additionalProperties: false,
        properties: {},
      },
    ],
  },
  defaultOptions: [{}],

  create: context => {
    const services = getParserServices(context)
    const checker = services.program.getTypeChecker()

    return {
      ExpressionStatement(node): void {
        const tsNode = services.esTreeNodeToTSNodeMap.get(node.expression)
        const type = checker.getTypeAtLocation(tsNode)

        if (isEffectType(type)) {
          context.report({
            loc: node.loc,
            messageId: "floating",
            data: {},
          })
        }
      },
    }
  },
})
