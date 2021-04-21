import React from "react";
import CenterCard from "./CenterCard/CenterCard";
import "./LoginScreen.css";
function LoginScreen({
  changeScreen,
  accountType,
  handleAccountTypeChange,
  refreshAccountData,
}) {
  return (
    <div id="login" className="loginContainer screen">
      <CenterCard
        changeScreen={changeScreen}
        accountType={accountType}
        handleAccountTypeChange={handleAccountTypeChange}
        refreshAccountData={refreshAccountData}
      ></CenterCard>
    </div>
  );
}

export default LoginScreen;
