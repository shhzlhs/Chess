import { Bounce, toast } from "react-toastify";

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
const findContinues = (arr) => {
  arr.sort((a, b) => a - b);
  let consecutiveNumbers = [];
  for (let i = 0; i < arr.length - 4; i++) {
    if (
      arr[i] + 1 === arr[i + 1] &&
      arr[i + 1] + 1 === arr[i + 2] &&
      arr[i + 2] + 1 === arr[i + 3] &&
      arr[i + 3] + 1 === arr[i + 4]
    ) {
      consecutiveNumbers = [
        arr[i],
        arr[i + 1],
        arr[i + 2],
        arr[i + 3],
        arr[i + 4],
      ];
      break;
    }
  }

  return consecutiveNumbers;
};
export const findWinChesses = (allChesses, currentChess) => {
  let wins1 = [];
  let wins2 = [];
  let wins3 = [];
  let wins4 = [];
  const collumnChesses = allChesses.filter(
    (c) =>
      c.j === currentChess.j &&
      c.i < currentChess.i + 5 &&
      c.i > currentChess.i - 5 &&
      c.type === currentChess.type
  );
  const rowChesses = allChesses.filter(
    (c) =>
      c.i === currentChess.i &&
      c.j < currentChess.j + 5 &&
      c.j > currentChess.j - 5 &&
      c.type === currentChess.type
  );
  const diagonalLineChesses1 = allChesses.filter(
    (c) =>
      Math.abs(c.j - currentChess.j) < 5 &&
      (currentChess.i - c.i === currentChess.j - c.j ||
        c.j - currentChess.j === c.i - currentChess.i) &&
      c.type === currentChess.type
  );
  const diagonalLineChesses2 = allChesses.filter(
    (c) =>
      Math.abs(c.j - currentChess.j) < 5 &&
      (currentChess.i - c.i === c.j - currentChess.j ||
        c.j - currentChess.j === currentChess.i - c.i) &&
      c.type === currentChess.type
  );
  const collumnWinChesses = findContinues(collumnChesses.map((c) => c.i));
  const rowWinChesses = findContinues(rowChesses.map((c) => c.j));
  const diagonalLineWinChesses1 = findContinues(
    diagonalLineChesses1.map((c) => c.i)
  );
  const diagonalLineWinChesses2 = findContinues(
    diagonalLineChesses2.map((c) => c.i)
  );
  if (
    collumnWinChesses.length === 0 &&
    rowWinChesses.length === 0 &&
    diagonalLineWinChesses1.length === 0 &&
    diagonalLineWinChesses2.length === 0
  ) {
    return [];
  } else {
    if (collumnWinChesses.length > 0) {
      wins1 = collumnChesses.filter((c) => collumnWinChesses.includes(c.i));
    }
    if (rowWinChesses.length > 0) {
      wins2 = rowChesses.filter((c) => rowWinChesses.includes(c.j));
    }
    if (diagonalLineWinChesses1.length > 0) {
      wins3 = diagonalLineChesses1.filter((c) =>
        diagonalLineWinChesses1.includes(c.i)
      );
    }
    if (diagonalLineWinChesses2.length > 0) {
      wins4 = diagonalLineChesses2.filter((c) =>
        diagonalLineWinChesses2.includes(c.i)
      );
    }
    return wins1.concat(wins2).concat(wins3).concat(wins4);
  }
};
export const notifyWinning = (text) =>
  toast.success(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
