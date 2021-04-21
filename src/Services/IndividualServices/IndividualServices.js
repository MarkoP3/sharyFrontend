const axios = require("axios");
const { loadStripe } = require("@stripe/stripe-js");
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const IndividualServices = {
  getAccountData: (accountType) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}${accountType}/getAccountData`,
      {
        withCredentials: true,
      }
    );
  },
  checkAuthentification: (accountType) => {
    return axios.head(
      `${process.env.REACT_APP_API_URL}${accountType}/getAccountData`,
      {
        withCredentials: true,
      }
    );
  },
  getSolidarityDonations: (page) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}individual/donations/solidarity?page=${page}`,
      { withCredentials: true }
    );
  },
  getMoneyDonations: (page) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}individual/donations/money?page=${page}`,
      { withCredentials: true }
    );
  },
  donateMoney: async (quantity) => {
    const stripe = await stripePromise;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}donate/individual/money`,
        {
          quantity: quantity.current.value,
        },
        { withCredentials: true }
      )
      .then(async (response) => {
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      });
  },
  confirmMoneyDonation: (individualID, quantity, mealPriceID, sessionID) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}donate/individual/money/confirmation`,
        {
          individualID: individualID,
          quantity: quantity,
          mealPriceID: mealPriceID,
          stripeSessionID: sessionID,
        },
        { withCredentials: true }
      )
      .then((response) => {
        //alert(response.status);
      });
  },
};
export default IndividualServices;
