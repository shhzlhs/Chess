import { useEffect, useState } from "react";
import "./App.css";
import { baseBlackChesses, baseWhiteChesses, positions } from "./Datas";
import {
  findIdforPosisitionStyle,
  isObjectEmpty,
  notifyWinning,
  possiblePossitions,
} from "./Functions";
import WhitePrison from "./WhitePrison";
import BlackPrison from "./BlackPrison";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpgradePawnModal from "./UpgradePawnModal";
function App() {
  const [totalTurn, setTotalTurn] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [whiteChesses, setWhiteChesses] = useState(baseWhiteChesses);
  const [blackChesses, setBlackChesses] = useState(baseBlackChesses);
  const [whiteChessesBeEaten, setWhiteChessesBeEaten] = useState([]);
  const [blackChessesBeEaten, setBlackChessesBeEaten] = useState([]);
  const [turn, setTurn] = useState(1);
  const [readyChess, setReadyChesss] = useState({});
  const chesses = whiteChesses.concat(blackChesses);
  const possibles = possiblePossitions(readyChess, chesses, totalTurn);
  const [showModal, setShowModal] = useState(false);
  const whitePawnToUpgrade = whiteChesses.find(
    (c) => c.i === 8 && c.name === "S"
  );
  const blackPawnToUpgrade = blackChesses.find(
    (c) => c.i === 1 && c.name === "S"
  );
  useEffect(() => {
    const whiteKing = whiteChesses.find((c) => c.name === "K");
    const blackKing = blackChesses.find((c) => c.name === "K");
    if (!whiteKing) {
      notifyWinning(`Quân đen thắng sau ${totalTurn / 2} nước đi!`);
      setIsPlaying(false);
    }
    if (!blackKing) {
      notifyWinning(`Quân trắng thắng sau ${(totalTurn - 1) / 2 + 1} nước đi!`);
      setIsPlaying(false);
    }

    if (whitePawnToUpgrade || blackPawnToUpgrade) {
      setShowModal(true);
    }
  }, [whiteChesses, blackChesses]);

  const pickReadyChess = (chess) => {
    if (turn === chess.color) {
      setReadyChesss(chess);
    }
  };
  const eat = (chess, possition) => {
    setTotalTurn(totalTurn + 1);
    if (chess.color === 1) {
      setWhiteChessesBeEaten([...whiteChessesBeEaten, chess]);
      setWhiteChesses(whiteChesses.filter((c) => c.id !== chess.id));

      let updateBlackChess = {
        ...readyChess,
        i: possition.i,
        j: possition.j,
        turn: totalTurn + 1,
        moves: [...readyChess.moves, { i: possition.i, j: possition.j }],
      };
      setBlackChesses(
        blackChesses.map((c) => (c.id !== readyChess.id ? c : updateBlackChess))
      );
      setReadyChesss({});
      setTurn(1);
    } else {
      setBlackChessesBeEaten([...blackChessesBeEaten, chess]);
      setBlackChesses(blackChesses.filter((c) => c.id !== chess.id));
      let updateWhiteChess = {
        ...readyChess,
        i: possition.i,
        j: possition.j,
        turn: totalTurn + 1,
        moves: [...readyChess.moves, { i: possition.i, j: possition.j }],
      };
      setWhiteChesses(
        whiteChesses.map((c) => (c.id !== readyChess.id ? c : updateWhiteChess))
      );

      setReadyChesss({});
      setTurn(2);
    }
  };
  const move = (chess, possition) => {
    setTotalTurn(totalTurn + 1);
    if (chess.color === 1) {
      let updateWhiteChess = {
        ...chess,
        i: possition.i,
        j: possition.j,
        turn: totalTurn + 1,
        moves: [...chess.moves, { i: possition.i, j: possition.j }],
      };
      setWhiteChesses(
        whiteChesses.map((c) => (c.id === chess.id ? updateWhiteChess : c))
      );
      if (
        chess.name === "K" &&
        chess.moves.length === 0 &&
        (possition.i === 1) & (possition.j === 7)
      ) {
        let updateC18 = {
          ...chesses.find((c) => c.i === 1 && c.j === 8),
          j: 6,
          moves: [{ i: 1, j: 6 }],
          turn: totalTurn + 1,
        };
        setWhiteChesses(
          whiteChesses.map((c) =>
            c.id === updateC18.id
              ? updateC18
              : c.id === chess.id
              ? updateWhiteChess
              : c
          )
        );
      }
      if (
        chess.name === "K" &&
        chess.moves.length === 0 &&
        (possition.i === 1) & (possition.j === 2)
      ) {
        let updateC11 = {
          ...chesses.find((c) => c.i === 1 && c.j === 1),
          j: 3,
          turn: totalTurn + 1,
          move: [{ i: 1, j: 3 }],
        };
        setWhiteChesses(
          whiteChesses.map((c) =>
            c.id === updateC11.id
              ? updateC11
              : c.id === chess.id
              ? updateWhiteChess
              : c
          )
        );
      }
      setReadyChesss({});
      setTurn(2);
    } else {
      let updateBlackChess = {
        ...chess,
        i: possition.i,
        j: possition.j,
        turn: totalTurn + 1,
        moves: [...chess.moves, { i: possition.i, j: possition.j }],
      };
      setBlackChesses(
        blackChesses.map((c) => (c.id === chess.id ? updateBlackChess : c))
      );
      if (
        chess.name === "K" &&
        chess.moves.length === 0 &&
        (possition.i === 8) & (possition.j === 7)
      ) {
        let updateC88 = {
          ...chesses.find((c) => c.i === 8 && c.j === 8),
          j: 6,
          turn: totalTurn + 1,
          moves: [{ i: 8, j: 6 }],
        };
        setBlackChesses(
          blackChesses.map((c) =>
            c.id === updateC88.id
              ? updateC88
              : c.id === chess.id
              ? updateBlackChess
              : c
          )
        );
      }
      if (
        chess.name === "K" &&
        chess.moves.length === 0 &&
        (possition.i === 8) & (possition.j === 2)
      ) {
        let updateC81 = {
          ...chesses.find((c) => c.i === 8 && c.j === 1),
          j: 3,
          moves: [{ i: 8, j: 3 }],
          turn: totalTurn + 1,
        };
        setBlackChesses(
          blackChesses.map((c) =>
            c.id === updateC81.id
              ? updateC81
              : c.id === chess.id
              ? updateBlackChess
              : c
          )
        );
      }
      setReadyChesss({});
      setTurn(1);
    }
  };
  const catchCrossPawn = (chess, possition) => {
    setTotalTurn(totalTurn + 1);
    if (chess.color === 2) {
      const updateBlackChess = {
        ...chess,
        i: possition.i,
        j: possition.j,
        turn: totalTurn + 1,
        moves: [...chess.moves, { i: possition.i, j: possition.j }],
      };
      const beCaughtChess = chesses.find(
        (c) => c.j === possition.j && possition.i === c.i - 1
      );

      setBlackChesses(
        blackChesses.map((b) =>
          b.id === updateBlackChess.id ? updateBlackChess : b
        )
      );
      setWhiteChesses(whiteChesses.filter((w) => w.id !== beCaughtChess.id));
      setWhiteChessesBeEaten([...whiteChessesBeEaten, beCaughtChess]);
      setTurn(1);
    } else {
      const updateBlackChess = {
        ...chess,
        i: possition.i,
        j: possition.j,
        turn: totalTurn + 1,
        moves: [...chess.moves, { i: possition.i, j: possition.j }],
      };
      const beCaughtChess = chesses.find(
        (c) => c.j === possition.j && possition.i === c.i + 1
      );

      setWhiteChesses(
        whiteChesses.map((b) =>
          b.id === updateBlackChess.id ? updateBlackChess : b
        )
      );
      setBlackChesses(blackChesses.filter((w) => w.id !== beCaughtChess.id));
      setBlackChessesBeEaten([...blackChessesBeEaten, beCaughtChess]);
      setTurn(2);
    }
    setReadyChesss({});
  };

  let items = positions.map((p, index) => {
    const chess = chesses.find((c) => c.i === p.i && c.j === p.j);

    const img = chess ? (
      <img
        className="chess"
        src={`/imgs/${chess.img}`}
        style={{
          width:
            !isObjectEmpty(readyChess) &&
            readyChess.i === p.i &&
            readyChess.j === p.j
              ? "75px"
              : "65px",
        }}
      ></img>
    ) : null;
    return (
      <div
        onClick={() => {
          if (isPlaying) {
            if (isObjectEmpty(readyChess)) {
              if (chess) {
                pickReadyChess(chess);
              }
            } else {
              if (chess) {
                if (chess.color === readyChess.color) {
                  pickReadyChess(chess);
                } else {
                  if (
                    possibles.eats.some(
                      (item) => item.i === p.i && item.j === p.j
                    )
                  ) {
                    eat(chess, p);
                  }
                }
              } else {
                if (
                  possibles.moves.some(
                    (item) => item.i === p.i && item.j === p.j
                  )
                ) {
                  move(readyChess, p);
                }
                if (
                  possibles.eats.some(
                    (item) => item.i === p.i && item.j === p.j
                  )
                ) {
                  catchCrossPawn(readyChess, p);
                }
              }
            }
          }
        }}
        key={index}
        className="eachPosition"
        id={findIdforPosisitionStyle(possibles, p)}
      >
        {img}
      </div>
    );
  });
  return (
    <>
      <div className="App">
        <WhitePrison blackChessesBeEaten={blackChessesBeEaten} />
        <div>
          <div className="baseFlex">
            <button
              onClick={() => {
                setIsPlaying(true);
                setReadyChesss({});
                setTurn(1);
                setBlackChesses(baseBlackChesses);
                setWhiteChesses(baseWhiteChesses);
                setBlackChessesBeEaten([]);
                setWhiteChessesBeEaten([]);
                setTotalTurn(0);
              }}
              className="button"
            >
              <b>Play</b>
            </button>
          </div>
          <div
            className="desk"
            style={{
              border:
                turn === 1
                  ? "20px solid white"
                  : turn === 2
                  ? "20px solid black"
                  : "none",
            }}
          >
            {items}
          </div>
        </div>
        <BlackPrison whiteChessesBeEaten={whiteChessesBeEaten} />
      </div>
      <ToastContainer />
      <UpgradePawnModal
        blackChesses={blackChesses}
        setBlackChesses={setBlackChesses}
        whiteChesses={whiteChesses}
        setWhiteChesses={setWhiteChesses}
        whitePawnToUpgrade={whitePawnToUpgrade}
        blackPawnToUpgrade={blackPawnToUpgrade}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default App;
