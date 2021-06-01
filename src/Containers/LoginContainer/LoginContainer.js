import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import LoginScreen from "../../Components2/LoginScreen/LoginScreen";
import Loader from "../../Components2/Loader/Loader";
import IndividualServices from "../../Services/IndividualServices/IndividualServices";
import LoginServices from "../../Services/LoginServices/LoginServices";

function LoginContainer() {
  let history = useHistory();
  let { accountType } = useParams();
  const [loader, setloader] = useState(true);
  useEffect(() => {
    IndividualServices.checkAuthentification(
      localStorage.getItem("accountType")
    )
      .then((data) => {
        history.push(`/${localStorage.getItem("accountType")}/account`);
      })
      .catch((error) => {
        console.log(`error`, error);
        setloader(false);
      });
  }, []);
  function HandleLogin(username, password) {
    setloader(true);
    LoginServices.authenticate(accountType, username, password)
      .then((data) => {
        history.push(`/${accountType}/account`);
        localStorage.setItem("accountType", accountType);
      })
      .catch((error) => {
        console.error(error);
        setloader(false);
      });
  }
  return (
    <div>
      <Loader show={loader}></Loader>
      <LoginScreen
        accountType={accountType}
        loginHandler={HandleLogin}
      ></LoginScreen>
    </div>
  );
}

export default LoginContainer;
