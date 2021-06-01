import React from "react";

function Address({ address }) {
  console.log(`address`, address);
  return (
    <div class="col-sm-12 ">
      <div className="row">
        <div className="col-4">
          {address.street} {address.streetNumber}
        </div>
        <div className="col-4">{address.city}</div>
        <div className="col-4">{address.country}</div>
      </div>
    </div>
  );
}

export default Address;
