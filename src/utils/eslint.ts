import { ESLintUtils } from "@typescript-eslint/utils"
import * as ts from "typescript"

const { getParserServices } = ESLintUtils

const createRule = ESLintUtils.RuleCreator(
  name =>
    `https://github.com/Effect-TS/eslint-plugin/blob/main/src/rules/${name}.ts`,
)

const isEffectType = (type: ts.Type) => {
  const symbol = type.getSymbol()
  if (symbol) {
    const declarations = symbol.getDeclarations()
    if (declarations) {
      for (const declaration of declarations) {
        if (ts.isInterfaceDeclaration(declaration)) {
          const interfaceName = declaration.name.getText()
          if (declaration.typeParameters) {
            if (
              declaration.typeParameters.length === 3 &&
              interfaceName.toLowerCase() === "effect"
            )
              return true
          }
        }
      }
    }
  }
}

export { getParserServices, createRule, isEffectType }
