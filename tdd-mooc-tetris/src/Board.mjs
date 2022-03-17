import { Block } from "./Block.mjs";
import { Tetromino } from "./Tetromino.mjs";

export class Board {
  width;
  height;
  columns;
  fallingPiece;
  fallingTetromino;
  fallingTetrominoPosition;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.columns = []
    for (let i = 0; i < this.width; i++) {
      this.columns.push(Array(height).fill(".").map(char => new Block(char)))
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
      this.fallingTetromino = new Tetromino(
      `...
       .${piece.color}.
       ...`, 1)
      this.fallingTetrominoPosition = [this.width / 2 - 1, 0]
    } else if (piece instanceof Tetromino) {
      this.fallingTetromino = piece
      this.fallingTetrominoPosition = [this.width / 2 - piece.size / 2, 0]
      const shape = piece.getShape()
      const leftMargin = Math.floor(this.width / 2 - shape.size / 2)
      this.fallingPiece = []
      for (let i = 0; i < shape.size; i++) {
        for (let j = 0; j < shape.size; j++) {
          const block = shape.blocks[i + j * shape.size]
          if (!block.isEmpty()) {
            const blockClone = new Block(block.color)
            this.columns[leftMargin + i][j] = blockClone
            this.fallingPiece.push(blockClone)
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
      this.fallingTetromino = undefined;
    }
    if (this.fallingTetrominoPosition) {
      this.fallingTetrominoPosition[1]++;
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

  validTranslation(dx, dy) {
    const newX = this.fallingTetrominoPosition[0] + dx
    const newY = this.fallingTetrominoPosition[1] + dy
    const size = this.fallingTetromino.size
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        
      }
    }
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
    this.fallingTetrominoPosition[0] += dx
  }

  moveLeft() {
    if (this.canMove(-1, 0)) {
      this.moveHorizontal(-1)
    }
  }

  moveRight() {
    for (let row = 0; row < this.width; row++) {
      if (this.fallingPiece.includes(this.columns[this.width - 1][row])) {
        return;
      }
    }

    this.moveHorizontal(1)
  }

  moveDown() {
    this.tick()
  }
}
