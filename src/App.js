import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import OptionScreen from "./Components/OptionScreen/OptionScreen";
import AcceptorScreen from "./Components/AcceptorScreen/AcceptorScreen";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import DonorBusinessScreen from "./Components/DonorScreen/DonorBusinessScreen";
import DonorIndividualScreen from "./Components/DonorScreen/DonorIndividualScreen";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [accountType, setaccountType] = useState(
    localStorage.getItem("accountType") != null
      ? localStorage.getItem("accountType")
      : "individual"
  );
  const [accountData, setaccountData] = useState();
  const [moneyDonations, setmoneyDonations] = useState([]);
  const [solidarityDonations, setsolidarityDonations] = useState([]);
  const [mealPrice, setmealPrice] = useState();
  const [solidarityCountries, setsolidarityCountries] = useState([]);
  const [solidarityCities, setsolidarityCities] = useState([]);
  const [solidarityBusinesses, setsolidarityBusinesses] = useState([]);
  const [activeScreen, setactiveScreen] = useState("options");
  function handleAccountTypeChange(type) {
    setaccountType(type);
  }
  function logOut() {
    axios
      .get(`${process.env.REACT_APP_API_URL}${accountType}/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        changeScreen("login");
        localStorage.removeItem("accountType");
      });
  }
  function refreshAccountData() {
    axios
      .get(`${process.env.REACT_APP_API_URL}${accountType}/getAccountData`, {
        withCredentials: true,
      })
      .then(async (response) => {
        if (response.status == 200) {
          setaccountData(response.data);
          changeScreen(accountType);
          console.log("accountType", accountType);
          if (accountType == "individual") {
            refreshMoneyDonations();
            refreshSolidarityDonations();
            getMealPrice();
            getSolidarityCountries();
          } else if (accountType == "business") {
          }
        } else {
          if (localStorage.getItem("option") != null) {
            changeScreen(localStorage.getItem("option"));
          }
        }
      })
      .catch((error) => {
        if (localStorage.getItem("option") != null) {
          changeScreen(localStorage.getItem("option"));
        }
      });
  }
  function refreshMoneyDonations() {
    axios
      .get(`${process.env.REACT_APP_API_URL}individual/donations/money`, {
        withCredentials: true,
      })
      .then((response) => {
        setmoneyDonations(response.data);
      });
  }
  function getSolidarityBusinesses(city) {
    axios
      .get(`${process.env.REACT_APP_API_URL}business/solidarity?city=${city}`)
      .then((response) => {
        setsolidarityBusinesses(response.data);
      });
  }
  function refreshSolidarityDonations() {
    axios
      .get(`${process.env.REACT_APP_API_URL}individual/donations/solidarity`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) setsolidarityDonations(response.data);
      });
  }
  function getSolidarityCountries() {
    axios
      .get(`${process.env.REACT_APP_API_URL}business/solidarity/countries`)
      .then((response) => {
        setsolidarityCountries(response.data);
      });
  }
  function getSolidarityCities(country) {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}business/solidarity/cities?country=${country}`
      )
      .then((response) => {
        setsolidarityCities(response.data);
      });
  }
  function getMealPrice() {
    axios
      .get(`${process.env.REACT_APP_API_URL}station/mealPrice`)
      .then((response) => {
        setmealPrice(response.data);
      });
  }
  function changeScreen(screen) {
    setactiveScreen(screen);
  }
  useEffect(() => {
    getSolidarityCities(solidarityCountries[0]?.id);
  }, [solidarityCountries]);
  useEffect(() => {
    getSolidarityBusinesses(solidarityCities[0]?.id);
  }, [solidarityCities]);
  useEffect(() => {
    var screens = document.getElementsByClassName("screen");
    for (var i = 0; i < screens.length; i++) {
      if (screens[i].id == activeScreen) screens[i].style.display = "flex";
      else screens[i].style.display = "none";
    }
  }, [activeScreen]);
  useEffect(async () => {
    if (window.location.pathname == "/donation/money/success") {
      let props = window.location.search.split("&");
      let individualID = props[0].split("=")[1];
      let quantity = props[1].split("=")[1];
      let mealPriceID = props[2].split("=")[1];
      let sessionID = props[3].split("=")[1];
      axios
        .post(
          `${process.env.REACT_APP_API_URL}donate/individual/money/confirmation`,
          {
            individualID: individualID,
            quantity: quantity,
            mealPriceID: mealPriceID,
            stripeSessionID: sessionID,
          },
          { withCredentials: true }
        )
        .then((response) => {
          //alert(response.status);
        })
        .finally(() => {
          window.location = "/";
        });
    } else if (window.location.pathname == "/donation/solidarity/success") {
      let props = window.location.search.split("&");
      let individualID = props[0].split("=")[1];
      let quantity = props[1].split("=")[1];
      let mealPriceID = props[2].split("=")[1];
      let sessionID = props[3].split("=")[1];
      let businessID = props[4].split("=")[1];
      axios
        .post(
          `${process.env.REACT_APP_API_URL}donate/individual/solidarity/confirmation`,
          {
            individualID: individualID,
            quantity: quantity,
            mealPriceID: mealPriceID,
            stripeSessionID: sessionID,
            businessID: businessID,
          },
          { withCredentials: true }
        )
        .then((response) => {
          //alert(response.status);
        })
        .finally(() => {
          window.location = "/";
        });
    }
    refreshAccountData();
  }, []);
  return (
    <div>
      <OptionScreen changeScreen={changeScreen}></OptionScreen>
      <AcceptorScreen changeScreen={changeScreen}></AcceptorScreen>
      <LoginScreen
        changeScreen={changeScreen}
        accountType={accountType}
        handleAccountTypeChange={handleAccountTypeChange}
        refreshAccountData={refreshAccountData}
      ></LoginScreen>
      <DonorIndividualScreen
        changeScreen={changeScreen}
        accountData={accountData}
        moneyDonations={moneyDonations}
        solidarityDonations={solidarityDonations}
        mealPrice={mealPrice}
        solidarityCountries={solidarityCountries}
        solidarityCities={solidarityCities}
        solidarityBusinesses={solidarityBusinesses}
        getSolidarityBusinesses={getSolidarityBusinesses}
        getSolidarityCities={getSolidarityCities}
        logOut={logOut}
      ></DonorIndividualScreen>
      <DonorBusinessScreen changeScreen={changeScreen}></DonorBusinessScreen>
    </div>
  );
}

export default App;
