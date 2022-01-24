import { expr2xy } from 'table-alphabet';

/**
 * the range specified by a start position and an end position,
 * the smallest range must contain at least one cell.
 * Range is not a merged cell, but it can be merged as a single cell
 * @author myliang
 */
export default class Range {
  /**
   * @param startRow index of row of the start position
   * @param startCol index of col of the start position
   * @param endRow index of row of the end position
   * @param endCol index of col of the end position
   */
  constructor(
    public readonly startRow: number,
    public readonly startCol: number,
    public readonly endRow: number,
    public readonly endCol: number
  ) {
    // No body necessary
  }

  get start(): [number, number] {
    return [this.startRow, this.startCol];
  }

  get end(): [number, number] {
    return [this.endRow, this.endCol];
  }

  // count of rows contained in this range
  get rows(): number {
    return this.endRow - this.startRow;
  }

  // count of cols contained in this range
  get cols(): number {
    return this.endCol - this.startCol;
  }

  /**
   * check whether or not the row-index contained in the row of range
   * @param {int} index
   * @returns {boolean}
   */
  inRow(index: number): boolean {
    return this.startRow <= index && index <= this.endRow;
  }

  /**
   * check whether or not the index contained in the col of range
   * @param {int} index
   * @returns {boolean}
   */
  inCol(index: number): boolean {
    return this.startCol <= index && index <= this.endCol;
  }

  /**
   * check whether or not the range contains a cell position(row, col)
   * @param {int} rowIndex row-index
   * @param {int} colIndex col-index
   * @returns {boolean}
   */
  contains(rowIndex: number, colIndex: number): boolean {
    return this.inRow(rowIndex) && this.inCol(colIndex);
  }

  /**
   * check whether or not the range within the other range
   * @param {Range} other
   * @returns {boolean}
   */
  within(other: Range): boolean {
    return (
      this.startRow >= other.startRow &&
      this.startCol >= other.startCol &&
      this.endRow <= other.endRow &&
      this.endCol <= other.endCol
    );
  }

  /**
   * check whether or not the range intersects the other range
   * @param {Range} other
   * @returns {boolean}
   */
  intersects(other: Range): boolean {
    return (
      this.startRow <= other.endRow &&
      this.startCol <= other.endCol &&
      other.startRow <= this.endRow &&
      other.startCol <= this.endCol
    );
  }

  /**
   * the self union the other resulting in the new range
   * @param {Range} other
   * @returns {Range} the new range
   */
  union(other: Range): Range {
    return new Range(
      other.startRow < this.startRow ? other.startRow : this.startRow,
      other.startCol < this.startCol ? other.startCol : this.startCol,
      other.endRow > this.endRow ? other.endRow : this.endRow,
      other.endCol > this.endCol ? other.endCol : this.endCol
    );
  }

  /**
   * @param {Function} cb (row) => {}
   * @returns this
   */
  eachRow(cb: (index: number) => void): Range {
    for (let row = this.startRow; row <= this.endRow; row += 1) {
      cb(row);
    }
    return this;
  }

  /**
   * @param {Function} cb (col) => {}
   * @returns this
   */
  eachCol(cb: (index: number) => void): Range {
    for (let col = this.startCol; col <= this.endCol; col += 1) {
      cb(col);
    }
    return this;
  }

  /**
   * @param {Function} cb (rowIndex, colIndex) => {}
   * @returns this
   */
  each(cb: (rowIndex: number, colIndex: number) => void): Range {
    this.eachRow((row) => {
      this.eachCol((col) => cb(row, col));
    });
    return this;
  }

  clone(): Range {
    return new Range(this.startRow, this.startCol, this.endRow, this.endCol);
  }
}

export function newRange(ref: string): Range {
  const ary = ref.split(':');
  const start = expr2xy(ary[0]);
  const end = expr2xy(ary[1]);
  return new Range(start[1], start[0], end[1], end[0]);
}

export function eachRanges(refs: Array<string>, cb: (range: Range) => void) {
  if (refs && refs.length > 0) {
    refs.forEach((ref) => {
      cb(newRange(ref));
    });
  }
}

// export function findRanges(refs: Array<string>, cb) {
//   if (refs && refs.length > 0) {
//     let it = null;
//     if (refs.find((ref) => {
//       it = newRange(ref);
//       return cb(it);
//     })) {
//       return it;
//     }
//   }
//   return null;
// }
