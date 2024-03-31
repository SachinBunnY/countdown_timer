import React from "react";
import "./App.css";

function Count({ numbers, text }) {
  return (
    <div className="cardDiv">
      <span className="textNums">{numbers}</span>
      <span className="textChar">{text}</span>
    </div>
  );
}

export default Count;
