import { expr2xy, xy2expr } from './alphabet';
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
export default class Table {
    _target: HTMLCanvasElement;
    _width: number;
    _height: number;
    _scale: number;
    _rows: number;
    _cols: number;
    _rowHeight: number;
    _colWidth: number;
    _startRow: number;
    _startCol: number;
    _scrollRows: number;
    _scrollCols: number;
    /**
     * get row given rowIndex
     * @param {int} rowIndex
     * @returns Row | undefined
     */
    _row: RowFunc;
    /**
     * get col given colIndex
     * @param {int} coIndex
     * @returns Row | undefined
     */
    _col: ColFunc;
    /**
     * get cell given rowIndex, colIndex
     * @param {int} rowIndex
     * @param {int} colIndex
     * @returns Cell | string
     */
    _cell: CellFunc;
    _merges: string[];
    _styles: CellStyle[];
    _lineStyle: LineStyle;
    _cellStyle: CellStyle;
    _rowHeader: RowHeader;
    _colHeader: ColHeader;
    _headerLineStyle: LineStyle;
    _headerCellStyle: CellStyle;
    _freeze: [number, number];
    _freezeLineStyle: LineStyle;
    _viewport: Viewport | null;
    constructor(container: string | HTMLCanvasElement, width: number, height: number);
    render(): this;
    width(value: number): this;
    height(value: number): this;
    scale(value: number): this;
    rows(value: number): this;
    cols(value: number): this;
    rowHeight(value: number): this;
    colWidth(value: number): this;
    startRow(value: number): this;
    startCol(value: number): this;
    scrollRows(value: number): this;
    scrollCols(value: number): this;
    row(value: RowFunc): this;
    col(value: ColFunc): this;
    cell(value: (rowIndex: number, colIndex: number) => Cell | string | number | undefined): this;
    merges(value?: string[]): this;
    styles(value?: CellStyle[]): this;
    lineStyle(value: Partial<LineStyle>): this;
    cellStyle(value: Partial<CellStyle>): this;
    rowHeader(value?: Partial<RowHeader>): this;
    colHeader(value?: Partial<ColHeader>): this;
    headerLineStyle(value: Partial<LineStyle>): this;
    headerCellStyle(value?: Partial<CellStyle>): this;
    freeze(ref?: string): this;
    freezeLineStyle(value: Partial<LineStyle>): this;
    static create(container: string | HTMLCanvasElement, width: number, height: number): Table;
}
export { expr2xy, xy2expr };
