import React from "react";
const Loading = () => {
  return (
    <div style={style}>
      <div className="spinner-border spinner-border-lg" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Loading;

const style = { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "rgba(0, 0, 0, 0.1)", position: "fixed", zIndex: 99999, top: 0, left: 0, right: 0, bottom: 0 };
