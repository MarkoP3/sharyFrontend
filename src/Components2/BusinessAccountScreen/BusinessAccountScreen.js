import React, { useRef } from "react";
import Addresses from "./Addresses/Addresses";
import "./BusinessAccountScreen.css";
function BusinessAccountScreen({ account, adresses, changeMealPrice }) {
  const currency = useRef();
  const price = useRef();
  function showMealPrice() {
    if (account.acceptSolidarityMeal)
      return (
        <React.Fragment>
          <div class="col-sm-6">
            <p class="m-b-10 f-w-600">Meal Price:</p>
            <h6 class="text-muted f-w-400">{`${account.mealPrice} ${account.currency}`}</h6>
          </div>
          <div class="col-sm-6">
            <p class="m-b-10 f-w-600">Bank account:</p>
            <h6 class="text-muted f-w-400">{account.bankAccount}</h6>
          </div>
        </React.Fragment>
      );
  }
  return (
    <div className="row p-0 m-0 formContainer business">
      <form className="form col-md-10 col-lg-8 col-xl-6 row col-11 form p-5 m-auto m-5">
        <div class="col-sm-12">
          <div class="card-block">
            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Account data</h6>
            <hr></hr>
            <div class="row">
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Email</p>
                <h6 class="text-muted f-w-400">{account.email}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Phone</p>
                <h6 class="text-muted f-w-400">{account.phoneNumber}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Name</p>
                <h6 class="text-muted f-w-400">{account.name}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Username</p>
                <h6 class="text-muted f-w-400">{account.username}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Tin:</p>
                <h6 class="text-muted f-w-400">{account.tin}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Accept solidarity meal:</p>
                <h6 class="text-muted f-w-400">
                  <input
                    type="checkbox"
                    checked={account.acceptSolidarityMeal}
                  ></input>
                </h6>
              </div>
              {showMealPrice()}
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Account type</p>
                <h6 class="text-muted f-w-400">Business</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <hr />
          Price:
          <input ref={price} type="number" className="form-control m-2" />
          <select ref={currency} className="form-control m-2">
            <option value="cc0ce5b5-f48e-4743-a26b-716a11649a3a">USD</option>
            <option value="8cbf41c9-3d1e-4b18-bfac-361909f08099">RSD</option>
          </select>
          <button
            className="btn btn-dark"
            onClick={(e) => {
              e.preventDefault();
              changeMealPrice(price.current.value, currency.current.value);
            }}
          >
            Change meal price
          </button>
        </div>
        <Addresses adresses={adresses}></Addresses>
      </form>
    </div>
  );
}

export default BusinessAccountScreen;
