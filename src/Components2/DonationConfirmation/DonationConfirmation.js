import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import IndividualServices from "../../Services/IndividualServices/IndividualServices";
import Loader from "../Loader/Loader";

function DonationConfirmation() {
  const { accountType, donationType, confirmationType } = useParams();
  const history = useHistory();
  const donationData = new URLSearchParams(useLocation().search);

  const [loader, setloader] = useState(true);
  useEffect(() => {
    if (confirmationType == "success") {
      let individualID = donationData.get("individualID");
      let quantity = donationData.get("quantity");
      let mealPriceID = donationData.get("mealPriceID");
      let sessionID = donationData.get("sessionId");
      IndividualServices.confirmMoneyDonation(
        individualID,
        quantity,
        mealPriceID,
        sessionID
      ).then(({ data, status }) => {
        alert(status);
        history.push("individual/donations");
      });
    } else {
      history.push("individual/account");
    }
  }, []);
  return (
    <div>
      <Loader show={loader}></Loader>
    </div>
  );
}

export default DonationConfirmation;
