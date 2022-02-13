import { Block } from "./Block.mjs";

export class RotatingShape {

    blocks;
    size;

    constructor(str) {
        this.blocks = str.replace(/\s/g, "").split("").map(char => new Block(char))
        this.size = str.split("\n")[0].length
    }

    toString() {
        let str = ""
        for (let i = 0; i < this.size * this.size; i += this.size) {
            str += this.blocks.slice(i, i + this.size).map(block => block.color).join("") + "\n"
        }
        return str
    }

    rotateRight() {
        const newShape = new RotatingShape(this.toString())

        const half = Math.floor(this.size / 2)

        for (let dy = -half; dy <= half; dy++) {
            for (let dx = -half; dx <= half; dx++) {
                const i = ((half + dy) * this.size) + (half + dx)
                const j = ((half + dx) * this.size) + (half - dy)
                newShape.blocks[j] = this.blocks[i]
            }
        }

        return newShape
    }

    rotateLeft() {
        return this.rotateRight().rotateRight().rotateRight()
    }
}