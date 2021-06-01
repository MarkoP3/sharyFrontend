import React, { useEffect, useState } from "react";
import BusinessShareScreen from "../../../Components2/BusinessShareScreen/BusinessShareScreen";
import BusinessService from "../../../Services/BusinessServices/BusinessServices";

function SharingContainer() {
  const [shared, setshared] = useState(0);
  const [remaining, setremaining] = useState(0);
  useEffect(() => {
    BusinessService.getAccountData().then(({ data }) => {
      setremaining(data.receivedSolidarityMeals - data.sharedSolidarityMeals);
      setshared(data.sharedSolidarityMeals);
    });
  }, []);
  function shareHandler(e) {
    BusinessService.shareMeal().then(({ data }) => {
      setremaining(data.receivedSolidarityMeals - data.sharedSolidarityMeals);
      setshared(data.sharedSolidarityMeals);
    });
  }
  return (
    <BusinessShareScreen
      shared={shared}
      remaining={remaining}
      shareHandler={shareHandler}
    ></BusinessShareScreen>
  );
}

export default SharingContainer;
