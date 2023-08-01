import * as Diff from "@effect/eslint-plugin/Diff"
import * as RegularExpression from "@effect/eslint-plugin/RegularExpression"
import type { Change } from "diff"
import { diffChars } from "diff"

export class DiffIterator implements IterableIterator<Diff.Diff> {
  /**
   * All changes between two pieces of text detected by `diffChars`.
   */
  private readonly changes: ReadonlyArray<Change>
  /**
   * The current index into the `this.changes` array.
   */
  private currentIndex = 0
  /**
   * The current index in the original source code text.
   */
  private currentLocation = 0

  constructor(readonly oldText: string, readonly newText: string) {
    this.changes = diffChars(oldText, newText)
  }

  next(): IteratorResult<Diff.Diff> {
    if (this.done) {
      return { done: true, value: undefined }
    }

    const change = this.changes[this.currentIndex]!

    if (change.added) {
      return { done: false, value: this.handleAdd(change) }
    } else if (change.removed) {
      return { done: false, value: this.handleRemove(change) }
    } else {
      this.currentIndex = this.currentIndex + 1
      this.currentLocation = this.currentLocation + change.value.length
      return { done: false, value: Diff.NoChange }
    }
  }

  private get done(): boolean {
    return this.currentIndex >= this.changes.length
  }

  [Symbol.iterator](): IterableIterator<Diff.Diff> {
    return new DiffIterator(this.oldText, this.newText)
  }

  private handleAdd(current: Change): Diff.Diff {
    const next1 = this.changes[this.currentIndex + 1]
    const next2 = this.changes[this.currentIndex + 2]

    // Merge the sequence "added → removed" as a replacement.
    if (next1 && next1.removed) {
      return this.newReplacedDiff(2, next1.value, current.value)
    }

    // Merge the following sequences as a replacement:
    // - "added → as-is → added" and all of the three are whitespaces.
    // - "added → as-is → removed" and the middle is whitespaces and the first
    //   and the last contains the same content.
    if (
      next1 &&
      next2 &&
      !next1.added &&
      !next1.removed &&
      RegularExpression.isWhitespace(next1.value)
    ) {
      // "added → as-is → added" and all of the three are whitespaces.
      // It frequently appears as adding a line break with indentation.
      if (
        next2.added &&
        RegularExpression.isWhitespace(current.value) &&
        RegularExpression.isWhitespace(next2.value)
      ) {
        return this.newReplacedDiff(
          3,
          next1.value,
          current.value + next1.value + next2.value,
        )
      }

      // "added → as-is → removed" and the middle is whitespaces and the first
      // and the last contains the same content. It frequently appears as moving
      // code to the previous line.
      if (next2.removed && current.value.trim().endsWith(next2.value.trim())) {
        return this.newReplacedDiff(
          3,
          next1.value + next2.value,
          current.value + next1.value,
        )
      }
    }

    return this.newAddedDiff(1, current.value)
  }

  private handleRemove(current: Change): Diff.Diff {
    const next1 = this.changes[this.currentIndex + 1]
    const next2 = this.changes[this.currentIndex + 2]

    // Merge the sequence "removed → added" as a replacement.
    if (next1 && next1.added) {
      return this.newReplacedDiff(2, current.value, next1.value)
    }

    // Merge the following sequences as a replacement:
    // - "removed → as-is → removed" and all of the three are whitespaces.
    // - "removed → as-is → added" and the middle is whitespaces and the first
    //   and the last contains the same content.
    if (
      next1 &&
      next2 &&
      !next1.added &&
      !next1.removed &&
      RegularExpression.isWhitespace(next1.value)
    ) {
      // "removed → as-is → removed" and all of the three are whitespaces.
      // It frequently appears as removing a line break with indentation.
      if (
        next2.removed &&
        RegularExpression.isWhitespace(current.value) &&
        RegularExpression.isWhitespace(next2.value)
      ) {
        return this.newReplacedDiff(
          3,
          current.value + next1.value + next2.value,
          next1.value,
        )
      }

      // "removed → as-is → added" and the middle is whitespaces and the first
      // and the last contains the same content. It frequently appears as moving
      // code to the next line.
      if (next2.added && next2.value.trim().startsWith(current.value.trim())) {
        return this.newReplacedDiff(
          3,
          current.value + next1.value,
          next1.value + next2.value,
        )
      }
    }

    // It's a removal.
    return this.newRemovedDiff(1, current.value)
  }

  private newAddedDiff(numChanges: number, newText: string): Diff.Diff {
    const range: [number, number] = [this.currentLocation, this.currentLocation]
    this.currentIndex = this.currentIndex + numChanges
    return Diff.Addition(range, newText)
  }

  private newRemovedDiff(numChanges: number, oldText: string): Diff.Diff {
    const range: [number, number] = [
      this.currentLocation,
      this.currentLocation + oldText.length,
    ]
    this.currentIndex = this.currentIndex + numChanges
    this.currentLocation = this.currentLocation + oldText.length
    return Diff.Removal(range, oldText)
  }

  private newReplacedDiff(
    numChanges: number,
    oldText: string,
    newText: string,
  ): Diff.Diff {
    const range: [number, number] = [
      this.currentLocation,
      this.currentLocation + oldText.length,
    ]
    this.currentIndex = this.currentIndex + numChanges
    this.currentLocation = this.currentLocation + oldText.length
    return Diff.Replacement(range, oldText, newText)
  }
}
