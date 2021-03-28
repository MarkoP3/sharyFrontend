import React from "react";
import "./DonorBusinessScreen.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MoneyDonationScreen from "../MoneyDonationScreen/MoneyDonationScreen";
import SolidarityDinnerDonationScreen from "../SolidarityDinnerDonationScreen/SolidarityDinnerDonationScreen";
function DonorIndividualScreen({
  changeScreen,
  accountData,
  moneyDonations,
  solidarityDonations,
  mealPrice,
  solidarityCountries,
  solidarityCities,
  solidarityBusinesses,
  getSolidarityBusinesses,
  getSolidarityCities,
  logOut,
}) {
  return (
    <div id="individual" className="screen align-items-start">
      <div className="col-12 d-block p-0 m-0" align="center">
        <Tabs defaultActiveKey="account" className="pt-1 pl-1">
          <Tab eventKey="account" title="Account" className="text-left col-10">
            <div>
              <div className="row gutters-sm m-0">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src="http://aras.kntu.ac.ir/wp-content/uploads/2019/05/hoodie-.png"
                          alt="Admin"
                          className="rounded-circle"
                          width="150"
                        />
                        <div className="mt-3">
                          <h4>{`${accountData?.firstName} ${accountData?.lastName}`}</h4>
                          <p className="text-secondary mb-1">
                            Individual donor
                          </p>
                          <button
                            className="btn btn-outline-primary"
                            onClick={(e) => logOut()}
                          >
                            Log out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">First Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {accountData?.firstName}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Last Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {accountData?.lastName}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone number</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {accountData?.phoneNumber}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {accountData?.email}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Username</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {accountData?.username}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="history" title="Your donations">
            <span>History of money donations:</span>
            <table className="table col-10">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Currency</th>
                </tr>
              </thead>
              <tbody id="donationsTable">
                {moneyDonations?.map((donation, index) => {
                  return (
                    <tr key={donation.id}>
                      <td>
                        {new Date(
                          donation.donationDateTime
                        ).toLocaleDateString()}
                      </td>
                      <td>{donation.quantity}</td>
                      <td>{donation.price}</td>
                      <td>{donation.currency}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <span>History of solidarity meal donations:</span>
            <table className="table col-10 m-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Currency</th>
                  <th scope="col">Company</th>
                </tr>
              </thead>
              <tbody id="donationsTable">
                {solidarityDonations?.map((donation, index) => {
                  return (
                    <tr key={donation.id}>
                      <td>
                        {new Date(
                          donation.donationDateTime
                        ).toLocaleDateString()}
                      </td>
                      <td>{donation.quantity}</td>
                      <td>{donation.price}</td>
                      <td>{donation.currency}</td>
                      <td>{donation.businessName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="donate" title="Donate">
            Current meal price : {mealPrice?.price} {mealPrice?.code}
            <MoneyDonationScreen mealPrice={mealPrice}></MoneyDonationScreen>
            <SolidarityDinnerDonationScreen
              solidarityCountries={solidarityCountries}
              solidarityCities={solidarityCities}
              solidarityBusinesses={solidarityBusinesses}
              getSolidarityBusinesses={getSolidarityBusinesses}
              getSolidarityCities={getSolidarityCities}
            ></SolidarityDinnerDonationScreen>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default DonorIndividualScreen;
