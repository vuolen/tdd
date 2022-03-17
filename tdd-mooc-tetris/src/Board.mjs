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
      this.columns.push(Array(height).fill(new Block(".")))
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
      const blocks = shape.shape.map(char => new Block(char))
      const leftMargin = Math.floor(this.width / 2 - shape.size / 2)
      this.fallingPiece = []
      for (let i = 0; i < shape.size; i++) {
        for (let j = 0; j < shape.size; j++) {
          const block = blocks[i + j * shape.size]
          if (!block.isEmpty()) {
            this.columns[leftMargin + i][j] = block
            this.fallingPiece.push(block)
          }
        }
      }
    }
  }

  tick() {
    if (this.canMove(0, 1)) {
      this.columns.forEach(column => this.tickColumn(column))
    } else {
      this.fallingPiece = undefined;
    }
  }

  outOfBounds(col, row) {
    return  col < 0 || row < 0 ||
            col >= this.width || row >= this.height
  }

  canMove(dx, dy) {
    if (this.fallingPiece === undefined) {
      return false;
    }
    for (let col = 0; col < this.width; col++) {
      for (let row = 0; row < this.width; row++) {
        if (this.fallingPiece.includes(this.columns[col][row])) {
          if (this.outOfBounds(col + dx, row + dy)) {
            return false
          }

          const nextBlock = this.columns[col + dx][row + dy]
          if (nextBlock.isEmpty() || this.fallingPiece.includes(nextBlock)) {
            continue;
          } else {
            return false;
          }
        }
      }
    }
    return true;
  }

  tickColumn(column) {
    for (let i = this.height - 1; i > 0; i--) {
      if (this.fallingPiece.includes(column[i - 1])) {
        column[i] = column[i - 1]
        column[i - 1] = new Block(".") 
      }
    }
  }

  hasFalling() {
    return this.fallingPiece ? true : false
  }

  moveHorizontal(dx) {
    const columnIndices = [...Array(this.width).keys()];
    if (dx > 0) {
      columnIndices.reverse()
    }
    for (const col of columnIndices) {
      for (let row = 0; row < this.height; row++) {
        if (this.fallingPiece.includes(this.columns[col][row])) {
          this.columns[col + dx][row] = this.columns[col][row]
          this.columns[col][row] = new Block(".") 
        }
      }
    }
  }

  moveLeft() {
    if (this.canMove(-1, 0)) {
      this.moveHorizontal(-1)
    }
  }

  moveRight() {
    if (this.canMove(1, 0)) {
      this.moveHorizontal(1)
    }
  }

  moveDown() {
    this.tick()
  }
}
