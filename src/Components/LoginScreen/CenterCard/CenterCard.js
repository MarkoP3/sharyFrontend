import React,{useRef,useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import axios from 'axios';
import './CenterCard.css';
function CenterCard({changeScreen,accountType,handleAccountTypeChange,refreshAccountData}) {
    const solidarityDinnerContainer = useRef();
    const name = useRef();
    const surname = useRef();
    const phoneNumber = useRef();
    const email = useRef();
    const tin = useRef();
    const bankAccountNumber = useRef();
    const solidarityDinner = useRef();
    const solidarityDinnerPrice = useRef();
    const register = useRef();
    const login = useRef()
    const username=useRef();
    const password = useRef();
    const [actionType, setactionType] = useState("login");
    const footerLoginText = useRef();
    const footerRegisterText= useRef();
    const btnIndividual= useRef();
    const btnBusiness= useRef();
    useEffect(() => {
        AccountTypeChangeHandler(actionType,accountType);
    }, [actionType])
    function CheckSolidarity()
    {
        if(solidarityDinner.current.checked)
        {
            solidarityDinnerPrice.current.disabled=false;
        }
        else{
            solidarityDinnerPrice.current.disabled=true;
        }
    }
    function HandleLogin(e)
    {
            localStorage.setItem("accountType",accountType);
            axios.post(`${process.env.REACT_APP_API_URL}${accountType}/authenticate`,{
                username:username.current.value,
                password:password.current.value
            },{withCredentials:true}).then((response,error)=>{
                console.log(error);
                if(response.status==200)
                {
                    refreshAccountData();
                    changeScreen(accountType);
                }
                else
                {
                    alert("Bad credentials!");
                }
            }).catch(error=>{
                alert("Bad credentials!");
            });
    }
    function HandleRegister(e){
        alert(actionType);
        alert(accountType);
    }
    function AccountTypeChangeHandler(action,account)
    {
        handleAccountTypeChange(account);
        if(action=="login")
        {
            register.current.style.display="none";
            login.current.style.display="inline-block";
            name.current.style.display="none";
            surname.current.style.display="none";
            phoneNumber.current.style.display="none";
            email.current.style.display="none";
            tin.current.style.display="none";
            bankAccountNumber.current.style.display="none";
            solidarityDinner.current.style.display="none";
            solidarityDinnerPrice.current.style.display="none";
            solidarityDinnerContainer.current.style.display="none";
            footerLoginText.current.style.display="none";
            footerRegisterText.current.style.display="block";
            if(account=="business")
            {
                btnIndividual.current.className="btn btn-danger";
                btnBusiness.current.className="btn btn-danger active";
                document.getElementsByClassName("loginContainer")[0].style.backgroundColor="#ff6347";
            }
            else if(account=="individual")
            {
                btnIndividual.current.className="btn btn-danger active";
                btnBusiness.current.className="btn btn-danger";
                document.getElementsByClassName("loginContainer")[0].style.backgroundColor="#9CD8F7";
            }
        }
        else if(action=="register")
        {
            register.current.style.display="inline-block";
            login.current.style.display="none";
            footerLoginText.current.style.display="block";
            footerRegisterText.current.style.display="none";
            if(account=="individual")
            {
                name.current.style.display="inline-block";
                surname.current.style.display="inline-block";
                phoneNumber.current.style.display="inline-block";
                email.current.style.display="inline-block";
                tin.current.style.display="none";
                bankAccountNumber.current.style.display="none";
                solidarityDinner.current.style.display="none";
                solidarityDinnerPrice.current.style.display="none";
                solidarityDinnerContainer.current.style.display="none";
                document.getElementsByClassName("loginContainer")[0].style.backgroundColor="#9CD8F7";
                
            }
            else if(account="business")
            {
                name.current.style.display="inline-block";
                surname.current.style.display="none";
                phoneNumber.current.style.display="inline-block";
                email.current.style.display="inline-block";
                tin.current.style.display="inline-block";
                bankAccountNumber.current.style.display="inline-block";
                solidarityDinner.current.style.display="inline-block";
                solidarityDinnerPrice.current.style.display="inline-block";
                solidarityDinnerContainer.current.style.display="inline-block";
                document.getElementsByClassName("loginContainer")[0].style.backgroundColor="#ff6347";
            }
        }
    }
    return (
        <form  action="javascript:void(0)" align="center" className="card col-10 col-xl-4 col-md-4 col-lg-4 p-0">
           <div className="cardHeader">
                <img src={process.env.PUBLIC_URL+"/foodBasket.svg"}/>
                <div className="title">Shary</div>
                <div className="subtitle">Don't waste share!</div>
            </div>
            <div className="cardBody">
                <input type="text" ref={name} placeholder="Name"/>
                <input type="text" ref={surname} placeholder="Surname"/>
                <input type="text" ref={phoneNumber} placeholder="Phone number"/>
                <input type="text" ref={email} placeholder="email"/>
                <input type="text" ref={tin} placeholder="TIN"/>
                <input type="text" ref={bankAccountNumber} placeholder="Bank account number"/>
                <div ref={solidarityDinnerContainer}>Accept solidarity dinners?<br/>
                    <label  className="switch mt-2">
                        <input type="checkbox" ref={solidarityDinner} onChange={CheckSolidarity}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <input type="number" ref={solidarityDinnerPrice} disabled placeholder="Price of dinner" step="0.01"/>
                <input type="text" ref={username}  placeholder="username"/>
                <input type="password" ref={password}  placeholder="password"/>
                <input type="submit" onClick={HandleRegister} ref={register} value="Register" className="btn btn-primary"/>
                <input type="submit" onClick={HandleLogin} ref={login} value="Login" className="btn btn-primary"/>
            </div>
            <div className="cardFooter">
                <ButtonGroup>
                    <Button ref={btnIndividual} variant="danger" onClick={(e)=>AccountTypeChangeHandler(actionType,"individual")}>Individual</Button>
                    <Button ref={btnBusiness} variant="danger"  onClick={(e)=>AccountTypeChangeHandler(actionType,"business")}>Business</Button>
                </ButtonGroup>
                <div className="btn btn-link" ref={footerRegisterText} onClick={(e)=>setactionType("register")}>Don't have an account? Sign up here</div>
                <div className="btn btn-link" ref={footerLoginText} onClick={(e)=>setactionType("login")}>Have an account? Login here</div>
            </div>
        </form>
    )
}

export default CenterCard
