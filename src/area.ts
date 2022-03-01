import { Rect, ViewCell } from './types';
import Range from './range';

export default class Area {
  width = 0;
  height = 0;
  // { rowIndex: { y, height }}
  rowMap = new Map<number, { y: number; height: number }>();
  // { colIndex: { x, width }}
  colMap = new Map<number, { x: number; width: number }>();

  constructor(
    public readonly range: Range,
    public readonly x: number,
    public readonly y: number,
    public readonly rowHeight: (index: number) => number,
    public readonly colWidth: (index: number) => number
  ) {
    // init width, height and set rowMap, colMap
    range.eachRow((index) => {
      const height = rowHeight(index);
      if (height > 0) {
        this.rowMap.set(index, { y: this.height, height });
        this.height += height;
      }
    });
    range.eachCol((index) => {
      const width = colWidth(index);
      if (width > 0) {
        this.colMap.set(index, { x: this.width, width });
        this.width += width;
      }
    });
  }

  /**
   * check whether or not x contained in area
   * @param {int} x offset on x-axis
   */
  containsx(x: number) {
    return x >= this.x && x < this.x + this.width;
  }

  /**
   * check whether or not y contained in area
   * @param {int} y offset on y-axis
   */
  containsy(y: number) {
    return y >= this.y && y < this.y + this.height;
  }

  contains(x: number, y: number) {
    return this.containsx(x) && this.containsy(y);
  }

  eachRow(cb: (index: number, y: number, height: number) => void) {
    this.range.eachRow((index) => {
      const { y, height } = this.rowMap.get(index) || { y: 0, height: 0 };
      if (height > 0) cb(index, y, height);
    });
  }

  eachCol(cb: (index: number, x: number, width: number) => void) {
    this.range.eachCol((index) => {
      const { x, width } = this.colMap.get(index) || { x: 0, width: 0 };
      if (width > 0) cb(index, x, width);
    });
  }

  each(cb: (row: number, col: number, rect: Rect) => void) {
    this.eachRow((row, y, height) => {
      this.eachCol((col, x, width) => {
        cb(row, col, { x, y, width, height });
      });
    });
  }

  rect(r: Range) {
    const { rowMap, colMap, range } = this;
    const ret = { x: 0, y: 0, width: 0, height: 0 };

    // row: { y, height }
    if (r.startRow >= range.startRow) {
      ret.y = rowMap.get(r.startRow)?.y || 0;
    }
    r.eachRow((index) => {
      const height = this.rowHeight(index);
      if (height > 0) {
        if (index < range.startRow) ret.y -= height;
        ret.height += height;
      }
    });

    // col: { x, width }
    if (r.startCol >= range.startCol) {
      ret.x = colMap.get(r.startCol)?.x || 0;
    }
    r.eachCol((index) => {
      const width = this.colWidth(index);
      if (width > 0) {
        if (index < range.startCol) ret.x -= width;
        ret.width += width;
      }
    });

    return ret;
  }

  cell(x: number, y: number): ViewCell | null {
    if (!this.contains(x, y)) return null;
    const { startRow, startCol } = this.range;
    const vcell = {
      row: startRow,
      col: startCol,
      x: this.x,
      y: this.y,
      width: 0,
      height: 0,
    };

    // row
    while (vcell.y < y) {
      const h = this.rowHeight(vcell.row++);
      vcell.y += h;
      vcell.height = h;
    }
    vcell.y -= vcell.height;
    vcell.row--;

    // col
    while (vcell.x < x) {
      const w = this.colWidth(vcell.col++);
      vcell.x += w;
      vcell.width = w;
    }
    vcell.x -= vcell.width;
    vcell.col--;

    return vcell;
  }

  static create(
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    x: number,
    y: number,
    rowHeight: (index: number) => number,
    colWidth: (index: number) => number
  ) {
    return new Area(new Range(startRow, startCol, endRow, endCol), x, y, rowHeight, colWidth);
  }
}
