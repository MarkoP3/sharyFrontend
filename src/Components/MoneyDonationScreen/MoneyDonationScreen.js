import React,{useRef} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import axios from 'axios';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);
function MoneyDonationScreen({changeScreen}) {
    const quantity = useRef();
    const handleClick = async (event) => {

        const stripe = await stripePromise;
        axios.post(`${process.env.REACT_APP_API_URL}donate/individual/money`,{individualID:"a900ea51-c710-459e-8d12-8fc84ef08116",quantity:quantity.current.value},{withCredentials:true})
            .then(async response=>{
                const result = await stripe.redirectToCheckout({
                    sessionId: response.data.id
                  });

                  if (result.error) {
                    alert(result.error.message);
                }
            });
      };
    return (
        
        <div id="moneyDonation">
            <span>Quantity</span>
            <input ref={quantity} type="number"/>
            <input type="button" value="Donate" onClick={handleClick}/>
        </div>
    )
}

export default MoneyDonationScreen
