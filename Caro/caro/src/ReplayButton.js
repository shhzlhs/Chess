import React from "react";
import "./App.css";
function ReplayButton({ onGame, reset }) {
  return (
    <div className="flex">
      <button onClick={reset} className="Button">
        <b>{onGame ? "Chơi lại" : "Bắt đầu chơi"}</b>
      </button>
    </div>
  );
}

export default ReplayButton;
