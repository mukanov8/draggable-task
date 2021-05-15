import React from "react";

const Box = React.memo(() => (
  <div
    className="box"
    style={{
      background: "blueviolet",
      width: "100px",
      padding: "16px",
      borderRadius: "8px",
      color: "white",
      textAlign: "center",
      userSelect: "none",
    }}
  >
    This is a draggable box.
  </div>
));

export default Box;
