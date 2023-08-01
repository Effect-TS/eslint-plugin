/**
 * A `Diff` represents the different between two pieces of text.
 */
export type Diff = NoChange | Addition | Removal | Replacement

/**
 * Represents no difference between two strings.
 */
export interface NoChange {
  readonly _tag: "NoChange"
}

export const NoChange: Diff = {
  _tag: "NoChange",
}

/**
 * Represents a difference caused by the addition of text to a string.
 */
export interface Addition {
  _tag: "Addition"
  range: [number, number]
  newText: string
}

export function Addition(range: [number, number], newText: string): Diff {
  return {
    _tag: "Addition",
    range,
    newText,
  }
}

/**
 * Represents a difference caused by the removal of text from a string.
 */
export interface Removal {
  _tag: "Removal"
  range: [number, number]
  oldText: string
}
export function Removal(range: [number, number], oldText: string): Diff {
  return {
    _tag: "Removal",
    range,
    oldText,
  }
}

/**
 * Represents a difference caused by the replacement of text within a string.
 */
export interface Replacement {
  _tag: "Replacement"
  range: [number, number]
  oldText: string
  newText: string
}
export function Replacement(
  range: [number, number],
  oldText: string,
  newText: string,
): Diff {
  return {
    _tag: "Replacement",
    range,
    oldText,
    newText,
  }
}
