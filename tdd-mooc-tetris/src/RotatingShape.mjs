export class RotatingShape {

    shape;
    size;

    constructor(str) {
        this.shape = str.replace(/\s/g, "").split("")
        this.size = str.split("\n")[0].length
    }

    toString() {
        let str = ""
        for (let i = 0; i < this.size * this.size; i += this.size) {
            str += this.shape.slice(i, i + this.size).join("") + "\n"
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
                newShape.shape[j] = this.shape[i]
            }
        }

        return newShape
    }

    rotateLeft() {
        return this.rotateRight().rotateRight().rotateRight()
    }
}