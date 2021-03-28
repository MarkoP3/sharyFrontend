import React from 'react'
import "./OptionScreen.css"
function OptionScreen({changeScreen}) {
    return (
        <div id="options" align="center" className="screen">
        <div className="btnContainer">
          <span className="text-primary display-1">Shary</span>
          <span>Are you here for the meal or to donate?</span>
          <span onClick={e=>{changeScreen("login");localStorage.setItem("option","login")}} className="btn btn-light w-100">I want to donate</span>
          <span onClick={e=>{changeScreen("acceptor");localStorage.setItem("option","acceptor")}} className="btn btn-light w-100">I need a meal</span>
        </div>
        </div>
    )
}

export default OptionScreen
