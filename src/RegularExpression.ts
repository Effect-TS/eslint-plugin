export const IS_WHITESPACE_REGEX = /^\s+$/u

/**
 * Check if a given text is whitespace(s).
 */
export function isWhitespace(s: string): boolean {
  return IS_WHITESPACE_REGEX.test(s)
}

export const STARTS_WITH_WHITESPACE_REGEX = /^\s+/u

export const HAS_LINE_BREAK_REGEX = /\r\n|[\r\n]/u

export const GLOBAL_LINE_BREAK_REGEX = /\r\n|[\r\n]/gu

/**
 * Check if a given text contains line break(s).
 */
export function hasLineBreak(s: string): boolean {
  return HAS_LINE_BREAK_REGEX.test(s)
}
