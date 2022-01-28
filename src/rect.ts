export default class Rect {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number
  ) {}

  /**
   * check whether or not the tabe contains (x, y)
   * @param {int} x offset on x-axis
   * @param {int} y offset on y-axis
   */
  contains(x: number, y: number): boolean {
    return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
  }
}
