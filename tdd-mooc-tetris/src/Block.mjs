export class Block {

  color;

  constructor(color) {
    this.color = color;
  }

  isEmpty() {
    return this.color === "."
  }
}
