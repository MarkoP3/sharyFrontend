import React, { useEffect, useState } from "react";
import BusinessAccountScreen from "../../../Components2/BusinessAccountScreen/BusinessAccountScreen";
import BusinessService from "../../../Services/BusinessServices/BusinessServices";

function AccountContainer() {
  const [account, setaccount] = useState({});
  const [adresses, setadresses] = useState([]);
  useEffect(() => {
    BusinessService.getAccountData().then(({ data }) => {
      setaccount(data);
    });
    BusinessService.getBusinessAddresses().then(({ data }) => {
      setadresses(data);
    });
  }, []);
  function changePrice(price, currency) {
    BusinessService.changeMealPrice({
      price: price,
      currencyId: currency,
    }).then(({ data }) => {
      BusinessService.getAccountData().then(({ data }) => {
        setaccount(data);
      });
    });
  }
  return (
    <BusinessAccountScreen
      account={account}
      adresses={adresses}
      changeMealPrice={changePrice}
    ></BusinessAccountScreen>
  );
}

export default AccountContainer;
