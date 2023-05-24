import { SquareValue } from "./App";

export const checkDiagonalWin = (
  dimension: number,
  board: SquareValue[][],
  curPlayer: SquareValue
) => {
  let returnArray = [];
  let count = 0;
  for (let i = 0; i < dimension; i++) {
    if (board[i][i] === curPlayer) {
      count++;
      returnArray.push(i * dimension + i);
    }
  }
  if (count === dimension) {
    return returnArray;
  }
  returnArray = [];
  count = 0;
  for (let i = 0; i < dimension; i++) {
    if (board[i][dimension - i - 1] === curPlayer) {
      count++;
      returnArray.push(i * dimension + dimension - i - 1);
    }
  }
  if (count === dimension) {
    return returnArray;
  }
  return [];
};

export const checkRowWin = (
  dimension: number,
  board: SquareValue[][],
  curPlayer: SquareValue
) => {
  let returnArray = [];
  let count = 0;
  for (let i = 0; i < dimension; i++) {
    count = 0;
    for (let j = 0; j < dimension; j++) {
      if (board[i][j] === curPlayer) {
        count++;
        returnArray.push(i * dimension + j);
      }
    }
    if (count === dimension) {
      return returnArray;
    }
    returnArray = [];
  }
  return [];
};

export const checkColWin = (
  dimension: number,
  board: SquareValue[][],
  curPlayer: SquareValue
) => {
  let returnArray = [];
  let count = 0;
  for (let i = 0; i < dimension; i++) {
    count = 0;
    for (let j = 0; j < dimension; j++) {
      if (board[j][i] === curPlayer) {
        count++;
        returnArray.push(j * dimension + i);
      }
    }
    if (count === dimension) {
      return returnArray;
    }
    returnArray = [];
  }
  return [];
};
