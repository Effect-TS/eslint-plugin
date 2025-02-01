import { dprint as rule } from "@effect/eslint-plugin/rules/dprint"
import { ruleTester } from "./utils"

ruleTester.run("dprint", rule, {
  valid: [
    `import * as T from "@effect/io/Effect";
import { pipe } from "@fp-ts/data/Function";

const test = pipe(
  T.succeed("Hello"),
  T.tap(T.log),
);
`,
  ],
  invalid: [
    {
      code: `import * as T from "@effect/io/Effect";
import { pipe } from "@fp-ts/data/Function";

const test = pipe(
    T.succeed("Hello"),
  T.tap(T.unit)
)
`,
      errors: [
        { line: 5, messageId: "extraWhitespace" },
        { line: 6, messageId: "requireCode" },
        { line: 7, messageId: "requireCode" },
      ],
      output: `import * as T from "@effect/io/Effect";
import { pipe } from "@fp-ts/data/Function";

const test = pipe(
  T.succeed("Hello"),
  T.tap(T.unit),
);
`,
    },
  ],
})
