import React, { useRef } from "react";

function ReceiveStationScreen({ activeDonations }) {
  const business = useRef(null);
  const quantity = useRef(0);
  return (
    <div>
      <select ref={business}>
        <option value="null">Internal</option>
        {activeDonations.map((donation) => {
          return (
            <option value={donation.id}>
              {donation.businessName} {donation.quantity} -{" "}
              {new Date(donation.donationDateTime).toLocaleDateString()}
            </option>
          );
        })}
      </select>
      <span>quantity</span>
      <input ref={quantity} type="number" />
      <button>Confirm Receivement</button>
    </div>
  );
}

export default ReceiveStationScreen;
