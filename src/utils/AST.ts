import type * as ts from "typescript"

export type TypeScriptApi = typeof ts

export function parseCurryArrow(ts: TypeScriptApi) {
  return (arrow: ts.Node): null | { expression: ts.LeftHandSideExpression } => {
    if (!ts.isArrowFunction(arrow)) return null
    if (arrow.parameters.length !== 1) return null
    const parameter = arrow.parameters[0]!
    const parameterName = parameter.name
    if (!ts.isIdentifier(parameterName)) return null
    const body = arrow.body
    if (!ts.isCallExpression(body)) return null
    const args = body.arguments
    const expression = body.expression
    if (args.length !== 1) return null
    const identifier = args[0]!
    if (!ts.isIdentifier(identifier)) return null
    if (identifier.text !== parameterName.text) return null
    return { expression }
  }
}
