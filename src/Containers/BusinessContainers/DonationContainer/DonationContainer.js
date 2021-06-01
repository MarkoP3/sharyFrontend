import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BusinessDonationScreen from "../../../Components2/BusinessDonationScreen/BusinessDonationScreen";
import BusinessService from "../../../Services/BusinessServices/BusinessServices";

function DonationContainer() {
  const pagesParams = new URLSearchParams(useLocation().search);
  const [stations, setStations] = useState([]);
  const [maxFoodDonationPages, setmaxFoodDonationPages] = useState(0);
  const [maxSolidarityDonationPages, setmaxSolidarityDonationPages] =
    useState(0);
  const [foodPage, setFoodPage] = useState(
    pagesParams.has("foodPage") ? pagesParams.get("foodPage") : 1
  );
  const [solidarityPrice, setsolidarityPrice] = useState({});
  const [foodDonations, setFoodDonations] = useState([]);
  const [solidarityDonations, setsolidarityDonations] = useState([]);
  const [solidarityPage, setsolidarityPage] = useState(
    pagesParams.has("solidarityPage") ? pagesParams.get("solidarityPage") : 1
  );
  useEffect(() => {
    BusinessService.getFoodDonations(foodPage).then(({ data }) => {
      setmaxFoodDonationPages(data.numOfPages);
      setFoodDonations(data.donations);
    });
    BusinessService.getSolidarityDonations(solidarityPage).then(({ data }) => {
      setmaxSolidarityDonationPages(data.numOfPages);
      setsolidarityDonations(data.donations);
      console.log(`data`, data);
    });
  }, []);
  useEffect(() => {
    BusinessService.getFoodDonations(foodPage).then(({ data }) => {
      setmaxFoodDonationPages(data.numOfPages);
      setFoodDonations(data.donations);
    });
    BusinessService.getSolidarityDonations(solidarityPage).then(({ data }) => {
      setmaxSolidarityDonationPages(data.numOfPages);
      setsolidarityDonations(data.donations);
      console.log(`data`, data);
    });
  }, [foodPage, solidarityPage]);
  useEffect(() => {
    setFoodPage(
      pagesParams.has("moneyPage") ? pagesParams.get("moneyPage") : 1
    );
    setsolidarityPage(
      pagesParams.has("solidarityPage") ? pagesParams.get("solidarityPage") : 1
    );
  }, [pagesParams]);
  return (
    <BusinessDonationScreen
      foodDonations={foodDonations}
      solidarityDonations={solidarityDonations}
    ></BusinessDonationScreen>
  );
}

export default DonationContainer;
