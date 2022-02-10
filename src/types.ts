export type Align = 'left' | 'right' | 'center';
export type VerticalAlign = 'top' | 'bottom' | 'middle';

export type LineStyle = {
  width: number;
  color: string;
};

export type LineType = 'thin' | 'medium' | 'thick' | 'dashed' | 'dotted';

export type TextLineType = 'underline' | 'strikethrough';

export type CellStyle = {
  bgcolor: string;
  align: Align;
  valign: VerticalAlign;
  textwrap: boolean;
  underline: boolean;
  strikethrough: boolean;
  color: string;
  bold: boolean;
  italic: boolean;
  rotate: number;
  fontSize: number;
  fontName: string;
  border?: {
    left: [LineType, string];
    top: [LineType, string];
    right: [LineType, string];
    bottom: [LineType, string];
  };
  padding?: [number, number];
};

export type Cell = {
  text: string;
  value: string;
  type?: string;
  style?: CellStyle;
};

export type CellFunc = (rowIndex: number, colIndex: number) => Cell | string | number;

export type Row = {
  height: number;
  hide?: boolean;
  autoFit?: boolean;
};

export type RowFunc = (index: number) => Partial<Row> | undefined;
export type RowHeightFunc = (index: number) => number;

export type Col = {
  width: number;
  hide?: boolean;
  autoFit?: boolean;
};

export type ColFunc = (index: number) => Partial<Col> | undefined;
export type ColWidthFunc = (index: number) => number;

export type RowHeader = {
  width: number;
  cols: number;
  cell: CellFunc;
  colWidth: number;
  merges?: string[];
};

export type ColHeader = {
  height: number;
  rows: number;
  cell: CellFunc;
  rowHeight: number;
  merges?: string[];
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
