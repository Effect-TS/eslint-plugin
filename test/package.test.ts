import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const manifest = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as {
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

describe("package runtime dependencies", () => {
  it("ships the utils used by the barrel rule and rule factory to consumers", () => {
    expect(manifest.dependencies).toHaveProperty("@typescript-eslint/utils")
    expect(manifest.devDependencies).not.toHaveProperty(
      "@typescript-eslint/utils",
    )
  })
})
