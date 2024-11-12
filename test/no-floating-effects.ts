import { noFloatingEffects as rule } from "@effect/eslint-plugin/rules/no-floating-effects"
import { ruleTester } from "@effect/eslint-plugin/test/utils"

ruleTester.run("no-floating-effects", rule, {
  valid: [
    `import { Effect } from "effect";

Effect.succeed(true).pipe(Effect.runPromise);
`,
    `import { Effect } from "effect";

Effect.gen(function*(){
  yield* Effect.succeed(true)
}).pipe(Effect.runPromise)
`,
  ],
  invalid: [
    {
      code: `import { Effect } from "effect";

Effect.succeed(true);
`,
      errors: [{ line: 3, messageId: "floating" }],
    },
    {
      code: `import { Effect } from "effect";

Effect.gen(function*(){
      Effect.succeed(true)
}).pipe(Effect.runPromise)
`,
      errors: [{ line: 4, messageId: "floating" }],
    },
  ],
})
