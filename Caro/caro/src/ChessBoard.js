import React from "react";
import "./App.css";
function ChessBoard({
  allChesses,
  setAllChesses,
  xTurn,
  setXTurn,
  onGame,
  winChesses,
  setCurrentChess,
}) {
  const handleClick = (square) => {
    if (square.type === 0 && onGame) {
      if (xTurn) {
        setAllChesses(
          allChesses.map((c) =>
            c.index === square.index ? { ...square, type: 1 } : c
          )
        );
        setCurrentChess({ ...square, type: 1 });
      } else {
        setAllChesses(
          allChesses.map((c) =>
            c.index === square.index ? { ...square, type: 2 } : c
          )
        );
        setCurrentChess({ ...square, type: 2 });
      }

      setXTurn(!xTurn);
    }
  };
  const chessesBoard = allChesses.map((c) => {
    return (
      <div
        className={
          winChesses.length > 0 &&
          winChesses.map((w) => w.index).includes(c.index)
            ? "winSquare"
            : "eachSquare"
        }
        id={c.type === 1 ? "XStyle" : "OStyle"}
        key={c.index}
        onClick={() => {
          handleClick(c);
        }}
      >
        <b>{c.type === 0 ? null : c.type === 1 ? "X" : "O"}</b>
      </div>
    );
  });
  return (
    <div className="flex">
      <div className="ChessBoard">{chessesBoard}</div>
    </div>
  );
}

export default ChessBoard;
