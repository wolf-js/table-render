import TableRender from '.';
import Area from './area';

export default class Viewport {
  /**
   * [area1, area2, area3, area4]
   * -----------------------
   * |  area-2   |   area-1
   * |-----------|----------
   * |  area-3   |   area-4
   * -----------------------
   */
  areas: Area[];

  /**
   * [area1, area21, area23, area3]
   *             |   area-21   | area-1
   * ------------|-----------------------
   *   area-23   |   body
   * ------------|
   *   area-3    |
   */
  headerAreas: Area[];

  _table: TableRender;

  constructor(table: TableRender) {
    this._table = table;

    const [tx, ty] = [table._rowHeader.width, table._colHeader.height];
    const [fcols, frows] = table._freeze;
    const { _startRow, _startCol, _rows, _cols } = table;

    const getRowHeight = (index: number) => table.rowHeightAt(index);
    const getColWidth = (index: number) => table.colWidthAt(index);

    // area2
    const area2 = Area.create(_startRow, _startCol, frows - 1, fcols - 1, tx, ty, getRowHeight, getColWidth);

    const [startRow4, startCol4] = [frows + table._scrollRows, fcols + table._scrollCols];

    // endRow
    let y = area2.height;
    let endRow = startRow4;
    while (y < table._height && endRow < _rows) {
      y += getRowHeight(endRow);
      endRow += 1;
    }

    // endCol
    let x = area2.width;
    let endCol = startCol4;
    while (x < table._width && endCol < _cols) {
      x += getColWidth(endCol);
      endCol += 1;
    }

    // area4
    const area4 = Area.create(
      startRow4,
      startCol4,
      endRow - 1,
      endCol - 1,
      tx + area2.width,
      ty + area2.height,
      getRowHeight,
      getColWidth
    );

    // area1
    const area1 = Area.create(
      _startRow,
      startCol4,
      frows - 1,
      endCol - 1,
      tx + area2.width,
      ty,
      getRowHeight,
      getColWidth
    );

    // area3
    const area3 = Area.create(
      startRow4,
      _startCol,
      endRow - 1,
      fcols - 1,
      tx,
      ty + area2.height,
      getRowHeight,
      getColWidth
    );

    this.areas = [area1, area2, area3, area4];

    // header areas
    const { _rowHeader, _colHeader } = table;
    const getColHeaderRow = () => _colHeader.height / _colHeader.rows;
    const getRowHeaderCol = () => _rowHeader.width / _rowHeader.cols;

    // 1, 2-1, 2-3, 3,
    this.headerAreas = [
      Area.create(
        0,
        area1.range.startCol,
        _colHeader.rows - 1,
        area1.range.endCol,
        area4.x,
        0,
        getColHeaderRow,
        getColWidth
      ),
      Area.create(
        0,
        area2.range.startCol,
        _colHeader.rows - 1,
        area2.range.endCol,
        area2.x,
        0,
        getColHeaderRow,
        getColWidth
      ),
      Area.create(
        area2.range.startRow,
        0,
        area2.range.endRow,
        _rowHeader.cols - 1,
        0,
        area2.y,
        getRowHeight,
        getRowHeaderCol
      ),
      Area.create(
        area3.range.startRow,
        0,
        area3.range.endRow,
        _rowHeader.cols - 1,
        0,
        area4.y,
        getRowHeight,
        getRowHeaderCol
      ),
    ];
  }

  cellAtRowHeader(x: number, y: number) {
    const a2 = this.areas[1];
    const [, , ha23, ha3] = this.headerAreas;
    if (x < a2.x) {
      return (ha23.containsy(y) ? ha23 : ha3).cellAt(x, y);
    }
    return null;
  }

  cellAtColHeader(x: number, y: number) {
    const a2 = this.areas[1];
    const [ha1, ha21] = this.headerAreas;
    if (y < a2.y) {
      return (ha21.containsx(x) ? ha21 : ha1).cellAt(x, y);
    }
    return null;
  }

  cellAt(x: number, y: number) {
    for (let a of this.areas) {
      if (a.contains(x, y)) {
        return a.cellAt(x, y);
      }
    }
    return null;
  }
}
