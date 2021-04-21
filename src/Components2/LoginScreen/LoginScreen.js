import React from "react";
import CenterCard from "./CenterCard/CenterCard";

function LoginScreen({ accountType, loginHandler }) {
  return (
    <div className={`screen ${accountType}`}>
      <CenterCard
        accountType={accountType}
        loginHandler={loginHandler}
      ></CenterCard>
    </div>
  );
}

export default LoginScreen;
