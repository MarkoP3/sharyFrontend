import React, { useEffect, useState } from "react";
import IndividualAccountScreen from "../../../Components2/IndividualAccountScreen/IndividualAccountScreen";
import IndividualServices from "../../../Services/IndividualServices/IndividualServices";
function IndividualAccountContainer() {
  const [account, setaccount] = useState({});
  useEffect(() => {
    IndividualServices.getAccountData("individual").then(({ data }) => {
      setaccount(data);
      console.log(`data`, data);
    });
  }, []);
  return <IndividualAccountScreen account={account}></IndividualAccountScreen>;
}

export default IndividualAccountContainer;
