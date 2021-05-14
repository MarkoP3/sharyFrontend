import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import LoginServices from "../../Services/LoginServices/LoginServices";
import "./Navigation.css";
function Navigation({ accountType }) {
  const history = useHistory();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ borderStyle: "none" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-link" to={`/${accountType}/account`}>
            Account
          </NavLink>
          <NavLink className="nav-link" to={`/${accountType}/donations`}>
            Donations
          </NavLink>
          <NavLink
            className={`nav-link ${
              accountType != "individual" && accountType != "admin"
                ? ""
                : "d-none"
            }`}
            to={`/${accountType}/share`}
          >
            Share
          </NavLink>
          <NavLink
            className={`nav-link ${accountType == "station" ? "" : "d-none"}`}
            to={`/${accountType}/receive`}
          >
            Receive
          </NavLink>
        </Nav>
      </Navbar.Collapse>
      <input
        type="button"
        onClick={(e) =>
          LoginServices.logOut(accountType).then((data) => {
            history.push(`/${accountType}/login`);
          })
        }
        className="btn btn-dark"
        value="Logout"
      />
    </Navbar>
  );
}

export default Navigation;
