export class Block {
  static EMPTY = new Block(".")

  color;

  constructor(color) {
    this.color = color;
  }
}
