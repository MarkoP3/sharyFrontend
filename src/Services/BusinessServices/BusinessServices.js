const axios = require("axios");
const { loadStripe } = require("@stripe/stripe-js");
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const BusinessService = {
  getSolidarityBusinesses: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}business/solidarity`);
  },
  getAccountData: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}business/accountData`, {
      withCredentials: true,
    });
  },
  getFoodDonations: (page) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}donate/business/food?page=${page}`,
      {
        withCredentials: true,
      }
    );
  },
  getSolidarityDonations: (page) => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}donate/business/solidarity?page=${page}`,
      { withCredentials: true }
    );
  },
  shareMeal: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}business/shareMeal`, {
      withCredentials: true,
    });
  },
  getBusinessAddresses: () => {
    return axios.get(
      `${process.env.REACT_APP_API_URL}business/businessAddresses`,
      {
        withCredentials: true,
      }
    );
  },
  changeMealPrice: (newPrice) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}business/solidarityPrice`,
      newPrice,
      {
        withCredentials: true,
      }
    );
  },
};
export default BusinessService;
