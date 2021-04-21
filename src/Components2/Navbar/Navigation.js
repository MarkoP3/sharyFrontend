import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
function Navigation({ accountType }) {
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
    </Navbar>
  );
}

export default Navigation;
