import Table from '.';
import Area from './area';
import Canvas from './canvas';
import { cellRender } from './cell-render';
import { eachRanges } from './range';
import { Cell, CellFunc, CellStyle, LineStyle, Rect, SelectionStyle } from './types';

function renderLines(canvas: Canvas, { width, color }: LineStyle, cb: () => void) {
  if (width > 0) {
    canvas.save().beginPath().attr({ lineWidth: width, strokeStyle: color });
    cb();
    canvas.restore();
  }
}

function renderCell(canvas: Canvas, cell: Cell | string | number, rect: Rect, defaultStyle: CellStyle) {
  let text = '';
  let nstyle = defaultStyle;
  if (cell) {
    if (typeof cell === 'string' || typeof cell === 'number') text = `${cell}`;
    else {
      text = cell.value || cell.text || '';
      if (cell.style) nstyle = { ...defaultStyle, ...cell.style };
    }
  }
  cellRender(canvas, text, rect, nstyle);
}

function renderAreaLines(canvas: Canvas, area: Area, lineStyle: LineStyle) {
  renderLines(canvas, lineStyle, () => {
    // draw row lines
    area.eachRow((row, y, h) => {
      canvas.line(0, y + h, area.width, y + h);
    });
    // draw col lines
    area.eachCol((col, x, w) => {
      canvas.line(x + w, 0, x + w, area.height);
    });
  });
}

function renderAreaCells(
  canvas: Canvas,
  area: Area,
  cell: CellFunc,
  defaultStyle: CellStyle,
  merges?: string[] | null
) {
  canvas.save().rect(0, 0, area.width, area.height).clip();

  // render cells
  area.each((row, col, rect) => {
    renderCell(canvas, cell(row, col), rect, defaultStyle);
  });

  // render merges
  if (merges) {
    eachRanges(merges, (it) => {
      if (it.intersects(area.range)) {
        renderCell(canvas, cell(it.startRow, it.startCol), area.rect(it), defaultStyle);
      }
    });
  }

  canvas.restore();
}

function renderAreaSelections(
  canvas: Canvas,
  area: Area | null,
  style: SelectionStyle,
  type: 'row-header' | 'col-header' | 'body',
  max: number,
  values?: string[] | null
) {
  if (values && area) {
    eachRanges(values, (it) => {
      if (type === 'row-header') {
        it.startCol = 0;
        it.endCol = max;
      } else if (type === 'col-header') {
        it.startRow = 0;
        it.endRow = max;
      }

      if (it.intersects(area.range)) {
        let { x, y, width, height } = area.rect(it);
        const { bgcolor, borderWidth, borderColor } = style;

        canvas.save().attr({ fillStyle: bgcolor });
        if (type === 'body') {
          x += borderWidth / 2;
          y += borderWidth / 2;
          width -= borderWidth;
          height -= borderWidth;

          canvas
            .attr({
              strokeStyle: borderColor,
              lineWidth: borderWidth,
            })
            .rect(x, y, width, height)
            .fill()
            .stroke();
        } else {
          canvas.rect(x, y, width, height).fill();
        }
        canvas.restore();
      }
    });
  }
}

function renderArea(
  canvas: Canvas,
  area: Area | null,
  cell: CellFunc,
  style: CellStyle,
  lineStyle: LineStyle,
  merges: string[] | null | undefined,
  renderSelectionsCallback?: () => void
) {
  if (!area) return;
  canvas.save().translate(area.x, area.y);
  renderAreaLines(canvas, area, lineStyle);
  renderAreaCells(canvas, area, cell, style, merges);
  if (renderSelectionsCallback) renderSelectionsCallback();
  canvas.restore();
}

function renderBody(canvas: Canvas, area: Area | null, table: Table) {
  renderArea(canvas, area, table._cell, table._cellStyle, table._lineStyle, table._merges, () => {
    renderAreaSelections(canvas, area, table._selectionStyle, 'body', 0, table._selections);
  });
}

function renderRowHeader(canvas: Canvas, area: Area | null, table: Table) {
  const { cell, width, merges, cols } = table._rowHeader;
  if (width > 0) {
    renderArea(canvas, area, cell, table._headerCellStyle, table._headerLineStyle, merges, () => {
      renderAreaSelections(canvas, area, table._selectionStyle, 'row-header', cols - 1, table._selections);
    });
  }
}

function renderColHeader(canvas: Canvas, area: Area | null, table: Table) {
  const { cell, height, merges, rows } = table._colHeader;
  if (height > 0) {
    renderArea(canvas, area, cell, table._headerCellStyle, table._headerLineStyle, merges, () => {
      renderAreaSelections(canvas, area, table._selectionStyle, 'col-header', rows - 1, table._selections);
    });
  }
}

function renderFreezeLines(
  canvas: Canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  row: number,
  col: number,
  lineStyle: LineStyle
) {
  if (col > 0 || row > 0) {
    renderLines(canvas, lineStyle, () => {
      if (col > 0) canvas.line(0, y, width, y);
      if (row > 0) canvas.line(x, 0, x, height);
    });
  }
}

export function render(table: Table) {
  const { _width, _height, _target, _scale, _freeze, _areas, _headerAreas, _rowHeader, _colHeader } = table;
  const canvas = new Canvas(_target, _scale);
  canvas.size(_width, _height);

  if (_areas && _headerAreas) {
    const [area1, area2, area3, area4] = _areas;
    const [headerArea1, headerArea21, headerArea23, headerArea3] = _headerAreas;

    // render-4
    renderBody(canvas, area4, table);

    // render-1
    renderBody(canvas, area1, table);
    renderColHeader(canvas, headerArea1, table);

    // render-3
    renderBody(canvas, area3, table);
    renderRowHeader(canvas, headerArea3, table);

    // render 2
    renderBody(canvas, area2, table);
    renderColHeader(canvas, headerArea21, table);
    renderRowHeader(canvas, headerArea23, table);

    // render freeze
    const [rows, cols] = _freeze;
    if (cols > 0 || rows > 0) {
      renderLines(canvas, table._freezeLineStyle, () => {
        if (cols > 0) canvas.line(0, area4.y, _width, area4.y);
        if (rows > 0) canvas.line(area4.x, 0, area4.x, _height);
      });
    }

    // render left-top
    const { x, y } = area2;
    if (x > 0 && y > 0) {
      const area0 = Area.create(
        0,
        0,
        0,
        0,
        0,
        0,
        () => _colHeader.height,
        () => _rowHeader.width
      );
      renderArea(canvas, area0, () => '', table._headerCellStyle, table._headerLineStyle, undefined);
    }
  }
}
