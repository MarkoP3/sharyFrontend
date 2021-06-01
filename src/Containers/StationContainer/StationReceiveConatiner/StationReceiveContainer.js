import React, { useEffect, useState } from "react";
import ReceiveStationScreen from "../../../Components2/ReceiveStationScreen/ReceiveStationScreen";
import StationServices from "../../../Services/StationServices/StationServices";

function StationReceiveContainer() {
  const [donations, setdonations] = useState([]);
  useEffect(() => {
    StationServices.getActiveDonations().then(({ data }) => {
      setdonations(data);
    });
  }, []);
  function HandleReceiveMeal(donationID, quantity) {}
  return (
    <ReceiveStationScreen activeDonations={donations}></ReceiveStationScreen>
  );
}

export default StationReceiveContainer;
