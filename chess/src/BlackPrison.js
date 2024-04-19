import React from "react";
import "./App.css";
function BlackPrison(props) {
  let whiteChessesBeEaten = props.whiteChessesBeEaten;
  let items =
    whiteChessesBeEaten.length > 0
      ? whiteChessesBeEaten.map((c, index) => {
          return (
            <div key={index}>
              <img
                className="chessBeEaten"
                src={`/imgs/${c.img}`}
                alt="chess"
              ></img>
            </div>
          );
        })
      : null;
  return (
    <div>
      <div className="flex">
        <img className="prisonIcon" src="/imgs/2.png" alt="Prison"></img>
      </div>
      <div className="prison">{items}</div>
    </div>
  );
}

export default BlackPrison;
