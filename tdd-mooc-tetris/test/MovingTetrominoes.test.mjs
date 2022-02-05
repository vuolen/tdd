import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(7, 4);
    })

    it("can be moved left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft();
        expect(board.toString()).to.equalShape(
            `..T....
             .TTT...
             .......
             .......`
        );
    })

    it("can be moved right", () => {
        board.drop(Tetromino.T_SHAPE);
        console.log(board.toString())
        board.moveRight();
        expect(board.toString()).to.equalShape(
            `....T..
             ...TTT.
             .......
             .......`
        );
    })
})