export default class Rect {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    constructor(x: number, y: number, width: number, height: number);
    /**
     * check whether or not the tabe contains (x, y)
     * @param {int} x offset on x-axis
     * @param {int} y offset on y-axis
     */
    contains(x: number, y: number): boolean;
}
