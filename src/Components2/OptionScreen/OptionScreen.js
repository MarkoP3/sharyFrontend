import React from "react";
import { Link } from "react-router-dom";
import "./OptionScreen.css";

function OptionScreen() {
  return (
    <div id="options" align="center" className="screen">
      <div className="btnContainer">
        <span className="text-primary display-1">Shary</span>
        <span>Are you here for the meal or to donate?</span>
        <Link to="/individual/login" className="btn btn-light w-100">
          I want to donate
        </Link>
        <Link to="/acceptor" className="btn btn-light w-100">
          I need a meal
        </Link>
      </div>
    </div>
  );
}

export default OptionScreen;
