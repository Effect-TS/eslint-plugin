import * as path from "path"
import * as vitest from "vitest"
import { RuleTester } from "@typescript-eslint/rule-tester"

RuleTester.afterAll = vitest.afterAll
RuleTester.it = vitest.it
RuleTester.itOnly = vitest.it.only
RuleTester.describe = vitest.describe

export const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: path.join(__dirname, "..", "fixtures"),
    },
  },
})
