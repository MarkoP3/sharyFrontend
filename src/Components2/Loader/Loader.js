import React from "react";
import "./Loader.css";
function Loader({ show }) {
  return (
    <div
      style={{ width: "100vw", height: "100vh", zIndex: "100" }}
      className={`bg-dark position-absolute d-${show ? "flex" : "none"}`}
    >
      <div className=" m-auto">
        <div className="loader">Loading...</div>
      </div>
    </div>
  );
}

export default Loader;
