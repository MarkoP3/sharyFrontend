const axios = require("axios");
const LoginServices = {
  authenticate: (accountType, usern, pass) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}${accountType}/authenticate`,
      {
        username: usern,
        password: pass,
      },
      { withCredentials: true }
    );
  },
  logOut: (accountType) => {
    return axios.get(`${process.env.REACT_APP_API_URL}${accountType}/logout`, {
      withCredentials: true,
    });
  },
};
export default LoginServices;
