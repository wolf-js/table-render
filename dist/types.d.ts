export declare type Align = 'left' | 'right' | 'center';
export declare type VerticalAlign = 'top' | 'bottom' | 'middle';
export declare type LineStyle = {
    width: number;
    color: string;
};
export declare type LineType = 'thin' | 'medium' | 'thick' | 'dashed' | 'dotted';
export declare type TextLineType = 'underline' | 'strikethrough';
export declare type CellStyle = {
    bgcolor: string;
    align: Align;
    valign: VerticalAlign;
    textwrap: boolean;
    underline: boolean;
    strikethrough: boolean;
    color: string;
    bold: boolean;
    italic: boolean;
    fontSize: number;
    fontName: string;
    rotate?: number;
    border?: {
        left: [LineType, string];
        top: [LineType, string];
        right: [LineType, string];
        bottom: [LineType, string];
    };
    padding?: [number, number];
};
export declare type Cell = {
    text: string;
    value: string;
    type?: string;
    style?: CellStyle;
};
export declare type CellFunc = (rowIndex: number, colIndex: number) => Cell | string | number;
export declare type Row = {
    height: number;
    hide?: boolean;
    autoFit?: boolean;
    style?: CellStyle;
};
export declare type RowFunc = (index: number) => Partial<Row> | undefined;
export declare type RowHeightFunc = (index: number) => number;
export declare type Col = {
    width: number;
    hide?: boolean;
    autoFit?: boolean;
    style?: CellStyle;
};
export declare type ColFunc = (index: number) => Partial<Col> | undefined;
export declare type ColWidthFunc = (index: number) => number;
export declare type RowHeader = {
    width: number;
    cols: number;
    cell: CellFunc;
    colWidth: number;
    merges?: string[];
};
export declare type ColHeader = {
    height: number;
    rows: number;
    cell: CellFunc;
    rowHeight: number;
    merges?: string[];
};
export declare type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
