import { Button, Modal } from "react-bootstrap";
import React from "react";
import { NavLink } from "react-bootstrap";

function BusinessDonationScreen({ foodDonations, solidarityDonations }) {
  return (
    <div className="formContainer row m-0 p-5 business">
      <div className="col-12" align="center">
        <table className="table col-12">
          <thead className="thead-dark">
            <tr>
              <th colSpan="4">
                <NavLink
                  to={`/business/donations?foodPage=${
                    1 - 1
                  }&solidarityPage=${1}`}
                  className={`float-left btn-link ${1 > 1 ? "" : "disabled"}`}
                >
                  previous
                </NavLink>
                <NavLink
                  to={`/business/donations?foodPage=${
                    parseInt(1) + 1
                  }&solidarityPage=${1}`}
                  className={`float-right btn-link ${1 < 1 ? "" : " disabled"}`}
                >
                  next
                </NavLink>
                Food donations
              </th>
            </tr>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Station</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody id="donationsTable">
            {foodDonations.map((donation) => {
              return (
                <tr>
                  <td>
                    {new Date(donation.donationDateTime).toLocaleDateString()}
                  </td>
                  <td>{donation.stationName}</td>
                  <td>{donation.quantity}</td>
                  <td>Received</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="4">
                <Button className="ml-2 float-left" onClick={() => {}}>
                  New Donation
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-12" align="center">
        <table className="table col-12">
          <thead className="thead-dark">
            <tr>
              <th colSpan="4">
                <NavLink
                  to={`/business/donations?foodPage=${
                    1 - 1
                  }&solidarityPage=${1}`}
                  className={`float-left btn-link ${1 > 1 ? "" : "disabled"}`}
                >
                  previous
                </NavLink>
                <NavLink
                  to={`/business/donations?foodPage=${
                    parseInt(1) + 1
                  }&solidarityPage=${1}`}
                  className={`float-right btn-link ${1 < 1 ? "" : " disabled"}`}
                >
                  next
                </NavLink>
                Solidarity donations
              </th>
            </tr>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Individual</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody id="donationsTable">
            {solidarityDonations.map((donation) => {
              return (
                <tr>
                  <td>
                    {new Date(donation.donationDateTime).toLocaleDateString()}
                  </td>
                  <td>{donation.individualFullName}</td>
                  <td>{donation.quantity}</td>
                  <td>{`${donation.price} ${donation.currency}`}</td>
                </tr>
              );
            })}

            <tr>
              <td colSpan="4">
                <Button className="ml-2 float-left" onClick={() => {}}>
                  New Donation
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessDonationScreen;
