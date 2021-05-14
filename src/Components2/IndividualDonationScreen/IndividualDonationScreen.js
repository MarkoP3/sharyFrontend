import { useState, useRef, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function IndividualDonationScreen({
  moneyDonations,
  solidarityDonations,
  moneyPage,
  solidarityPage,
  maxSolidarityDonationPages,
  maxMoneyDonationPages,
  donateSolidarity,
  donateMoney,
  mealPrice,
  solidarityBusinesses,
}) {
  const quantityMD = useRef();
  const [totalMD, settotalMD] = useState(0);
  const [showMD, setShowMD] = useState(false);

  const quantitySD = useRef();
  const toBusinessSD = useRef();
  const [totalSD, settotalSD] = useState(0);
  const handleMD = () => {
    donateMoney(quantityMD.current.value);
    setShowMD(false);
  };
  const handleSD = () => {
    console.log(`object`, toBusinessSD.current.selectedIndex);
    console.log(
      `toBusiness.current.value`,
      toBusinessSD.current.options[toBusinessSD.current.selectedIndex].id
    );
    donateSolidarity(
      quantitySD.current.value,
      toBusinessSD.current.options[toBusinessSD.current.selectedIndex].id
    );
    setShowSD(false);
  };
  const handleShowMD = () => setShowMD(true);
  const [showSD, setShowSD] = useState(false);
  const handleCloseSD = () => setShowSD(false);
  const handleShowSD = () => setShowSD(true);
  useEffect(() => {
    settotalMD(quantityMD?.current?.value * mealPrice.price);
  }, []);
  return (
    <div className="formContainer row m-0 p-5">
      <Modal show={showMD} onHide={() => setShowMD(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Money Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body align="center">
          <div align="center" className="">
            Meal Price:
          </div>
          <div align="center" style={{ fontSize: "30px" }}>
            <span>{mealPrice.price}</span>
            <span>{mealPrice.code}</span>
          </div>
          <span>Enter the amount of meals that you want to donate:</span>

          <input
            ref={quantityMD}
            align="center"
            type="number"
            id="quantity"
            min="1"
            className="form-control mt-2"
            onChange={(e) =>
              settotalMD(quantityMD.current.value * mealPrice.price)
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <span>
            Total:{totalMD} {mealPrice.code}
          </span>
          <Button variant="primary" onClick={handleMD}>
            Donate
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSD} onHide={handleCloseSD}>
        <Modal.Header closeButton>
          <Modal.Title>Solidarity Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body align="center">
          <div align="center" className="">
            Meal Price:
          </div>
          <div align="center" style={{ fontSize: "30px" }}>
            <span>300</span>
            <span>RSD</span>
          </div>
          <span>Select a business that you want to donate to:</span>
          <br />
          <select ref={toBusinessSD} class="custom-select m-2">
            {solidarityBusinesses.map((business) => {
              return <option id={business.id}>{business.name}</option>;
            })}
          </select>
          <br />
          <span>Enter the amount of meals that you want to donate:</span>
          <form>
            <input
              ref={quantitySD}
              align="center"
              type="number"
              id="quantity"
              min="1"
              required=""
              className=" form-control m-2"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div>Total:300 RSD</div>
          <Button variant="primary" onClick={handleSD}>
            Donate
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="col-12" align="center">
        <table className="table col-12">
          <thead className="thead-dark">
            <tr>
              <th colSpan="4">
                <NavLink
                  to={`/individual/donations?moneyPage=${
                    moneyPage - 1
                  }&solidarityPage=${solidarityPage}`}
                  className={`float-left btn-link ${
                    moneyPage > 1 ? "" : "disabled"
                  }`}
                >
                  previous
                </NavLink>
                <NavLink
                  to={`/individual/donations?moneyPage=${
                    parseInt(moneyPage) + 1
                  }&solidarityPage=${solidarityPage}`}
                  className={`float-right btn-link ${
                    moneyPage < maxMoneyDonationPages ? "" : " disabled"
                  }`}
                >
                  next
                </NavLink>
                Money donations
              </th>
            </tr>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Currency</th>
            </tr>
          </thead>
          <tbody id="donationsTable">
            {moneyDonations.map((el) => {
              return (
                <tr>
                  <td>{new Date(el.donationDateTime).toLocaleDateString()}</td>
                  <td>{el.quantity}</td>
                  <td>{el.price}</td>
                  <td>{el.currency}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="4">
                <Button
                  className="ml-2 float-left"
                  onClick={() => handleShowMD()}
                >
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
              <th colSpan="5">
                <NavLink
                  to={`/individual/donations?moneyPage=${moneyPage}&solidarityPage=${
                    solidarityPage - 1
                  }`}
                  className={`float-left btn-link ${
                    solidarityPage > 1 ? "" : "disabled"
                  }`}
                >
                  previous
                </NavLink>
                <NavLink
                  to={`/individual/donations?moneyPage=${moneyPage}&solidarityPage=${
                    parseInt(solidarityPage) + 1
                  }`}
                  className={`float-right btn-link ${
                    solidarityPage < maxSolidarityDonationPages
                      ? ""
                      : "disabled"
                  }`}
                >
                  next
                </NavLink>
                Solidarity donations
              </th>
            </tr>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Currency</th>
              <th scope="col">Company</th>
            </tr>
          </thead>
          <tbody id="donationsTable">
            {solidarityDonations.map((el) => {
              return (
                <tr>
                  <td>{new Date(el.donationDateTime).toLocaleDateString()}</td>
                  <td>{el.quantity}</td>
                  <td>{el.price}</td>
                  <td>{el.currency}</td>
                  <td>{el.businessName}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="5">
                <Button
                  className="ml-2 float-left"
                  onClick={() => handleShowSD()}
                >
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

export default IndividualDonationScreen;
