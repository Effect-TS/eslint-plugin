import * as path from "path"
import { RuleTester } from '@typescript-eslint/rule-tester';

export const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: path.join(__dirname, "..", "fixtures")
  }
})
