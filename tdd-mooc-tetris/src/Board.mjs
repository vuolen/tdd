export class Board {
  width;
  height;
  column;
  fallingPiece;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pieceFalling = false;
    this.column = Array(height).fill(".")
  }

  toString() {
    let str = ""
    for (let i = 0; i < this.height; i++) {
      str += `.${this.column[i]}.\n`
    }
    return str
  }

  drop(block) {
    if (this.fallingPiece) {
      throw new Error("already falling")
    }
    this.column[0] = block.color
    this.fallingPiece = block.color
  }

  tick() {
    for (let i = this.height - 1; i > 0; i--) {
      if (this.column[i] === ".") {
        this.column[i] = this.column[i - 1]
        this.column[i - 1] = "."
      } else if (this.column[i] === this.fallingPiece) {
        this.fallingPiece = undefined
      }
    }
  }

  hasFalling() {
    return this.fallingPiece ? true : false
  }
}
