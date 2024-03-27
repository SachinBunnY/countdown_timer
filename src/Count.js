import React from "react";

function Count({ numbers, text }) {
  return (
    <div className="cardDiv">
      <h6>{numbers}</h6>
      <span>{text}</span>
    </div>
  );
}

export default Count;
