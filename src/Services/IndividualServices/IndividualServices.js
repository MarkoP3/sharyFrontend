const axios = require("axios");
const { loadStripe } = require("@stripe/stripe-js");
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const IndividualServices = {
  getAccountData: (accountType) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}${accountType}/accountData`,
      {
        withCredentials: true,
      }
    );
  },
  checkAuthentification: (accountType) => {
    return axios.head(
      `${process.env.REACT_APP_API_URL}${accountType}/accountData`,
      {
        withCredentials: true,
      }
    );
  },
  getSolidarityDonations: (page) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}donate/individual/solidarity?page=${page}`,
      { withCredentials: true }
    );
  },
  getMoneyDonations: (page) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}donate/individual/money?page=${page}`,
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
    return axios.post(
      `${process.env.REACT_APP_API_URL}donate/individual/money/confirmation`,
      {
        individualID: individualID,
        quantity: quantity,
        mealPriceID: mealPriceID,
        stripeSessionID: sessionID,
      },
      { withCredentials: true }
    );
  },
  confirmSolidarityDonation: (
    individualID,
    quantity,
    mealPriceID,
    sessionID,
    businessID
  ) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}donate/individual/solidarity/confirmation`,
      {
        individualID: individualID,
        businessID: businessID,
        quantity: quantity,
        mealPriceID: mealPriceID,
        stripeSessionID: sessionID,
      },
      { withCredentials: true }
    );
  },
  logOut: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}individual/logout`);
  },
  createIndividual: (
    firstName,
    lastName,
    email,
    phoneNumber,
    username,
    password
  ) => {
    return axios.post(`${process.env.REACT_APP_API_URL}individual`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      username: username,
      password: password,
    });
  },
};
export default IndividualServices;
