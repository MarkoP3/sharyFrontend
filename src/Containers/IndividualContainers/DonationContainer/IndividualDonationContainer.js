import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import IndividualDonationScreen from "../../../Components2/IndividualDonationScreen/IndividualDonationScreen";
import BusinessService from "../../../Services/BusinessServices/BusinessServices";
import IndividualServices from "../../../Services/IndividualServices/IndividualServices";
import StationServices from "../../../Services/StationServices/StationServices";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);
function IndividualDonationContainer() {
  const pagesParams = new URLSearchParams(useLocation().search);
  const [mealPrice, setmealPrice] = useState({});
  const [solidarityBusinesses, setsolidarityBusinesses] = useState([]);
  const [maxMoneyDonationPages, setmaxMoneyDonationPages] = useState(0);
  const [maxSolidarityDonationPages, setmaxSolidarityDonationPages] =
    useState(0);
  const [moneyPage, setmoneyPage] = useState(
    pagesParams.has("moneyPage") ? pagesParams.get("moneyPage") : 1
  );
  const [solidarityPrice, setsolidarityPrice] = useState({});
  const [moneyDonations, setmoneyDonations] = useState([]);
  const [solidarityDonations, setsolidarityDonations] = useState([]);
  const [solidarityPage, setsolidarityPage] = useState(
    pagesParams.has("solidarityPage") ? pagesParams.get("solidarityPage") : 1
  );
  useEffect(() => {
    StationServices.getMealPrice().then(({ data }) => setmealPrice(data));
    BusinessService.getSolidarityBusinesses().then(({ data }) => {
      setsolidarityBusinesses(data);
      console.log(`data`, data);
    });
  }, []);
  useEffect(() => {
    IndividualServices.getMoneyDonations(moneyPage).then(({ data }) => {
      setmoneyDonations(
        data.moneyDonations != undefined ? data.moneyDonations : []
      );
      setmaxMoneyDonationPages(
        data.numOfPages != undefined ? data.numOfPages : 0
      );
    });
    IndividualServices.getSolidarityDonations(solidarityPage).then(
      ({ data }) => {
        setsolidarityDonations(
          data.solidarityDonations != undefined ? data.solidarityDonations : []
        );
        setmaxSolidarityDonationPages(
          data.solidarityDonations != undefined ? data.numOfPages : 0
        );
      }
    );
    BusinessService.getSolidarityBusinesses().then(({ data }) =>
      setsolidarityBusinesses(data)
    );
  }, [solidarityPage, moneyPage]);

  useEffect(() => {
    setmoneyPage(
      pagesParams.has("moneyPage") ? pagesParams.get("moneyPage") : 1
    );
    setsolidarityPage(
      pagesParams.has("solidarityPage") ? pagesParams.get("solidarityPage") : 1
    );
  }, [pagesParams]);

  async function donateSolidarity(quantity, business) {
    const stripe = await stripePromise;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}donate/individual/solidarity`,
        { quantity: quantity, businessID: business },
        { withCredentials: true }
      )
      .then(async (response) => {
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      });
  }
  async function donateMoney(quantity) {
    const stripe = await stripePromise;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}donate/individual/money`,
        { quantity: quantity },
        { withCredentials: true }
      )
      .then(async (response) => {
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      });
  }
  function handleBusinessSelection() {}
  return (
    <IndividualDonationScreen
      moneyDonations={moneyDonations}
      solidarityDonations={solidarityDonations}
      maxSolidarityDonationPages={maxSolidarityDonationPages}
      moneyPage={moneyPage}
      maxMoneyDonationPages={maxMoneyDonationPages}
      solidarityPage={solidarityPage}
      donateSolidarity={donateSolidarity}
      donateMoney={donateMoney}
      mealPrice={mealPrice}
      solidarityBusinesses={solidarityBusinesses}
    ></IndividualDonationScreen>
  );
}

export default IndividualDonationContainer;
