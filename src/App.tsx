import React from "react";
import "./App.css";
import Square from "./Square";
import { useState } from "react";
import { checkRowWin, checkColWin, checkDiagonalWin } from "./GameLogic";

type SquareValue = "X" | "O" | null;

function App() {
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [dimension, setDimension] = useState(3);
  const [curPlayer, setCurPlayer] = useState<SquareValue>("X");
  const [gameOver, setGameOver] = useState(false);
  const [arrayOfWinningSquares, setArrayOfWinningSquares] = useState<number[]>(
    []
  );
  const [board, setBoard] = useState<SquareValue[][]>(
    Array(dimension).fill(Array(dimension).fill(null))
  );

  const handleClick = (i: number, j: number) => {
    if (gameOver) {
      resetAll(dimension);
      return;
    }
    if (board[i][j] !== null) {
      return;
    }
    const newBoard = board.map((row, k) =>
      row.map((square, l) => {
        if (i === k && j === l) {
          return curPlayer;
        }
        return square;
      })
    );

    const rowWin = checkRowWin(dimension, newBoard, curPlayer);
    const colWin = checkColWin(dimension, newBoard, curPlayer);
    const diagonalWin = checkDiagonalWin(dimension, newBoard, curPlayer);
    if (rowWin.length || colWin.length || diagonalWin.length) {
      setGameOver(true);
      setScore({
        X: score.X + (curPlayer === "X" ? 1 : 0),
        O: score.O + (curPlayer === "O" ? 1 : 0),
      });
      setArrayOfWinningSquares(rowWin.concat(colWin).concat(diagonalWin));
    }
    setBoard(newBoard);
    setCurPlayer(curPlayer === "X" ? "O" : "X");
  };

  const resetAll = (newDim: number) => {
    setBoard(Array(newDim).fill(Array(newDim).fill(null)));
    setCurPlayer("X");
    setGameOver(false);
    setArrayOfWinningSquares([]);
  };

  const dimensionChange = (value: number) => {
    if (dimension + value < 1 || dimension + value > 25) {
      return;
    }
    setDimension(dimension + value);
    resetAll(dimension + value);
  };

  return (
    <div className="App">
      <div className="dimension section">
        <div className="dimensionButton" onClick={() => dimensionChange(-1)}>
          {"<"}
        </div>
        <p>{dimension}</p>
        <div className="dimensionButton" onClick={() => dimensionChange(1)}>
          {">"}
        </div>
      </div>
      <div className="score section">
        <p className="X">{score.X}</p> - <p className="O">{score.O}</p>
      </div>

      <div className="board">
        <p className="headerText">
          {gameOver
            ? "GAME OVER!"
            : "PLAYER " + (curPlayer === "X" ? "1" : "2") + "'S TURN"}
        </p>
        {board.map((row, i) => (
          <div className="row">
            {row.map((square, j) => (
              <Square
                value={square}
                click={() => handleClick(i, j)}
                dimension={dimension}
                inLine={arrayOfWinningSquares.includes(i * dimension + j)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export type { SquareValue };
export default App;
