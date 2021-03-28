import React,{useRef,useEffect,useState} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import axios from 'axios';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);
function SolidarityDinnerDonationScreen({solidarityCountries,solidarityCities,solidarityBusinesses,getSolidarityBusinesses,getSolidarityCities}) {
    const country = useRef();
    const city=useRef();
    const business=useRef();
    const quantity=useRef();
    const [price, setprice] = useState(0)
    const [currency, setcurrency] = useState("")
    useEffect(() => {
        changePrice();
    }, [solidarityBusinesses])
    function changePrice()
    {
        setprice(solidarityBusinesses[business.current.selectedIndex]?.mealPrice);
        setcurrency(solidarityBusinesses[business.current.selectedIndex]?.currency);
        
    }
    const handleClick = async (event) => {
        console.log(business.current.options[business.current.selectedIndex].id );
        const stripe = await stripePromise;
        axios.post(`${process.env.REACT_APP_API_URL}donate/individual/solidarity`,{individualID:"a900ea51-c710-459e-8d12-8fc84ef08116",quantity:quantity.current.value,businessID:business.current.options[business.current.selectedIndex].id},{withCredentials:true})
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
        <div>
            Select country:
            <select ref={country} onChange={(e)=>getSolidarityCities(country.current[country.current.selectedIndex].id)}>
                {solidarityCountries?.map((c,i)=>{
                    return (
                        <option id={c?.id} key={c?.id}>{c?.name}</option>
                    )
                }
                )}
            </select>
            Select city:
            <select ref={city} onChange={(e)=>getSolidarityBusinesses(city.current[city.current.selectedIndex].id)}>
            {solidarityCities?.map((c,i)=>{
                    return (
                        <option id={c?.id} key={c?.id}>{c?.name}</option>
                    )
                }
                )}
            </select>
            Select bussines:
            <select ref={business} onChange={(e)=>{changePrice()}}>
            {solidarityBusinesses?.map((c,i)=>{
                    return (
                        <option id={c?.id} key={c?.id}>{c?.name}</option>
                    )
                }
                )}
            </select>
            Quantity:
            <input ref={quantity} type="number"></input>
            <input type="text" value={price} disabled></input>
            <input type="text" value={currency} disabled></input>
            <button onClick={handleClick}>Donate</button>
        </div>
    )
}

export default SolidarityDinnerDonationScreen
