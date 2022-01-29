import Table from './src';
const longText = 'you are a good boy, a very good boy-------!!!';

function cellText(ri: number, ci: number): string {
  return ri === 8 && ci === 1 ? longText : `${ri}-${ci}`;
}

// .selection('B9:D11')
Table.create('#table', 800, 500)
  .colHeader({ height: 50, rows: 2, merges: ['A1:C1', 'D1:D2'] })
  .merges(['G9:H10', 'B9:D10'])
  .startRow(2)
  .rows(20)
  .cols(8)
  .col((index) => (index == 5 ? { hide: true } : undefined))
  .freeze(6, 2)
  .scrollRows(2)
  .scrollCols(1)
  .cell((ri, ci) => cellText(ri, ci))
  .render();
