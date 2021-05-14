const axios = require("axios");
const { loadStripe } = require("@stripe/stripe-js");
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const BusinessService = {
  getSolidarityBusinesses: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}business/solidarity`);
  },
};
export default BusinessService;
