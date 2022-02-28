import TableRender from '.';
import Area from './area';
import { findRanges } from './range';
import { ViewCell } from './types';

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
    const { _startRow, _startCol, _rows, _cols, rowHeightAt, colWidthAt } = table;

    // area2
    const area2 = Area.create(_startRow, _startCol, frows - 1, fcols - 1, tx, ty, rowHeightAt, colWidthAt);

    const [startRow4, startCol4] = [frows + table._scrollRows, fcols + table._scrollCols];

    // endRow
    let y = area2.height;
    let endRow = startRow4;
    while (y < table._height && endRow < _rows) {
      y += rowHeightAt(endRow);
      endRow += 1;
    }

    // endCol
    let x = area2.width;
    let endCol = startCol4;
    while (x < table._width && endCol < _cols) {
      x += colWidthAt(endCol);
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
      rowHeightAt,
      colWidthAt
    );

    // area1
    const area1 = Area.create(
      _startRow,
      startCol4,
      frows - 1,
      endCol - 1,
      tx + area2.width,
      ty,
      rowHeightAt,
      colWidthAt
    );

    // area3
    const area3 = Area.create(
      startRow4,
      _startCol,
      endRow - 1,
      fcols - 1,
      tx,
      ty + area2.height,
      rowHeightAt,
      colWidthAt
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
        colWidthAt
      ),
      Area.create(
        0,
        area2.range.startCol,
        _colHeader.rows - 1,
        area2.range.endCol,
        area2.x,
        0,
        getColHeaderRow,
        colWidthAt
      ),
      Area.create(
        area2.range.startRow,
        0,
        area2.range.endRow,
        _rowHeader.cols - 1,
        0,
        area2.y,
        rowHeightAt,
        getRowHeaderCol
      ),
      Area.create(
        area3.range.startRow,
        0,
        area3.range.endRow,
        _rowHeader.cols - 1,
        0,
        area4.y,
        rowHeightAt,
        getRowHeaderCol
      ),
    ];
  }

  cell(x: number, y: number): ['all' | 'row-header' | 'col-header' | 'body', ViewCell | null] | null {
    const [a1, a2, a3, a4] = this.areas;
    const [ha1, ha21, ha23, ha3] = this.headerAreas;

    const inRowHeader = x < a2.x;
    const inColHeader = y < a2.y;
    if (inRowHeader && inColHeader) {
      return ['all', { row: 0, col: 0, x: 0, y: 0, width: a2.x, height: a2.y }];
    }

    if (inRowHeader) {
      if (ha23.containsy(y)) {
        return ['row-header', ha23.cell(x, y)];
      }
      return ['row-header', ha3.cell(x, y)];
    }

    if (inColHeader) {
      if (ha21.containsx(y)) {
        return ['col-header', ha21.cell(x, y)];
      }
      return ['col-header', ha1.cell(x, y)];
    }

    for (let a of this.areas) {
      if (a.contains(x, y)) {
        const c = a.cell(x, y);
        if (c) {
          const r = findRanges(this._table._merges, (it) => it.contains(c.row, c.col));
          if (r) {
            return ['body', { row: r.startRow, col: r.startCol, ...a.rect(r) }];
          }
          return ['body', c];
        }
      }
    }

    return null;
  }
}
