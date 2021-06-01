import React from "react";
import "./Business.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { NavLink } from "react-router-dom";
function Business() {
  return (
    <div id="login" className="loginContainer screen business">
      <form
        action="javascript:void(0)"
        align="center"
        className="card col-10 col-xl-4 col-md-4 col-lg-4 p-0"
      >
        <div className="cardHeader">
          <img src={process.env.PUBLIC_URL + "/foodBasket.svg"} />
          <div className="title">Shary</div>
          <div className="subtitle">Don't waste share!</div>
        </div>
        <div className="cardBody">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Phone number" />
          <input type="text" placeholder="email" />
          <input type="text" placeholder="TIN" />
          <input type="text" placeholder="Bank account number" />
          <div>
            Accept solidarity dinners?
            <br />
            <label className="switch mt-2">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <input
            type="number"
            disabled
            placeholder="Price of dinner"
            step="0.01"
          />
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
        <div className="cardFooter">
          <NavLink to="/business/login">Have an account? Login here</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Business;
