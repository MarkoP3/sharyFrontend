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
};
export default LoginServices;
