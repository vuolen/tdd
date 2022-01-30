import { Block } from "./Block.mjs";

export class Board {
  width;
  height;
  columns;
  fallingPiece;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pieceFalling = false;
    this.columns = []
    for (let i = 0; i < this.width; i++) {
      this.columns.push(Array(height).fill(Block.EMPTY))
    }
  }

  toString() {
    let str = ""
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        str += this.columns[col][row].color
      }
      str += "\n"
    }
    return str
  }

  drop(block) {
    if (this.fallingPiece) {
      throw new Error("already falling")
    }
    this.columns[Math.floor(this.width / 2)][0] = block
    this.fallingPiece = block
  }

  tick() {
    this.columns.forEach(column => this.tickColumn(column))
  }

  tickColumn(column) {
    for (let i = this.height - 1; i > 0; i--) {
      if (column[i] === Block.EMPTY) {
        column[i] = column[i - 1]
        column[i - 1] = Block.EMPTY
      } else if (column[i] === this.fallingPiece) {
        this.fallingPiece = undefined
      }
    }
  }

  hasFalling() {
    return this.fallingPiece ? true : false
  }
}
