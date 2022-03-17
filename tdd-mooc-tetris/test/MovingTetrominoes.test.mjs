import { expect } from "chai";
import { Block } from "../src/Block.mjs";
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

   it("cannot be moved down past board", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown();
        board.moveDown();
        board.moveDown();
        expect(board.toString()).to.equalShape(
            `.......
             .......
             ...T...
             ..TTT..`
        );
        expect(board.hasFalling()).to.be.false
    })

    it("cannot be moved left through blocks", () => {
        for (let i = 0; i < 4; i++) {
            board.drop(new Block("Y"))
            board.moveLeft()
            board.moveLeft()
            board.moveLeft()
            board.moveDown()
            board.moveDown()
            board.moveDown()
            board.moveDown()
            board.moveDown()
        }
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft();
        board.moveLeft();
        expect(board.toString()).to.equalShape(
             `Y.T....
              YTTT...
              Y......
              Y......`
        );
    })
    
}) 