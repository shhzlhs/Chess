import React from "react";
import "./App.css";
function WhitePrison(props) {
  let blackChessesBeEaten = props.blackChessesBeEaten;
  let items =
    blackChessesBeEaten.length > 0
      ? blackChessesBeEaten.map((c, index) => {
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
        <img className="prisonIcon" src="/imgs/1.png" alt="Prison"></img>
      </div>
      <div className="prison">{items}</div>
    </div>
  );
}

export default WhitePrison;
