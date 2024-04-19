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
  //Tổng lượt đi:
  const [totalTurn, setTotalTurn] = useState(0);
  //Trạng thái bàn cờ (đang trong ván hay không):
  const [isPlaying, setIsPlaying] = useState(false);
  //Quân trắng trên bàn:
  const [whiteChesses, setWhiteChesses] = useState(baseWhiteChesses);
  //Quân đen trên bàn
  const [blackChesses, setBlackChesses] = useState(baseBlackChesses);
  //Quân trắng bị ăn:
  const [whiteChessesBeEaten, setWhiteChessesBeEaten] = useState([]);
  //Quân đen bị ăn
  const [blackChessesBeEaten, setBlackChessesBeEaten] = useState([]);
  //Lượt đi (1 - trắng, 2 - đen)
  const [turn, setTurn] = useState(1);
  //Quân cờ sẵn sàng đi:
  const [readyChess, setReadyChesss] = useState({});
  //Tất cả quân cờ trên bàn (trắng + đen):
  const chesses = whiteChesses.concat(blackChesses);
  //Các nước đi khả dụng của quân cờ sẵn sàng đi:
  const possibles = possiblePossitions(readyChess, chesses, totalTurn);
  //Hiển thị Modal phong cấp quân tốt:
  const [showModal, setShowModal] = useState(false);
  //Quân tốt trắng được phong cấp:
  const whitePawnToUpgrade = whiteChesses.find(
    (c) => c.i === 8 && c.name === "S"
  );
  //Quân tốt đen được phong cấp:
  const blackPawnToUpgrade = blackChesses.find(
    (c) => c.i === 1 && c.name === "S"
  );
  useEffect(() => {
    const whiteKing = whiteChesses.find((c) => c.name === "K");
    const blackKing = blackChesses.find((c) => c.name === "K");
    //1 trong 2 quân vua bị ăn là báo thua và kết thúc ván:
    if (!whiteKing) {
      notifyWinning(`Quân đen thắng sau ${totalTurn / 2} nước đi!`);
      setIsPlaying(false);
    }
    if (!blackKing) {
      notifyWinning(`Quân trắng thắng sau ${(totalTurn - 1) / 2 + 1} nước đi!`);
      setIsPlaying(false);
    }
    //Nếu tồn tại quân tốt trắng hoặc đen có thể phong cấp thì show Modal lên
    if (whitePawnToUpgrade || blackPawnToUpgrade) {
      setShowModal(true);
    }
  }, [whiteChesses, blackChesses]);
  // Hàm chọn quân để đi:
  const pickReadyChess = (chess) => {
    if (turn === chess.color) {
      setReadyChesss(chess);
    }
  };
  // Hàm ăn quân đối phương:
  const eat = (chess, possition) => {
    setTotalTurn(totalTurn + 1);
    // Quân bị ăn là quân trắng:
    if (chess.color === 1) {
      // Thêm vào quân trắng bị ăn:
      setWhiteChessesBeEaten([...whiteChessesBeEaten, chess]);
      //Loại bỏ quân bị ăn khỏi bàn cờ:
      setWhiteChesses(whiteChesses.filter((c) => c.id !== chess.id));
      // Quân đen sau khi ăn:
      let updateBlackChess = {
        ...readyChess,
        i: possition.i,
        j: possition.j,
        turn: totalTurn + 1,
        moves: [...readyChess.moves, { i: possition.i, j: possition.j }],
      };
      // Cập nhật lại danh sách quân đen (thay thế quân đen vừa thực hiện ăn)
      setBlackChesses(
        blackChesses.map((c) => (c.id !== readyChess.id ? c : updateBlackChess))
      );
      //Reset lại quân sẵn sàng đi và chuyển lượt đi sang trắng:
      setReadyChesss({});
      setTurn(1);
      //Tương tự với quân bị ăn là quân đen:
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
  // Hàm di chuyển:
  const move = (chess, possition) => {
    // Tăng số lượt đi thêm 1:
    setTotalTurn(totalTurn + 1);
    // Nếu quân di chuyển là quân trắng:
    if (chess.color === 1) {
      // Cập nhật vị trí mới cho quân cờ vừa nhấn di chuyển:
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
      // Nếu di chuyển quân vua lần đầu và chọn vị trí nhập thành thì tiến hành nhập thành:
      // Đơn giản là ngoài di chuyển quân vua thì tự động di chuyển quân xe:
      if (
        chess.name === "K" &&
        chess.moves.length === 0 &&
        (possition.i === 1) & (possition.j === 7)
      ) {
        // Quân xe 18 sau khi nhập thành:
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
        // Quân xe 11:
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
  // Hàm bắt tốt qua đường:
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
  // Bàn cờ hiển thị trên màn hình (map từ list positions):
  let items = positions.map((p, index) => {
    const chess = chesses.find((c) => c.i === p.i && c.j === p.j);
    //Tìm xem có quân cờ nào cùng vị trí với mỗi ô không, nếu có thì hiển thị quân cờ lên, không thì null
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
          //Click vào 1 ô bất kỳ trên bàn cờ:
          //Nếu đang trong ván:
          if (isPlaying) {
            //Nếu chưa có quân cờ sẵn sàng đi:
            if (isObjectEmpty(readyChess)) {
              // Nếu ô click vào có quân cờ thì chạy hàm chọn quân cờ sẵn sàng đi:
              if (chess) {
                pickReadyChess(chess);
              }
            } else {
              // Nếu có quân cờ đã sẵn sàng rồi:
              //Nếu ô click vào có quân cờ:
              if (chess) {
                //Nếu quân click vào cùng màu với quân đang sẵn sàng đi thì đổi quân sẵn sàng thành quân vừa click
                if (chess.color === readyChess.color) {
                  pickReadyChess(chess);
                } else {
                  //Nếu khác màu và nằm trong ô có thể ăn của quân đang sẵn sàng thì chạy hàm ăn quân vừa click
                  if (
                    possibles.eats.some(
                      (item) => item.i === p.i && item.j === p.j
                    )
                  ) {
                    eat(chess, p);
                  }
                }
              } else {
                //Nếu click vào ô trống trên bàn cờ và ô đó nằm trong
                //tầm di chuyển của quân cờ đang sẵn sàng thì chạy hàm di chuyển:

                if (
                  possibles.moves.some(
                    (item) => item.i === p.i && item.j === p.j
                  )
                ) {
                  move(readyChess, p);
                }
                //Trường hợp ô trống nhưng vẫn nằm trong tầm ăn (Bắt tốt qua đường) thì chạy hàm bắt tốt qua đường:
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
        //Id của 1 ô được xác định bằng hàm:
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
