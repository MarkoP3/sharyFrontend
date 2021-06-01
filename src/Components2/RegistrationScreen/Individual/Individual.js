import React from "react";

function Individual() {
  return (
    <form
      action="javascript:void(0)"
      align="center"
      className="card col-10 col-xl-4 col-md-4 col-lg-4 p-0"
    >
      <div className="cardHeader">
        <img src={process.env.PUBLIC_URL + "/foodBasket.svg"} />
        <div className="title">Shary</div>
        <div className="subtitle">Don't waste share!</div>
      </div>
      <div className="cardBody">
        <input type="text" ref={name} placeholder="Name" />
        <input type="text" ref={surname} placeholder="Surname" />
        <input type="text" ref={phoneNumber} placeholder="Phone number" />
        <input type="text" ref={email} placeholder="email" />
        <input type="text" ref={tin} placeholder="TIN" />
        <input
          type="text"
          ref={bankAccountNumber}
          placeholder="Bank account number"
        />
        <div ref={solidarityDinnerContainer}>
          Accept solidarity dinners?
          <br />
          <label className="switch mt-2">
            <input
              type="checkbox"
              ref={solidarityDinner}
              onChange={CheckSolidarity}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <input
          type="number"
          ref={solidarityDinnerPrice}
          disabled
          placeholder="Price of dinner"
          step="0.01"
        />
        <input type="text" ref={username} placeholder="username" />
        <input type="password" ref={password} placeholder="password" />
        <input
          type="submit"
          onClick={HandleRegister}
          ref={register}
          value="Register"
          className="btn btn-primary"
        />
        <input
          type="submit"
          onClick={HandleLogin}
          ref={login}
          value="Login"
          className="btn btn-primary"
        />
      </div>
      <div className="cardFooter">
        <ButtonGroup>
          <Button
            ref={btnIndividual}
            variant="danger"
            onClick={(e) => AccountTypeChangeHandler(actionType, "individual")}
          >
            Individual
          </Button>
          <Button
            ref={btnBusiness}
            variant="danger"
            onClick={(e) => AccountTypeChangeHandler(actionType, "business")}
          >
            Business
          </Button>
        </ButtonGroup>
        <div
          className="btn btn-link"
          ref={footerRegisterText}
          onClick={(e) => setactionType("register")}
        >
          Don't have an account? Sign up here
        </div>
        <div
          className="btn btn-link"
          ref={footerLoginText}
          onClick={(e) => setactionType("login")}
        >
          Have an account? Login here
        </div>
      </div>
    </form>
  );
}

export default Individual;
