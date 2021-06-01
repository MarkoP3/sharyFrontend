import React from "react";
import Address from "./Address/Address";

function Addresses({ adresses }) {
  return (
    <div class="col-sm-12 mt-5 p-0">
      <div class="card-block">
        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Addresses</h6>
        <hr></hr>
        <div class="row">
          {adresses.map((el) => {
            return <Address address={el}></Address>;
          })}
          <div>
            <div className="btn btn-dark m-4">Add</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
