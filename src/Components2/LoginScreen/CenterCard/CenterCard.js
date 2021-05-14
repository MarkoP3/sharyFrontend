import React, { useRef } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
// import "./CenterCard.css";
import FoodBasket from "../../../Assets/img/foodBasket.svg";
import { Link, NavLink } from "react-router-dom";

function CenterCard({ accountType, loginHandler }) {
  const username = useRef();
  const password = useRef();
  return (
    <form
      action="javascript:void(0);"
      align="center"
      className="card col-10 col-xl-4 col-md-4 col-lg-4 p-0"
      onSubmit={(e) => {
        loginHandler(username.current.value, password.current.value);
        e.target.reset();
      }}
    >
      <div className="cardHeader">
        <img src={FoodBasket} />
        <div className="title">Shary</div>
        <div className="subtitle">Don't waste share!</div>
      </div>
      <div className="cardBody">
        <input ref={username} required type="text" placeholder="username" />
        <input ref={password} required type="password" placeholder="password" />
        <input type="submit" value="Login" className="btn btn-primary" />
      </div>
      <div
        className={`cardFooter ${
          accountType == "business" || accountType == "individual"
            ? "d-block"
            : "d-none"
        }`}
      >
        <ButtonGroup>
          <NavLink to="/individual/login" className="btn btn-danger">
            Individual
          </NavLink>
          <NavLink to="/business/login" className="btn btn-danger">
            Business
          </NavLink>
        </ButtonGroup>
        <br></br>
        <Link to={`/${accountType}/register`}>
          Don't have an account? Sign up here
        </Link>
      </div>
    </form>
  );
}

export default CenterCard;
