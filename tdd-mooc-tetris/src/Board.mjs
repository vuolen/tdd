import { Block } from "./Block.mjs";
import { Tetromino } from "./Tetromino.mjs";

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

  drop(piece) {
    if (this.fallingPiece) {
      throw new Error("already falling")
    }
    if (piece instanceof Block) {
      this.columns[Math.floor(this.width / 2)][0] = piece
      this.fallingPiece = [piece]
    } else if (piece instanceof Tetromino) {
      const shape = piece.getShape()
      const blocks = shape.shape.map(char => char === "." ? Block.EMPTY : new Block(char))
      const leftMargin = Math.floor(this.width / 2 - shape.size / 2)
      this.fallingPiece = []
      for (let i = 0; i < shape.size; i++) {
        for (let j = 0; j < shape.size; j++) {
          const block = blocks[i + j * shape.size]
          if (block !== Block.EMPTY) {
            this.columns[leftMargin + i][j] = block
            this.fallingPiece.push(block)
          }
        }
      }
    }
  }

  tick() {
    if (this.columns.every(column => this.canMove(column))) {
      this.columns.forEach(column => this.tickColumn(column))
    }
  }

  canMove(column) {
    for (let i = this.height; i < this.height; i++) {
      if (this.fallingPiece.includes(column[i])) {
        if (i + 1 !== this.height) {
          return false;
        }
        const nextBlock = column[i + 1];
        if (nextBlock === Block.EMPTY || this.fallingPiece.includes(nextBlock)) {
          continue;
        }
        return false;
      }
    }
    return true;
  }

  tickColumn(column) {
    if (this.fallingPiece === undefined) {
      return;
    }
    for (let i = this.height - 1; i > 0; i--) {
      if (column[i] === Block.EMPTY) {
        column[i] = column[i - 1]
        column[i - 1] = Block.EMPTY
      } else if (this.fallingPiece.includes(column[i])) {
        this.fallingPiece = undefined
      }
    }
  }

  hasFalling() {
    return this.fallingPiece ? true : false
  }
}
