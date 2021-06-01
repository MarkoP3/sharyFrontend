const axios = require("axios");
const StationServices = {
  getMealPrice: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}individual/mealPrice`);
  },
  getStations: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}station`);
  },
  getActiveDonations: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}station/donations`, {
      withCredentials: true,
    });
  },
  receiveMeal: (donationID, quantity) => {
    return axios.post(`${process.env.REACT_APP_API_URL}station/donations`, {
      FoodDonationID: donationID,
      quantity: quantity,
    });
  },
};
export default StationServices;
