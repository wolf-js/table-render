import { Rect } from './types';
import Range from './range';
export default class Area {
    readonly range: Range;
    readonly x: number;
    readonly y: number;
    readonly rowHeight: (index: number) => number;
    readonly colWidth: (index: number) => number;
    width: number;
    height: number;
    rowMap: Map<number, {
        y: number;
        height: number;
    }>;
    colMap: Map<number, {
        x: number;
        width: number;
    }>;
    constructor(range: Range, x: number, y: number, rowHeight: (index: number) => number, colWidth: (index: number) => number);
    eachRow(cb: (index: number, y: number, height: number) => void): void;
    eachCol(cb: (index: number, x: number, width: number) => void): void;
    each(cb: (row: number, col: number, rect: Rect) => void): void;
    rect(r: Range): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    static create(startRow: number, startCol: number, endRow: number, endCol: number, x: number, y: number, rowHeight: (index: number) => number, colWidth: (index: number) => number): Area;
}
