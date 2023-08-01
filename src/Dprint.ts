import type { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema"

export const ConfigSchema: JSONSchema4 = {
  type: "object",
  definitions: {
    useTabs: {
      description: "Whether to use tabs (true) or spaces (false).",
      type: "boolean",
      default: false,
    },
    semiColons: {
      description: "How semi-colons should be used.",
      type: "string",
      default: "prefer",
      oneOf: [
        {
          type: "string",
          enum: ["always"],
          description: "Always uses semi-colons where applicable.",
        },
        {
          type: "string",
          enum: ["prefer"],
          description:
            "Prefers semi-colons, but doesn't add one in certain scenarios such as for the last member of a single-line type literal.",
        },
        {
          type: "string",
          enum: ["asi"],
          description:
            "Uses automatic semi-colon insertion. Only adds a semi-colon at the start of some expression statements when necessary. Read more: https://standardjs.com/rules.html#semicolons",
        },
      ],
    },
    quoteStyle: {
      description: "How to use single or double quotes.",
      type: "string",
      default: "alwaysDouble",
      oneOf: [
        {
          type: "string",
          enum: ["alwaysDouble"],
          description: "Always uses double quotes.",
        },
        {
          type: "string",
          enum: ["alwaysSingle"],
          description: "Always uses single quotes.",
        },
        {
          type: "string",
          enum: ["preferDouble"],
          description:
            "Prefers using double quotes except in scenarios where the string contains more double quotes than single quotes.",
        },
        {
          type: "string",
          enum: ["preferSingle"],
          description:
            "Prefers using single quotes except in scenarios where the string contains more single quotes than double quotes.",
        },
      ],
    },
    newLineKind: {
      description: "The kind of newline to use.",
      type: "string",
      default: "lf",
      oneOf: [
        {
          type: "string",
          enum: ["auto"],
          description:
            "For each file, uses the last newline kind found in the file.",
        },
        {
          type: "string",
          enum: ["crlf"],
          description: "Uses carriage return, line feed.",
        },
        {
          type: "string",
          enum: ["lf"],
          description: "Uses line feed.",
        },
        {
          type: "string",
          enum: ["system"],
          description: "Uses the system standard (ex. crlf on Windows).",
        },
      ],
    },
    useBraces: {
      description: "If braces should be used or not.",
      type: "string",
      default: "whenNotSingleLine",
      oneOf: [
        {
          type: "string",
          enum: ["maintain"],
          description:
            "Uses braces if they're used. Doesn't use braces if they're not used.",
        },
        {
          type: "string",
          enum: ["whenNotSingleLine"],
          description: "Uses braces when the body is on a different line.",
        },
        {
          type: "string",
          enum: ["always"],
          description:
            "Forces the use of braces. Will add them if they aren't used.",
        },
        {
          type: "string",
          enum: ["preferNone"],
          description:
            "Forces no braces when when the header is one line and body is one line. Otherwise forces braces.",
        },
      ],
    },
    bracePosition: {
      description: "Where to place the opening brace.",
      type: "string",
      default: "sameLineUnlessHanging",
      oneOf: [
        {
          type: "string",
          enum: ["maintain"],
          description:
            "Maintains the brace being on the next line or the same line.",
        },
        {
          type: "string",
          enum: ["sameLine"],
          description: "Forces the brace to be on the same line.",
        },
        {
          type: "string",
          enum: ["nextLine"],
          description: "Forces the brace to be on the next line.",
        },
        {
          type: "string",
          enum: ["sameLineUnlessHanging"],
          description:
            "Forces the brace to be on the next line if the same line is hanging, but otherwise uses the same line.",
        },
      ],
    },
    singleBodyPosition: {
      description:
        "Where to place the expression of a statement that could possibly be on one line (ex. `if (true) console.log(5);`).",
      type: "string",
      default: "maintain",
      oneOf: [
        {
          type: "string",
          enum: ["maintain"],
          description: "Maintains the position of the expression.",
        },
        {
          type: "string",
          enum: ["sameLine"],
          description: "Forces the whole statement to be on one line.",
        },
        {
          type: "string",
          enum: ["nextLine"],
          description: "Forces the expression to be on the next line.",
        },
      ],
    },
    nextControlFlowPosition: {
      description:
        "Where to place the next control flow within a control flow statement.",
      type: "string",
      default: "nextLine",
      oneOf: [
        {
          type: "string",
          enum: ["maintain"],
          description:
            "Maintains the next control flow being on the next line or the same line.",
        },
        {
          type: "string",
          enum: ["sameLine"],
          description: "Forces the next control flow to be on the same line.",
        },
        {
          type: "string",
          enum: ["nextLine"],
          description: "Forces the next control flow to be on the next line.",
        },
      ],
    },
    trailingCommas: {
      description: "If trailing commas should be used.",
      type: "string",
      default: "onlyMultiLine",
      oneOf: [
        {
          type: "string",
          enum: ["never"],
          description: "Trailing commas should not be used.",
        },
        {
          type: "string",
          enum: ["always"],
          description: "Trailing commas should always be used.",
        },
        {
          type: "string",
          enum: ["onlyMultiLine"],
          description:
            "Trailing commas should only be used in multi-line scenarios.",
        },
      ],
    },
    operatorPosition: {
      description:
        "Where to place the operator for expressions that span multiple lines.",
      type: "string",
      default: "nextLine",
      oneOf: [
        {
          type: "string",
          enum: ["maintain"],
          description:
            "Maintains the operator being on the next line or the same line.",
        },
        {
          type: "string",
          enum: ["sameLine"],
          description: "Forces the operator to be on the same line.",
        },
        {
          type: "string",
          enum: ["nextLine"],
          description: "Forces the operator to be on the next line.",
        },
      ],
    },
    preferHanging: {
      description:
        "Set to prefer hanging indentation when exceeding the line width instead of making code split up on multiple lines.",
      type: "boolean",
      default: false,
    },
    preferSingleLine: {
      description:
        "If code should revert back from being on multiple lines to being on a single line when able.",
      type: "boolean",
      default: false,
    },
    sortOrder: {
      description: "The kind of sort ordering to use.",
      type: "string",
      default: "caseInsensitive",
      oneOf: [
        {
          type: "string",
          enum: ["maintain"],
          description: "Maintains the current ordering.",
        },
        {
          type: "string",
          enum: ["caseSensitive"],
          description: "Alphabetically and case sensitive.",
        },
        {
          type: "string",
          enum: ["caseInsensitive"],
          description: "Alphabetically and case insensitive.",
        },
      ],
    },
    deno: {
      description:
        "Top level configuration that sets the configuration to what is used in Deno.",
      type: "boolean",
      default: false,
    },
    "arrowFunction.useParentheses": {
      description:
        "Whether to use parentheses around a single parameter in an arrow function.",
      type: "string",
      default: "maintain",
      oneOf: [
        {
          type: "string",
          enum: ["force"],
          description: "Forces parentheses.",
        },
        {
          type: "string",
          enum: ["maintain"],
          description: "Maintains the current state of the parentheses.",
        },
        {
          type: "string",
          enum: ["preferNone"],
          description: "Prefers not using parentheses when possible.",
        },
      ],
    },
    "binaryExpression.linePerExpression": {
      description:
        "Whether to force a line per expression when spanning multiple lines.",
      type: "boolean",
      default: false,
    },
    "memberExpression.linePerExpression": {
      description:
        "Whether to force a line per expression when spanning multiple lines.",
      type: "boolean",
      default: false,
    },
    "enumDeclaration.memberSpacing": {
      description: "How to space the members of an enum.",
      type: "string",
      default: "maintain",
      oneOf: [
        {
          type: "string",
          enum: ["newLine"],
          description: "Forces a new line between members.",
        },
        {
          type: "string",
          enum: ["blankLine"],
          description: "Forces a blank line between members.",
        },
        {
          type: "string",
          enum: ["maintain"],
          description: "Maintains whether a newline or blankline is used.",
        },
      ],
    },
    "typeLiteral.separatorKind": {
      description: "The kind of separator to use in type literals.",
      type: "string",
      default: "semiColon",
      oneOf: [
        {
          type: "string",
          enum: ["semiColon"],
          description: "Use semi-colons.",
        },
        {
          type: "string",
          enum: ["comma"],
          description: "Use commas.",
        },
      ],
    },
    "binaryExpression.spaceSurroundingBitwiseAndArithmeticOperator": {
      description:
        "Whether to surround the operator in a binary expression with spaces.",
      type: "boolean",
      default: true,
    },
    "commentLine.forceSpaceAfterSlashes": {
      description: "Forces a space after the double slash in a comment line.",
      type: "boolean",
      default: true,
    },
    "constructor.spaceBeforeParentheses": {
      description:
        "Whether to add a space before the parentheses of a constructor.",
      type: "boolean",
      default: false,
    },
    "constructorType.spaceAfterNewKeyword": {
      description:
        "Whether to add a space after the `new` keyword in a constructor type.",
      type: "boolean",
      default: false,
    },
    "constructSignature.spaceAfterNewKeyword": {
      description:
        "Whether to add a space after the `new` keyword in a construct signature.",
      type: "boolean",
      default: false,
    },
    "doWhileStatement.spaceAfterWhileKeyword": {
      description:
        "Whether to add a space after the `while` keyword in a do while statement.",
      type: "boolean",
      default: true,
    },
    "exportDeclaration.spaceSurroundingNamedExports": {
      description:
        "Whether to add spaces around named exports in an export declaration.",
      type: "boolean",
      default: true,
    },
    "forInStatement.spaceAfterForKeyword": {
      description:
        'Whether to add a space after the `for` keyword in a "for in" statement.',
      type: "boolean",
      default: true,
    },
    "forOfStatement.spaceAfterForKeyword": {
      description:
        'Whether to add a space after the `for` keyword in a "for of" statement.',
      type: "boolean",
      default: true,
    },
    "forStatement.spaceAfterForKeyword": {
      description:
        'Whether to add a space after the `for` keyword in a "for" statement.',
      type: "boolean",
      default: true,
    },
    "forStatement.spaceAfterSemiColons": {
      description:
        'Whether to add a space after the semi-colons in a "for" statement.',
      type: "boolean",
      default: true,
    },
    "functionDeclaration.spaceBeforeParentheses": {
      description:
        "Whether to add a space before the parentheses of a function declaration.",
      type: "boolean",
      default: false,
    },
    "functionExpression.spaceBeforeParentheses": {
      description:
        "Whether to add a space before the parentheses of a function expression.",
      type: "boolean",
      default: false,
    },
    "functionExpression.spaceAfterFunctionKeyword": {
      description:
        "Whether to add a space after the function keyword of a function expression.",
      type: "boolean",
      default: false,
    },
    "getAccessor.spaceBeforeParentheses": {
      description:
        "Whether to add a space before the parentheses of a get accessor.",
      type: "boolean",
      default: false,
    },
    "ifStatement.spaceAfterIfKeyword": {
      description:
        'Whether to add a space after the `if` keyword in an "if" statement.',
      type: "boolean",
      default: true,
    },
    "importDeclaration.spaceSurroundingNamedImports": {
      description:
        "Whether to add spaces around named imports in an import declaration.",
      type: "boolean",
      default: true,
    },
    "jsxExpressionContainer.spaceSurroundingExpression": {
      description:
        "Whether to add a space surrounding the expression of a JSX container.",
      type: "boolean",
      default: false,
    },
    "method.spaceBeforeParentheses": {
      description: "Whether to add a space before the parentheses of a method.",
      type: "boolean",
      default: false,
    },
    "setAccessor.spaceBeforeParentheses": {
      description:
        "Whether to add a space before the parentheses of a set accessor.",
      type: "boolean",
      default: false,
    },
    "taggedTemplate.spaceBeforeLiteral": {
      description:
        "Whether to add a space before the literal in a tagged templte.",
      type: "boolean",
      default: true,
    },
    "typeAnnotation.spaceBeforeColon": {
      description:
        "Whether to add a space before the colon of a type annotation.",
      type: "boolean",
      default: false,
    },
    "typeAssertion.spaceBeforeExpression": {
      description:
        "Whether to add a space before the expression in a type assertion.",
      type: "boolean",
      default: true,
    },
    "whileStatement.spaceAfterWhileKeyword": {
      description:
        "Whether to add a space after the `while` keyword in a while statement.",
      type: "boolean",
      default: true,
    },
  },
  properties: {
    $schema: {
      description: "The JSON schema reference.",
      type: "string",
    },
    locked: {
      description:
        "Whether the configuration is not allowed to be overriden or extended.",
      type: "boolean",
    },
    lineWidth: {
      description:
        "The width of a line the printer will try to stay under. Note that the printer may exceed this width in certain cases.",
      default: 120,
      type: "number",
    },
    indentWidth: {
      description: "The number of columns for an indent.",
      default: 4,
      type: "number",
    },
    useTabs: {
      $ref: "#/definitions/useTabs",
    },
    semiColons: {
      $ref: "#/definitions/semiColons",
    },
    quoteStyle: {
      $ref: "#/definitions/quoteStyle",
    },
    newLineKind: {
      $ref: "#/definitions/newLineKind",
    },
    useBraces: {
      $ref: "#/definitions/useBraces",
    },
    bracePosition: {
      $ref: "#/definitions/bracePosition",
    },
    singleBodyPosition: {
      $ref: "#/definitions/singleBodyPosition",
    },
    nextControlFlowPosition: {
      $ref: "#/definitions/nextControlFlowPosition",
    },
    trailingCommas: {
      $ref: "#/definitions/trailingCommas",
    },
    operatorPosition: {
      $ref: "#/definitions/operatorPosition",
    },
    preferHanging: {
      $ref: "#/definitions/preferHanging",
    },
    preferSingleLine: {
      $ref: "#/definitions/preferSingleLine",
    },
    deno: {
      $ref: "#/definitions/deno",
    },
    "arrowFunction.useParentheses": {
      $ref: "#/definitions/arrowFunction.useParentheses",
    },
    "binaryExpression.linePerExpression": {
      $ref: "#/definitions/binaryExpression.linePerExpression",
    },
    "memberExpression.linePerExpression": {
      $ref: "#/definitions/memberExpression.linePerExpression",
    },
    "typeLiteral.separatorKind": {
      $ref: "#/definitions/typeLiteral.separatorKind",
    },
    "typeLiteral.separatorKind.singleLine": {
      $ref: "#/definitions/typeLiteral.separatorKind",
    },
    "typeLiteral.separatorKind.multiLine": {
      $ref: "#/definitions/typeLiteral.separatorKind",
    },
    "enumDeclaration.memberSpacing": {
      $ref: "#/definitions/enumDeclaration.memberSpacing",
    },
    "binaryExpression.spaceSurroundingBitwiseAndArithmeticOperator": {
      $ref: "#/definitions/binaryExpression.spaceSurroundingBitwiseAndArithmeticOperator",
    },
    "commentLine.forceSpaceAfterSlashes": {
      $ref: "#/definitions/commentLine.forceSpaceAfterSlashes",
    },
    "constructor.spaceBeforeParentheses": {
      $ref: "#/definitions/constructor.spaceBeforeParentheses",
    },
    "constructorType.spaceAfterNewKeyword": {
      $ref: "#/definitions/constructorType.spaceAfterNewKeyword",
    },
    "constructSignature.spaceAfterNewKeyword": {
      $ref: "#/definitions/constructSignature.spaceAfterNewKeyword",
    },
    "doWhileStatement.spaceAfterWhileKeyword": {
      $ref: "#/definitions/doWhileStatement.spaceAfterWhileKeyword",
    },
    "exportDeclaration.spaceSurroundingNamedExports": {
      $ref: "#/definitions/exportDeclaration.spaceSurroundingNamedExports",
    },
    "forInStatement.spaceAfterForKeyword": {
      $ref: "#/definitions/forInStatement.spaceAfterForKeyword",
    },
    "forOfStatement.spaceAfterForKeyword": {
      $ref: "#/definitions/forOfStatement.spaceAfterForKeyword",
    },
    "forStatement.spaceAfterForKeyword": {
      $ref: "#/definitions/forStatement.spaceAfterForKeyword",
    },
    "forStatement.spaceAfterSemiColons": {
      $ref: "#/definitions/forStatement.spaceAfterSemiColons",
    },
    "functionDeclaration.spaceBeforeParentheses": {
      $ref: "#/definitions/functionDeclaration.spaceBeforeParentheses",
    },
    "functionExpression.spaceBeforeParentheses": {
      $ref: "#/definitions/functionExpression.spaceBeforeParentheses",
    },
    "functionExpression.spaceAfterFunctionKeyword": {
      $ref: "#/definitions/functionExpression.spaceAfterFunctionKeyword",
    },
    "getAccessor.spaceBeforeParentheses": {
      $ref: "#/definitions/getAccessor.spaceBeforeParentheses",
    },
    "ifStatement.spaceAfterIfKeyword": {
      $ref: "#/definitions/ifStatement.spaceAfterIfKeyword",
    },
    "importDeclaration.spaceSurroundingNamedImports": {
      $ref: "#/definitions/importDeclaration.spaceSurroundingNamedImports",
    },
    "jsxExpressionContainer.spaceSurroundingExpression": {
      $ref: "#/definitions/jsxExpressionContainer.spaceSurroundingExpression",
    },
    "method.spaceBeforeParentheses": {
      $ref: "#/definitions/method.spaceBeforeParentheses",
    },
    "setAccessor.spaceBeforeParentheses": {
      $ref: "#/definitions/setAccessor.spaceBeforeParentheses",
    },
    "taggedTemplate.spaceBeforeLiteral": {
      $ref: "#/definitions/taggedTemplate.spaceBeforeLiteral",
    },
    "typeAnnotation.spaceBeforeColon": {
      $ref: "#/definitions/typeAnnotation.spaceBeforeColon",
    },
    "typeAssertion.spaceBeforeExpression": {
      $ref: "#/definitions/typeAssertion.spaceBeforeExpression",
    },
    "whileStatement.spaceAfterWhileKeyword": {
      $ref: "#/definitions/whileStatement.spaceAfterWhileKeyword",
    },
    "exportDeclaration.sortNamedExports": {
      $ref: "#/definitions/sortOrder",
    },
    "importDeclaration.sortNamedImports": {
      $ref: "#/definitions/sortOrder",
    },
    ignoreNodeCommentText: {
      description:
        "The text to use for an ignore comment (ex. `// dprint-ignore`).",
      default: "dprint-ignore",
      type: "string",
    },
    ignoreFileCommentText: {
      description:
        "The text to use for a file ignore comment (ex. `// dprint-ignore-file`).",
      default: "dprint-ignore-file",
      type: "string",
    },
    "forInStatement.useBraces": {
      $ref: "#/definitions/useBraces",
    },
    "forOfStatement.useBraces": {
      $ref: "#/definitions/useBraces",
    },
    "forStatement.useBraces": {
      $ref: "#/definitions/useBraces",
    },
    "ifStatement.useBraces": {
      $ref: "#/definitions/useBraces",
    },
    "whileStatement.useBraces": {
      $ref: "#/definitions/useBraces",
    },
    "arrowFunction.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "classDeclaration.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "classExpression.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "constructor.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "doWhileStatement.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "enumDeclaration.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "forInStatement.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "forOfStatement.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "forStatement.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "functionDeclaration.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "functionExpression.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "getAccessor.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "ifStatement.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "interfaceDeclaration.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "moduleDeclaration.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "method.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "setAccessor.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "switchStatement.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "switchCase.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "tryStatement.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "whileStatement.bracePosition": {
      $ref: "#/definitions/bracePosition",
    },
    "forInStatement.singleBodyPosition": {
      $ref: "#/definitions/singleBodyPosition",
    },
    "forOfStatement.singleBodyPosition": {
      $ref: "#/definitions/singleBodyPosition",
    },
    "forStatement.singleBodyPosition": {
      $ref: "#/definitions/singleBodyPosition",
    },
    "ifStatement.singleBodyPosition": {
      $ref: "#/definitions/singleBodyPosition",
    },
    "whileStatement.singleBodyPosition": {
      $ref: "#/definitions/singleBodyPosition",
    },
    "ifStatement.nextControlFlowPosition": {
      $ref: "#/definitions/nextControlFlowPosition",
    },
    "tryStatement.nextControlFlowPosition": {
      $ref: "#/definitions/nextControlFlowPosition",
    },
    "arguments.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "parameters.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "arrayExpression.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "arrayPattern.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "enumDeclaration.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "exportDeclaration.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "importDeclaration.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "objectExpression.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "objectPattern.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "tupleType.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "typeLiteral.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "typeParameters.trailingCommas": {
      $ref: "#/definitions/trailingCommas",
    },
    "binaryExpression.operatorPosition": {
      $ref: "#/definitions/operatorPosition",
    },
    "conditionalExpression.operatorPosition": {
      $ref: "#/definitions/operatorPosition",
    },
    "arguments.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "arrayExpression.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "arrayPattern.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "doWhileStatement.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "exportDeclaration.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "extendsClause.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "forInStatement.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "forOfStatement.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "forStatement.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "ifStatement.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "implementsClause.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "importDeclaration.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "jsxAttributes.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "objectExpression.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "objectPattern.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "parameters.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "sequenceExpression.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "switchStatement.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "tupleType.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "typeLiteral.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "typeParameters.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "unionAndIntersectionType.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "variableStatement.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "whileStatement.preferHanging": {
      $ref: "#/definitions/preferHanging",
    },
    "arrayExpression.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "arrayPattern.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "arguments.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "binaryExpression.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "computed.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "conditionalExpression.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "conditionalType.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "decorators.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "exportDeclaration.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "forStatement.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "importDeclaration.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "jsxAttributes.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "jsxElement.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "mappedType.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "memberExpression.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "objectExpression.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "objectPattern.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "parameters.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "parentheses.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "tupleType.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "typeLiteral.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "typeParameters.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "unionAndIntersectionType.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
    "variableStatement.preferSingleLine": {
      $ref: "#/definitions/preferSingleLine",
    },
  },
}
