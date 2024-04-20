import { useEffect, useState } from "react";
import "./App.css";
import ReplayButton from "./ReplayButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChessBoard from "./ChessBoard";
import TextInfo from "./TextInfo";
import { chesses } from "./Data";
import { findWinChesses, isObjectEmpty, notifyWinning } from "./Functions";
function App() {
  const [onGame, setOnGame] = useState(false);
  const [xTurn, setXTurn] = useState(true);
  const [allChesses, setAllChesses] = useState(chesses);
  const [currentChess, setCurrentChess] = useState({});
  const text = !onGame ? null : xTurn ? "Lượt X" : "Lượt O";
  const [winChesses, setWinChesses] = useState([]);
  const reset = () => {
    setOnGame(true);
    setCurrentChess({});
    setWinChesses([]);
    setAllChesses(chesses);
  };
  useEffect(() => {
    if (!isObjectEmpty(currentChess)) {
      const winChessesFind = findWinChesses(allChesses, currentChess);

      if (winChessesFind.length > 0) {
        const type = winChessesFind[0].type === 1 ? "X" : "O";
        setWinChesses(winChessesFind);
        setOnGame(false);
        notifyWinning(`${type} thắng!`);
      }
    }
  }, [currentChess]);
  
  return (
    <div className="App">
      <ReplayButton reset={reset} onGame={onGame} />
      <TextInfo text={text} />
      <ChessBoard
        xTurn={xTurn}
        setXTurn={setXTurn}
        onGame={onGame}
        setAllChesses={setAllChesses}
        allChesses={allChesses}
        winChesses={winChesses}
        setCurrentChess={setCurrentChess}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
