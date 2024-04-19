import { Bounce, toast } from "react-toastify";
import { positions } from "./Datas";

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
export const possiblePossitions = (chess, chesses, totalTurn) => {
  switch (chess.name) {
    case "K":
      let basePossitionsK = positions.filter(
        (p) =>
          Math.abs(p.i - chess.i) <= 1 &&
          Math.abs(p.j - chess.j) <= 1 &&
          !(p.i === chess.i && p.j === chess.j)
      );
      basePossitionsK.forEach((p) => {
        const sliceChess = chesses.find(
          (c) => c.i === p.i && c.j === p.j && chess.color === c.color
        );

        if (sliceChess) {
          basePossitionsK = basePossitionsK.filter(
            (b) => !(b.i === sliceChess.i && b.j === sliceChess.j)
          );
        }
      });
      let eatsK = [];

      basePossitionsK.forEach((p) => {
        const eat = chesses.find(
          (c) => c.i === p.i && c.j === p.j && chess.color !== c.color
        );
        if (eat) {
          eatsK.push(positions.find((p) => p.i === eat.i && p.j === eat.j));
          basePossitionsK = basePossitionsK.filter(
            (b) => !(b.i === eat.i && b.j === eat.j)
          );
        }
      });

      if (chess.color === 1 && chess.moves.length === 0) {
        let chessCToExchane1 = chesses.find(
          (c) =>
            c.name === "C" && (c.i === 1) & (c.j === 1) && c.moves.length === 0
        );
        if (chessCToExchane1) {
          let chess12 = chesses.find((c) => c.i === 1 && c.j === 2);
          let chess13 = chesses.find((c) => c.i === 1 && c.j === 3);
          if (!chess12 && !chess13) {
            basePossitionsK.push(positions.find((p) => p.i === 1 && p.j === 2));
          }
        }
        let chessCToExchane2 = chesses.find(
          (c) =>
            c.name === "C" && (c.i === 1) & (c.j === 8) && c.moves.length === 0
        );
        if (chessCToExchane2) {
          let chess15 = chesses.find((c) => c.i === 1 && c.j === 5);
          let chess16 = chesses.find((c) => c.i === 1 && c.j === 6);
          let chess17 = chesses.find((c) => c.i === 1 && c.j === 7);
          if (!chess15 && !chess16 && !chess17) {
            basePossitionsK.push(positions.find((p) => p.i === 1 && p.j === 7));
          }
        }
      }
      if (chess.color === 2 && chess.moves.length === 0) {
        let chessCToExchane3 = chesses.find(
          (c) =>
            c.name === "C" && (c.i === 8) & (c.j === 1) && c.moves.length === 0
        );
        if (chessCToExchane3) {
          let chess82 = chesses.find((c) => c.i === 8 && c.j === 2);
          let chess83 = chesses.find((c) => c.i === 8 && c.j === 3);
          if (!chess82 && !chess83) {
            basePossitionsK.push(positions.find((p) => p.i === 8 && p.j === 2));
          }
        }
        let chessCToExchane4 = chesses.find(
          (c) =>
            c.name === "C" && (c.i === 8) & (c.j === 8) && c.moves.length === 0
        );
        if (chessCToExchane4) {
          let chess85 = chesses.find((c) => c.i === 8 && c.j === 5);
          let chess86 = chesses.find((c) => c.i === 8 && c.j === 6);
          let chess87 = chesses.find((c) => c.i === 8 && c.j === 7);
          if (!chess85 && !chess86 && !chess87) {
            basePossitionsK.push(positions.find((p) => p.i === 8 && p.j === 7));
          }
        }
      }

      return { moves: basePossitionsK, eats: eatsK };
    case "C":
      let basePossitionsC = positions.filter(
        (p) =>
          (p.i === chess.i || p.j === chess.j) &&
          !(p.i === chess.i && p.j === chess.j)
      );
      let eatsC = [];
      let startJRight = 0;
      for (let j = chess.j + 1; j < 9; j++) {
        const find1 = basePossitionsC.find((p) => p.j === j);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color === chess.color
          );
          if (find2) {
            startJRight = find2.j;
            break;
          }
        }
      }
      let startJLeft = 0;
      for (let j = chess.j - 1; j > 0; j--) {
        const find1 = basePossitionsC.find((p) => p.j === j);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color === chess.color
          );
          if (find2) {
            startJLeft = find2.j;
            break;
          }
        }
      }
      let startITop = 0;
      for (let i = chess.i - 1; i > 0; i--) {
        const find1 = basePossitionsC.find((p) => p.i === i);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color === chess.color
          );
          if (find2) {
            startITop = find2.i;
            break;
          }
        }
      }
      let startIBot = 0;
      for (let i = chess.i + 1; i < 9; i++) {
        const find1 = basePossitionsC.find((p) => p.i === i);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color === chess.color
          );
          if (find2) {
            startIBot = find2.i;
            break;
          }
        }
      }
      if (startJRight !== 0) {
        basePossitionsC = basePossitionsC.filter((b) => b.j < startJRight);
      }
      if (startIBot !== 0) {
        basePossitionsC = basePossitionsC.filter((b) => b.i < startIBot);
      }
      if (startITop !== 0) {
        basePossitionsC = basePossitionsC.filter((b) => b.i > startITop);
      }
      if (startJLeft !== 0) {
        basePossitionsC = basePossitionsC.filter((b) => b.j > startJLeft);
      }
      let startJRight2 = 0;
      for (let j = chess.j + 1; j < 9; j++) {
        const find1 = basePossitionsC.find((p) => p.j === j);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            startJRight2 = find2.j;
            eatsC.push(find2);
            break;
          }
        }
      }
      let startJLeft2 = 0;
      for (let j = chess.j - 1; j > 0; j--) {
        const find1 = basePossitionsC.find((p) => p.j === j);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            startJLeft2 = find2.j;
            eatsC.push(find2);
            break;
          }
        }
      }
      let startITop2 = 0;
      for (let i = chess.i - 1; i > 0; i--) {
        const find1 = basePossitionsC.find((p) => p.i === i);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            startITop2 = find2.i;
            eatsC.push(find2);
            break;
          }
        }
      }
      let startIBot2 = 0;
      for (let i = chess.i + 1; i < 9; i++) {
        const find1 = basePossitionsC.find((p) => p.i === i);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            startIBot2 = find2.i;
            eatsC.push(find2);
            break;
          }
        }
      }
      if (startJRight2 !== 0) {
        basePossitionsC = basePossitionsC.filter((b) => b.j < startJRight2);
      }
      if (startIBot2 !== 0) {
        basePossitionsC = basePossitionsC.filter((b) => b.i < startIBot2);
      }
      if (startITop2 !== 0) {
        basePossitionsC = basePossitionsC.filter((b) => b.i > startITop2);
      }
      if (startJLeft2 !== 0) {
        basePossitionsC = basePossitionsC.filter((b) => b.j > startJLeft2);
      }
      return { moves: basePossitionsC, eats: eatsC };
    case "H":
      let basePossitionsH = positions.filter(
        (p) =>
          (Math.abs(p.i - chess.i) === 1 && Math.abs(chess.j - p.j) === 2) ||
          (Math.abs(p.j - chess.j) === 1 && Math.abs(p.i - chess.i) === 2)
      );
      let eatsH = [];
      basePossitionsH.forEach((p) => {
        let sliceMove = chesses.find(
          (c) => c.i === p.i && c.j === p.j && chess.color === c.color
        );
        if (sliceMove) {
          basePossitionsH = basePossitionsH.filter(
            (b) => !(b.i === sliceMove.i && b.j === sliceMove.j)
          );
        }
        let eat = chesses.find(
          (c) => c.i === p.i && c.j === p.j && chess.color !== c.color
        );
        if (eat) {
          eatsH.push(positions.find((p) => p.i === eat.i && p.j === eat.j));
          basePossitionsH = basePossitionsH.filter(
            (b) => !(b.i === eat.i && b.j === eat.j)
          );
        }
      });
      return { eats: eatsH, moves: basePossitionsH };
    case "S":
      let basePossitionsS = [];
      let eatsS = [];
      if (chess.moves.length === 0) {
        if (chess.color === 1) {
          basePossitionsS = positions.filter(
            (p) => p.j === chess.j && p.i > chess.i && p.i <= chess.i + 2
          );
        } else {
          basePossitionsS = positions.filter(
            (p) => p.j === chess.j && p.i < chess.i && p.i >= chess.i - 2
          );
        }
      } else {
        if (chess.color === 1) {
          basePossitionsS = positions.filter(
            (p) => p.j === chess.j && p.i === chess.i + 1
          );
        } else {
          basePossitionsS = positions.filter(
            (p) => p.j === chess.j && p.i === chess.i - 1
          );
        }
      }

      if (chess.color === 1) {
        let chessCanEatsS = chesses.filter(
          (c) =>
            c.i === chess.i + 1 &&
            Math.abs(chess.j - c.j) === 1 &&
            chess.color !== c.color
        );
        if (chessCanEatsS) {
          chessCanEatsS.forEach((c) =>
            eatsS.push(positions.find((p) => p.i === c.i && c.j === p.j))
          );
        }
      } else {
        let chessCanEatsS = chesses.filter(
          (c) =>
            c.i === chess.i - 1 &&
            Math.abs(chess.j - c.j) === 1 &&
            chess.color !== c.color
        );
        if (chessCanEatsS) {
          chessCanEatsS.forEach((c) =>
            eatsS.push(positions.find((p) => p.i === c.i && c.j === p.j))
          );
        }
      }
      if (chess.color === 1 && basePossitionsS.length > 0) {
        for (let i = chess.i + 1; i <= chess.i + basePossitionsS.length; i++) {
          let find = chesses.find((p) => p.j === chess.j && p.i === i);
          if (find) {
            basePossitionsS = basePossitionsS.filter((b) => b.i < find.i);
          }
        }
      }
      if (chess.color === 2 && basePossitionsS.length > 0) {
        for (let i = chess.i - 1; i >= chess.i - basePossitionsS.length; i--) {
          let find = chesses.find((p) => p.j === chess.j && p.i === i);
          if (find) {
            basePossitionsS = basePossitionsS.filter((b) => b.i > find.i);
          }
        }
      }
      if (chess.color === 2 && chess.i === 4) {
        const jumpChesses = chesses.filter(
          (c) =>
            c.i === 4 &&
            Math.abs(c.j - chess.j) === 1 &&
            c.moves.length === 1 &&
            c.turn === totalTurn
        );
        if (jumpChesses.length > 0) {
          jumpChesses.forEach((c) =>
            eatsS.push(positions.find((p) => p.i === c.i - 1 && p.j === c.j))
          );
        }
      }
      if (chess.color === 1 && chess.i === 5) {
        const jumpChesses = chesses.filter(
          (c) =>
            c.i === 5 &&
            Math.abs(c.j - chess.j) === 1 &&
            c.moves.length === 1 &&
            c.turn === totalTurn
        );
        if (jumpChesses.length > 0) {
          jumpChesses.forEach((c) =>
            eatsS.push(positions.find((p) => p.i === c.i + 1 && p.j === c.j))
          );
        }
      }
      return { moves: basePossitionsS, eats: eatsS };
    case "E":
      let eatsE = [];
      let basePossitionsE = positions.filter(
        (p) =>
          Math.abs(p.i - chess.i) === Math.abs(p.j - chess.j) && chess.i !== p.i
      );
      for (let j = chess.j + 1; j < 9; j++) {
        let find1 = chesses.find(
          (c) =>
            c.j === j &&
            c.j - chess.j === c.i - chess.i &&
            c.color === chess.color
        );
        if (find1) {
          basePossitionsE = basePossitionsE.filter(
            (b) => !(b.j >= find1.j && b.i >= find1.i)
          );
          break;
        }
      }
      for (let j = chess.j + 1; j < 9; j++) {
        let find1 = chesses.find(
          (c) =>
            c.j === j &&
            c.j - chess.j === chess.i - c.i &&
            c.color === chess.color
        );
        if (find1) {
          basePossitionsE = basePossitionsE.filter(
            (b) => !(b.j >= find1.j && b.i <= find1.i)
          );
          break;
        }
      }
      for (let j = chess.j - 1; j > 0; j--) {
        let find1 = chesses.find(
          (c) =>
            c.j === j &&
            c.j - chess.j === chess.i - c.i &&
            c.color === chess.color
        );
        if (find1) {
          basePossitionsE = basePossitionsE.filter(
            (b) => !(b.j <= find1.j && b.i >= find1.i)
          );
          break;
        }
      }
      for (let j = chess.j - 1; j > 0; j--) {
        let find1 = chesses.find(
          (c) =>
            c.j === j &&
            c.j - chess.j === c.i - chess.i &&
            c.color === chess.color
        );
        if (find1) {
          basePossitionsE = basePossitionsE.filter(
            (b) => !(b.j <= find1.j && b.i <= find1.i)
          );
          break;
        }
      }
      for (let j = chess.j + 1; j < 9; j++) {
        const find1 = basePossitionsE.find(
          (b) => b.j === j && b.i - chess.i === b.j - chess.j
        );
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            eatsE.push(
              positions.find((p) => p.i === find2.i && p.j === find2.j)
            );
            basePossitionsE = basePossitionsE.filter(
              (b) => !(b.i >= find2.i && b.j >= find2.j)
            );
            break;
          }
        }
      }
      for (let j = chess.j + 1; j < 9; j++) {
        const find1 = basePossitionsE.find(
          (b) => b.j === j && chess.i - b.i === b.j - chess.j
        );
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            eatsE.push(
              positions.find((p) => p.i === find2.i && p.j === find2.j)
            );
            basePossitionsE = basePossitionsE.filter(
              (b) => !(b.i <= find2.i && b.j >= find2.j)
            );
            break;
          }
        }
      }
      for (let j = chess.j - 1; j > 0; j--) {
        const find1 = basePossitionsE.find(
          (b) => b.j === j && chess.i - b.i === chess.j - b.j
        );
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            eatsE.push(
              positions.find((p) => p.i === find2.i && p.j === find2.j)
            );
            basePossitionsE = basePossitionsE.filter(
              (b) => !(b.i <= find2.i && b.j <= find2.j)
            );
            break;
          }
        }
      }
      for (let j = chess.j - 1; j > 0; j--) {
        const find1 = basePossitionsE.find(
          (b) => b.j === j && chess.i - b.i === b.j - chess.j
        );
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            eatsE.push(
              positions.find((p) => p.i === find2.i && p.j === find2.j)
            );
            basePossitionsE = basePossitionsE.filter(
              (b) => !(b.i >= find2.i && b.j <= find2.j)
            );
            break;
          }
        }
      }
      return { moves: basePossitionsE, eats: eatsE };
    case "Q":
      let eatsQ1 = [];
      let basePossitionsQ1 = positions.filter(
        (p) =>
          Math.abs(p.i - chess.i) === Math.abs(p.j - chess.j) && chess.i !== p.i
      );
      for (let j = chess.j + 1; j < 9; j++) {
        let find1 = chesses.find(
          (c) =>
            c.j === j &&
            c.j - chess.j === c.i - chess.i &&
            c.color === chess.color
        );
        if (find1) {
          basePossitionsQ1 = basePossitionsQ1.filter(
            (b) => !(b.j >= find1.j && b.i >= find1.i)
          );
          break;
        }
      }
      for (let j = chess.j + 1; j < 9; j++) {
        let find1 = chesses.find(
          (c) =>
            c.j === j &&
            c.j - chess.j === chess.i - c.i &&
            c.color === chess.color
        );
        if (find1) {
          basePossitionsQ1 = basePossitionsQ1.filter(
            (b) => !(b.j >= find1.j && b.i <= find1.i)
          );
          break;
        }
      }
      for (let j = chess.j - 1; j > 0; j--) {
        let find1 = chesses.find(
          (c) =>
            c.j === j &&
            c.j - chess.j === chess.i - c.i &&
            c.color === chess.color
        );
        if (find1) {
          basePossitionsQ1 = basePossitionsQ1.filter(
            (b) => !(b.j <= find1.j && b.i >= find1.i)
          );
          break;
        }
      }
      for (let j = chess.j - 1; j > 0; j--) {
        let find1 = chesses.find(
          (c) =>
            c.j === j &&
            c.j - chess.j === c.i - chess.i &&
            c.color === chess.color
        );
        if (find1) {
          basePossitionsQ1 = basePossitionsQ1.filter(
            (b) => !(b.j <= find1.j && b.i <= find1.i)
          );
          break;
        }
      }
      for (let j = chess.j + 1; j < 9; j++) {
        const find1 = basePossitionsQ1.find(
          (b) => b.j === j && b.i - chess.i === b.j - chess.j
        );
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            eatsQ1.push(
              positions.find((p) => p.i === find2.i && p.j === find2.j)
            );
            basePossitionsQ1 = basePossitionsQ1.filter(
              (b) => !(b.i >= find2.i && b.j >= find2.j)
            );
            break;
          }
        }
      }
      for (let j = chess.j + 1; j < 9; j++) {
        const find1 = basePossitionsQ1.find(
          (b) => b.j === j && chess.i - b.i === b.j - chess.j
        );
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            eatsQ1.push(
              positions.find((p) => p.i === find2.i && p.j === find2.j)
            );
            basePossitionsQ1 = basePossitionsQ1.filter(
              (b) => !(b.i <= find2.i && b.j >= find2.j)
            );
            break;
          }
        }
      }
      for (let j = chess.j - 1; j > 0; j--) {
        const find1 = basePossitionsQ1.find(
          (b) => b.j === j && chess.i - b.i === chess.j - b.j
        );
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            eatsQ1.push(
              positions.find((p) => p.i === find2.i && p.j === find2.j)
            );
            basePossitionsQ1 = basePossitionsQ1.filter(
              (b) => !(b.i <= find2.i && b.j <= find2.j)
            );
            break;
          }
        }
      }
      for (let j = chess.j - 1; j > 0; j--) {
        const find1 = basePossitionsQ1.find(
          (b) => b.j === j && chess.i - b.i === b.j - chess.j
        );
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            eatsQ1.push(
              positions.find((p) => p.i === find2.i && p.j === find2.j)
            );
            basePossitionsQ1 = basePossitionsQ1.filter(
              (b) => !(b.i >= find2.i && b.j <= find2.j)
            );
            break;
          }
        }
      }
      let basePossitionsQ2 = positions.filter(
        (p) =>
          (p.i === chess.i || p.j === chess.j) &&
          !(p.i === chess.i && p.j === chess.j)
      );
      let eatsQ2 = [];
      let startJRightQ = 0;
      for (let j = chess.j + 1; j < 9; j++) {
        const find1 = basePossitionsQ2.find((p) => p.j === j);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color === chess.color
          );
          if (find2) {
            startJRightQ = find2.j;
            break;
          }
        }
      }
      let startJLeftQ = 0;
      for (let j = chess.j - 1; j > 0; j--) {
        const find1 = basePossitionsQ2.find((p) => p.j === j);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color === chess.color
          );
          if (find2) {
            startJLeftQ = find2.j;
            break;
          }
        }
      }
      let startITopQ = 0;
      for (let i = chess.i - 1; i > 0; i--) {
        const find1 = basePossitionsQ2.find((p) => p.i === i);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color === chess.color
          );
          if (find2) {
            startITopQ = find2.i;
            break;
          }
        }
      }
      let startIBotQ = 0;
      for (let i = chess.i + 1; i < 9; i++) {
        const find1 = basePossitionsQ2.find((p) => p.i === i);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color === chess.color
          );
          if (find2) {
            startIBotQ = find2.i;
            break;
          }
        }
      }
      if (startJRightQ !== 0) {
        basePossitionsQ2 = basePossitionsQ2.filter((b) => b.j < startJRightQ);
      }
      if (startIBotQ !== 0) {
        basePossitionsQ2 = basePossitionsQ2.filter((b) => b.i < startIBotQ);
      }
      if (startITopQ !== 0) {
        basePossitionsQ2 = basePossitionsQ2.filter((b) => b.i > startITopQ);
      }
      if (startJLeftQ !== 0) {
        basePossitionsQ2 = basePossitionsQ2.filter((b) => b.j > startJLeftQ);
      }
      let startJRightQ2 = 0;
      for (let j = chess.j + 1; j < 9; j++) {
        const find1 = basePossitionsQ2.find((p) => p.j === j);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            startJRightQ2 = find2.j;
            eatsQ2.push(find2);
            break;
          }
        }
      }
      let startJLeftQ2 = 0;
      for (let j = chess.j - 1; j > 0; j--) {
        const find1 = basePossitionsQ2.find((p) => p.j === j);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            startJLeftQ2 = find2.j;
            eatsQ2.push(find2);
            break;
          }
        }
      }
      let startITopQ2 = 0;
      for (let i = chess.i - 1; i > 0; i--) {
        const find1 = basePossitionsQ2.find((p) => p.i === i);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            startITopQ2 = find2.i;
            eatsQ2.push(find2);
            break;
          }
        }
      }
      let startIBotQ2 = 0;
      for (let i = chess.i + 1; i < 9; i++) {
        const find1 = basePossitionsQ2.find((p) => p.i === i);
        if (find1) {
          const find2 = chesses.find(
            (c) => c.i === find1.i && c.j === find1.j && c.color !== chess.color
          );
          if (find2) {
            startIBotQ2 = find2.i;
            eatsQ2.push(find2);
            break;
          }
        }
      }
      if (startJRightQ2 !== 0) {
        basePossitionsQ2 = basePossitionsQ2.filter((b) => b.j < startJRightQ2);
      }
      if (startIBotQ2 !== 0) {
        basePossitionsQ2 = basePossitionsQ2.filter((b) => b.i < startIBotQ2);
      }
      if (startITopQ2 !== 0) {
        basePossitionsQ2 = basePossitionsQ2.filter((b) => b.i > startITopQ2);
      }
      if (startJLeftQ2 !== 0) {
        basePossitionsQ2 = basePossitionsQ2.filter((b) => b.j > startJLeftQ2);
      }
      return {
        moves: basePossitionsQ1.concat(basePossitionsQ2),
        eats: eatsQ1.concat(eatsQ2),
      };
    default:
      return {};
  }
};
export const findIdforPosisitionStyle = (possibles, possition) => {
  if (!isObjectEmpty(possibles)) {
    if (possibles.moves.length > 0 && possibles.eats.length > 0) {
      if (
        possibles.moves
          .map((m) => ({
            i: m.i,
            j: m.j,
          }))
          .some((item) => item.i === possition.i && item.j === possition.j)
      ) {
        return "green";
      } else if (
        possibles.eats
          .map((m) => ({
            i: m.i,
            j: m.j,
          }))
          .some((item) => item.i === possition.i && item.j === possition.j)
      ) {
        return "red";
      } else {
        if (possition.color === "white") {
          return "white";
        } else {
          return "black";
        }
      }
    } else if (possibles.moves.length > 0 && possibles.eats.length === 0) {
      if (
        possibles.moves
          .map((m) => ({
            i: m.i,
            j: m.j,
          }))
          .some((item) => item.i === possition.i && item.j === possition.j)
      ) {
        return "green";
      } else {
        if (possition.color === "white") {
          return "white";
        } else {
          return "black";
        }
      }
    } else {
      if (
        possibles.eats
          .map((m) => ({
            i: m.i,
            j: m.j,
          }))
          .some((item) => item.i === possition.i && item.j === possition.j)
      ) {
        return "red";
      } else {
        if (possition.color === "white") {
          return "white";
        } else {
          return "black";
        }
      }
    }
  } else {
    if (possition.color === "white") {
      return "white";
    } else {
      return "black";
    }
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
