import React from "react";
import "./IndividualAccountScreen.css";
function IndividualAccountScreen({ account }) {
  return (
    <div className="row p-0 m-0 formContainer">
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
                <p class="m-b-10 f-w-600">First Name</p>
                <h6 class="text-muted f-w-400">{account.firstName}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Last Name</p>
                <h6 class="text-muted f-w-400">{account.lastName}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Username</p>
                <h6 class="text-muted f-w-400">{account.username}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Account type</p>
                <h6 class="text-muted f-w-400">Individual</h6>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default IndividualAccountScreen;
