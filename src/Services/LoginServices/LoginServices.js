const axios = require("axios");
const LoginServices = {
  authenticate: (accountType, usern, pass) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}${accountType}/authenticate`,
      {
        password: pass,
        username: usern,
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
