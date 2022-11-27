import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_KEY;
const stripeTestPromise = loadStripe(PUBLIC_KEY, {locale: 'en-GB'});


function Checkout({order, setCartItems, setCartNo, cartItems}) {
   
    return (
        <div style={{marginTop: '100px'}}>
        <Elements stripe={stripeTestPromise}>
                <PaymentForm order={order} setCartItems={setCartItems} setCartNo={setCartNo} cartItems={cartItems}/>
      </Elements>
      </div>
    );
  }
  
  export default Checkout;