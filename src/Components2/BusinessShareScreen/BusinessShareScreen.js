import React from "react";

function BusinessShareScreen({ shared, remaining, shareHandler }) {
  return (
    <div align="center" className="business formContainer">
      <div className="row col-12">
        <div className="col-6">
          <div style={{ fontSize: "10vw" }}>{remaining}</div>
          <div>Preostali obroci</div>
        </div>
        <div className="col-6">
          <div style={{ fontSize: "10vw" }}>{shared}</div>
          <div>Donirani obroci</div>
        </div>
      </div>
      <div className="row col-12 mt-5 p-5">
        <button className="btn-lg btn-secondary m-auto" onClick={shareHandler}>
          Share a meal
        </button>
      </div>
    </div>
  );
}

export default BusinessShareScreen;
