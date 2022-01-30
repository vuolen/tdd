import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    static T_SHAPE = new Tetromino(
        `.T.
         TTT
         ...`,
         4
    )

    static I_SHAPE = new Tetromino(
        `.....
         .....
         IIII.
         .....
         .....`,
         2
    )

    static O_SHAPE = new Tetromino(
        `.OO
         .OO
         ...`,
         1
    )

    str;
    orientationIndex;
    orientationCount;
    orientations;

    constructor(str, orientationCount, orientationIndex = 0) {
        this.str = str;
        this.orientationCount = orientationCount;
        this.orientationIndex = orientationIndex;
        const shape = new RotatingShape(str)
        this.orientations = [
            shape,
            shape.rotateRight(),
            shape.rotateRight().rotateRight(),
            shape.rotateRight().rotateRight().rotateRight()
        ].slice(0, orientationCount)
    }

    rotateRight() {
        let newIndex = this.orientationIndex + 1
        if (newIndex >= this.orientationCount) {
            newIndex = 0
        }
        return new Tetromino(this.str, this.orientationCount, newIndex)
    }

    rotateLeft() {
        let newIndex = this.orientationIndex - 1
        if (newIndex < 0) {
            newIndex = this.orientationCount - 1
        }
        return new Tetromino(this.str, this.orientationCount, newIndex)
    }

    toString() {
        return this.getShape().toString()
    }

    getShape() {
        return this.orientations[this.orientationIndex]
    }
}