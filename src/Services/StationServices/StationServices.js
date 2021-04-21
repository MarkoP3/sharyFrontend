const axios = require("axios");
const StationServices = {
  getMealPrice: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}station/mealPrice`);
  },
};
export default StationServices;
