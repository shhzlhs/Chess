import React from "react";
import "./App.css";
function TextInfo({ text }) {
  return (
    <div className="flex" id="text">
      <h3>{text}</h3>
    </div>
  );
}

export default TextInfo;
