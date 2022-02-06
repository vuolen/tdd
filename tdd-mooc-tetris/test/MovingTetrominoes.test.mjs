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
        board.moveRight();
        expect(board.toString()).to.equalShape(
            `....T..
             ...TTT.
             .......
             .......`
        );
    })

    it("can be moved down", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown();
        expect(board.toString()).to.equalShape(
            `.......
             ...T...
             ..TTT..
             .......`
        );
    })

    it("cannot be moved left past board", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft();
        board.moveLeft();
        board.moveLeft();
        expect(board.toString()).to.equalShape(
            `.T.....
             TTT....
             .......
             .......`
        );
    })
    
    it("cannot be moved right past board", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveRight();
        board.moveRight();
        board.moveRight();
        expect(board.toString()).to.equalShape(
            `.....T.
             ....TTT
             .......
             .......`
        );
    })
    
})