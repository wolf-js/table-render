import { stringAt, expr2xy, xy2expr } from './alphabet';
import { render } from './render';
import { LineStyle, CellStyle, Cell, RowHeader, ColHeader, CellFunc, ColFunc, RowFunc } from './types';
import Viewport from './viewport';
/**
 * ----------------------------------------------------------------
 * |            | column header                                   |
 * ----------------------------------------------------------------
 * |            |                                                 |
 * | row header |              body                               |
 * |            |                                                 |
 * ----------------------------------------------------------------
 * row { height, hide, autoFit }
 * col { width, hide, autoFit }
 * cell {
 *   value,
 *   style: {
 *     border, fontSize, fontName,
 *     bold, italic, color, bgcolor,
 *     align, valign, underline, strike,
 *     rotate, textwrap, padding,
 *   },
 *   type: text | button | link | checkbox | radio | list | progress | image | imageButton | date
 * }
 */

export default class TableRender {
  _target: HTMLCanvasElement;

  // table width
  _width = 0;

  // table height
  _height = 0;

  _scale = 1;

  // the count of rows
  _rows = 100;

  // the count of cols;
  _cols = 26;

  // the row height (px)
  _rowHeight = 25;

  // the column width (px)
  _colWidth = 100;

  // row of the start position in table
  _startRow = 0;

  // col of the start position in table
  _startCol = 0;

  // count of rows scrolled
  _scrollRows = 0;

  // count of cols scrolled
  _scrollCols = 0;

  /**
   * get row given rowIndex
   * @param {int} rowIndex
   * @returns Row | undefined
   */
  _row: RowFunc = () => undefined;

  /**
   * get col given colIndex
   * @param {int} coIndex
   * @returns Row | undefined
   */
  _col: ColFunc = () => undefined;

  /**
   * get cell given rowIndex, colIndex
   * @param {int} rowIndex
   * @param {int} colIndex
   * @returns Cell | string
   */
  _cell: CellFunc = () => undefined;

  _merges: string[] = [];

  _styles: CellStyle[] = [];

  _lineStyle: LineStyle = {
    width: 1,
    color: '#e6e6e6',
  };

  _cellStyle: CellStyle = {
    bgcolor: '#ffffff',
    align: 'left',
    valign: 'middle',
    textwrap: true,
    underline: false,
    strikethrough: false,
    color: '#0a0a0a',
    bold: false,
    italic: false,
    rotate: 0,
    fontSize: 9,
    fontName: 'Source Sans Pro',
  };

  // row header
  _rowHeader: RowHeader = {
    width: 60,
    cols: 1,
    cell(rowIndex, colIndex) {
      return rowIndex + 1;
    },
  };

  // column header
  _colHeader: ColHeader = {
    height: 25,
    rows: 1,
    cell(rowIndex, colIndex) {
      return stringAt(colIndex);
    },
  };

  _headerLineStyle: LineStyle = {
    width: 1,
    color: '#e6e6e6',
  };

  _headerCellStyle: CellStyle = {
    bgcolor: '#f4f5f8',
    align: 'center',
    valign: 'middle',
    textwrap: true,
    underline: false,
    strikethrough: false,
    color: '#585757',
    bold: false,
    italic: false,
    rotate: 0,
    fontSize: 9,
    fontName: 'Source Sans Pro',
  };

  // freezed [cols, rows]
  _freeze: [number, number] = [0, 0];

  _freezeLineStyle: LineStyle = {
    width: 2,
    color: '#d8d8d8',
  };

  // it can be used after rendering
  _viewport: Viewport | null = null;

  constructor(container: string | HTMLCanvasElement, width: number, height: number) {
    // const target = document.createElement('canvas');
    const target: HTMLCanvasElement | null =
      typeof container === 'string' ? document.querySelector(container) : container;
    if (!target) throw new Error('target error');
    this._target = target;
    this._width = width;
    this._height = height;
  }

  render() {
    this._viewport = new Viewport(this);
    render(this);
    return this;
  }

  width(value: number) {
    this._width = value;
    return this;
  }

  height(value: number) {
    this._height = value;
    return this;
  }

  scale(value: number) {
    this._scale = value;
    return this;
  }

  rows(value: number) {
    this._rows = value;
    return this;
  }

  cols(value: number) {
    this._cols = value;
    return this;
  }

  rowHeight(value: number) {
    this._rowHeight = value;
    return this;
  }

  colWidth(value: number) {
    this._colWidth = value;
    return this;
  }

  startRow(value: number) {
    this._startRow = value;
    return this;
  }

  startCol(value: number) {
    this._startCol = value;
    return this;
  }

  scrollRows(value: number) {
    this._scrollRows = value;
    return this;
  }

  scrollCols(value: number) {
    this._scrollCols = value;
    return this;
  }

  row(value: RowFunc) {
    this._row = value;
    return this;
  }

  col(value: ColFunc) {
    this._col = value;
    return this;
  }

  cell(value: (rowIndex: number, colIndex: number) => Cell | string | number | undefined) {
    this._cell = value;
    return this;
  }

  merges(value?: string[]) {
    if (value) this._merges = value;
    return this;
  }

  styles(value?: CellStyle[]) {
    if (value) this._styles = value;
    return this;
  }

  lineStyle(value: Partial<LineStyle>) {
    Object.assign(this._lineStyle, value);
    return this;
  }

  cellStyle(value: Partial<CellStyle>) {
    Object.assign(this._cellStyle, value);
    return this;
  }

  rowHeader(value?: Partial<RowHeader>) {
    if (value) Object.assign(this._rowHeader, value);
    return this;
  }

  colHeader(value?: Partial<ColHeader>) {
    if (value) Object.assign(this._colHeader, value);
    return this;
  }

  headerLineStyle(value: Partial<LineStyle>) {
    Object.assign(this._headerLineStyle, value);
    return this;
  }

  headerCellStyle(value?: Partial<CellStyle>) {
    if (value) Object.assign(this._headerCellStyle, value);
    return this;
  }

  freeze(ref?: string) {
    if (ref) this._freeze = expr2xy(ref);
    return this;
  }

  freezeLineStyle(value: Partial<LineStyle>) {
    Object.assign(this._freezeLineStyle, value);
    return this;
  }

  // get methods ---- start ------
  rowHeightAt(index: number): number {
    const { _row } = this;
    if (_row) {
      const r = _row(index);
      if (r) return r.hide ? 0 : r.height;
    }
    return this._rowHeight;
  }

  colWidthAt(index: number): number {
    const { _col } = this;
    if (_col) {
      const c = _col(index);
      if (c) return c.hide ? 0 : c.width;
    }
    return this._colWidth;
  }

  cellAt(x: number, y: number) {
    return this._viewport?.cell(x, y);
  }
  // get methods ---- end -------
}

export function createTableRender(container: string | HTMLCanvasElement, width: number, height: number) {
  return new TableRender(container, width, height);
}

export { expr2xy, xy2expr, stringAt };
