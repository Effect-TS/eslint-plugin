import rule from "@effect/eslint-plugin/rules/no-curry-arrow"
import { ruleTester } from "@effect/eslint-plugin/test/utils"

ruleTester.run("no-curry-arrow", rule, {
  valid: [
    `
    import * as T from "@effect/io/Effect"
    import { pipe } from "@fp-ts/data/Function"
    
    const test = pipe(
      T.succeed("Hello"),
      T.tap(T.log)
    )   
    `,
    `
    import * as T from "@effect/io/Effect"
    import { pipe } from "@fp-ts/data/Function"
    
    const test = pipe(
      T.succeed("Hello"),
      T.tap((a, b, c) => T.log(a, b))
    )
    `
  ],
  invalid: [{
    code: `
    import * as T from "@effect/io/Effect"
    import { pipe } from "@fp-ts/data/Function"
    
    const test = pipe(
      T.succeed("Hello"),
      T.tap(() => T.unit())
    )    
    `,
    errors: [{ line: 7, messageId: "noCurryArrow" }],
    output: `
    import * as T from "@effect/io/Effect"
    import { pipe } from "@fp-ts/data/Function"
    
    const test = pipe(
      T.succeed("Hello"),
      T.tap(T.unit)
    )    
    `
  }, {
    code: `
    import * as T from "@effect/io/Effect"
    import { pipe } from "@fp-ts/data/Function"
    
    const test = pipe(
      T.succeed("Hello"),
      T.tap((_) => T.log(_))
    )    
    `,
    errors: [{ line: 7, messageId: "noCurryArrow" }],
    output: `
    import * as T from "@effect/io/Effect"
    import { pipe } from "@fp-ts/data/Function"
    
    const test = pipe(
      T.succeed("Hello"),
      T.tap(T.log)
    )    
    `
  }, {
    code: `
    import * as T from "@effect/io/Effect"
    import { pipe } from "@fp-ts/data/Function"
    
    const test = pipe(
      T.succeed("Hello"),
      T.tap((a, b, c) => T.log(a, b, c))
    )
    `,
    errors: [{ line: 7, messageId: "noCurryArrow" }],
    output: `
    import * as T from "@effect/io/Effect"
    import { pipe } from "@fp-ts/data/Function"
    
    const test = pipe(
      T.succeed("Hello"),
      T.tap(T.log)
    )
    `
  }]
})
