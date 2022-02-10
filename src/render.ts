import Table from '.';
import Area from './area';
import Canvas from './canvas';
import { cellRender } from './cell-render';
import { eachRanges } from './range';
import { Cell, CellFunc, CellStyle, LineStyle, Rect } from './types';

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

function renderGridLines(canvas: Canvas, area: Area, lineStyle: LineStyle) {
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

function renderArea(
  canvas: Canvas,
  area: Area | null,
  cell: CellFunc,
  defaultCellStyle: CellStyle,
  defaultLineStyle: LineStyle,
  merges?: string[] | null
) {
  if (!area) return;
  canvas.save().translate(area.x, area.y);

  // render lines
  renderGridLines(canvas, area, defaultLineStyle);

  canvas.rect(0, 0, area.width, area.height).clip();

  // render cells
  area.each((row, col, rect) => {
    renderCell(canvas, cell(row, col), rect, defaultCellStyle);
  });

  // render merges
  if (merges) {
    eachRanges(merges, (it) => {
      if (it.intersects(area.range)) {
        renderCell(canvas, cell(it.startRow, it.startCol), area.rect(it), defaultCellStyle);
      }
    });
  }
  canvas.restore();
}

function renderBody(canvas: Canvas, area: Area | null, table: Table) {
  renderArea(canvas, area, table._cell, table._cellStyle, table._lineStyle, table._merges);
}

function renderRowHeader(canvas: Canvas, area: Area | null, table: Table) {
  const { cell, width, merges, cols } = table._rowHeader;
  if (width > 0) {
    renderArea(canvas, area, cell, table._headerCellStyle, table._headerLineStyle, merges);
  }
}

function renderColHeader(canvas: Canvas, area: Area | null, table: Table) {
  const { cell, height, merges, rows } = table._colHeader;
  if (height > 0) {
    renderArea(canvas, area, cell, table._headerCellStyle, table._headerLineStyle, merges);
  }
}

export function render(table: Table) {
  const { _width, _height, _target, _scale, _viewport, _freeze, _rowHeader, _colHeader } = table;
  if (_viewport) {
    const canvas = new Canvas(_target, _scale);
    canvas.size(_width, _height);

    const [area1, area2, area3, area4] = _viewport.areas;
    const [headerArea1, headerArea21, headerArea23, headerArea3] = _viewport.headerAreas;

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
      renderArea(canvas, area0, () => '', table._headerCellStyle, table._headerLineStyle);
    }
  }
}
