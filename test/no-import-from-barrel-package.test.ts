import type { Options } from "@effect/eslint-plugin/rules/no-import-from-barrel-package"
import { noImportFromBarrelPackage as rule } from "@effect/eslint-plugin/rules/no-import-from-barrel-package"
import { ruleTester } from "@effect/eslint-plugin/test/utils/index"

const options: [Options] = [{ packageNames: ["effect"] }]

ruleTester.run("no-import-from-barrel-package", rule, {
  valid: [
    {
      code: `import * as T from "effect/Effect"`,
      options,
    },
    {
      code: `import { Effect as Eff} from "effect/Effect"`,
      options,
    },
    {
      code: `import Effect from "effect/Effect"`,
      options,
    },
    {
      code: `import {type Effect } from "effect";`,
      options,
    },
    {
      code: `import type { Effect } from "effect"`,
      options,
    },
    {
      code: `import {test} from "lodash";`,
      options,
    },
  ],
  invalid: [
    {
      code: `import { Effect } from "effect"`,
      options,
      errors: [{ line: 1, messageId: "replaceImport" }],
      output: `import * as Effect from "effect/Effect"`,
    },
    {
      code: `import { Effect as Eff } from "effect"`,
      options,
      errors: [{ line: 1, messageId: "replaceImport" }],
      output: `import * as Eff from "effect/Effect"`,
    },
  ],
})
