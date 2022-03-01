import TableRender from '.';
import Area from './area';
import { ViewCell } from './types';
export declare type ViewportCellResult = ['all' | 'row-header' | 'col-header' | 'body', ViewCell | null] | null;
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
    constructor(table: TableRender);
    _cellResultCache: ViewportCellResult;
    clearCache(): void;
    cell(x: number, y: number): ViewportCellResult;
}
