import React, { useState, useEffect } from 'react';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import OrderSummaryList from './OrderSummaryList';


function PaymentForm({order, setCartItems, setCartNo, cartItems}) {
   const [success, setSuccess] = useState(false);
   const [checked, setChecked] = useState(true);
   const stripe = useStripe();
   const elements = useElements();

   const resetCart = () => {
    setCartItems([]);
    setCartNo(0);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement) 
    });
    if(!error) {
        try {
            const {id} = paymentMethod;
            const response = await axios.post('https://giftboxapi.chloevturner.co.uk/payment', {
                amount: 3000,
                id
            })
            if(response.data.success){
                console.log('Payment Success');
                console.log(order.order);
                setSuccess(true);
                resetCart();
                try {
                axios.post('https://giftboxapi.chloevturner.co.uk/submitOrder', order);
                if(response.data.success){
                    console.log('Success');
                }
            } catch (error) {
                console.log("Error", error);
            }
            try {
                axios.post('https://giftboxapi.chloevturner.co.uk/updateInventory', order.order);
                if(response.data.success){
                    console.log('Success');
                }
            } catch (error) {
                console.log("Error", error);
            }
            }
        } catch (error) {
            console.log("Error", error);
        }
    } else {
        console.log(error.message);
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
        <h3 className='px-5 mb-3'>Enter your card details</h3>
        <div class="alert m-3 alert-info alert-dismissible fade show" role="alert">
        Enter '4242 4242 4242 4242' into the card number field to simulate a card payment and a valid expiry date. Don't use real card details.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
            <fieldset className='FormGroup'>
                <div className='row' >
                <div className='col w-100 px-5'>
                <label for="cardNumber" className="form-label">Card number<span className="text-danger">*</span></label>
                <CardNumberElement className='form-control mb-3' id="cardNumber" />
                </div>
                <div className='row px-5'>
                <div className='col-md-6 mb-3'>
                <label for="expDate" className="form-label">Expiry date<span className="text-danger">*</span></label>
                <CardExpiryElement className='form-control' id="expDate"/>
                </div>
                <div className='col-md-6'>
                <label for="cvc" className="form-label">CVC<span className="text-danger">*</span></label>
                <CardCvcElement className='form-control' id="cvc"/>
                </div>
                </div>
                </div>
            </fieldset>
            <div className="m-5">
            <p><span className="fw-bold">Delivery Address:</span> {order.firstName} {order.lastName}, {order.addressFirstLine}, {order.town}, {order.postCode}, {order.country}</p>
            <input className="form-check-input" type="checkbox" id="billingCheck" checked={checked} onChange={()=> setChecked(!checked)}></input>
            <label className="form-check-label fw-bold" for="billingCheck">My billing address is the same as my delivery address</label>
            
            {!checked ?
            <div className="Billing m-2">
            <h3>Enter Your Billing Address</h3>
        <div className="row">
            <div className="col-auto m-2">
                <input type="text" className="form-control" placeholder="First name*" aria-label="First name" required></input>
                <div class="invalid-tooltip">This is required.</div>
            </div>
            <div className="col-auto m-2">
                <input type="text" id="lname" className="form-control" placeholder="Last name*" aria-label="Last name" required></input>
                <div class="invalid-tooltip">This is required.</div>
            </div>
        </div>
                <input type="text" className="form-control m-2" placeholder="First line of address*" aria-label="First line of address" required></input>
                <div class="invalid-tooltip">This is required.</div>
      
                <input type="text" className="form-control m-2" placeholder="Second line of address" aria-label="Second line of address" ></input>
        
        <div className="row">
        <div className="col-auto m-2">
                <input type="text" className="form-control" placeholder="Town/City*" aria-label="Town or City"  required></input>
                <div class="invalid-tooltip">This is required.</div>
        </div>
        <div className="col-auto m-2">
                <input type="text" className="form-control" placeholder="Postcode*" aria-label="Postcode"  required></input>
                <div class="invalid-tooltip">This is required.</div>
        </div>
        <div className="col m-2">
                <input type="text" className="form-control" placeholder="Country*" aria-label="Country" required></input>
                <div class="invalid-tooltip">This is required.</div>
        </div>
        </div>
        </div>
       
        :
        <></>
}           
</div>
<div className="text-center">
            <button className="btn btn-danger m-3 text-center" type="submit">Confirm Payment</button>
            </div>
        </form>
     :
        <div>
            <div className="d-flex justify-content-center">
            <div class="alert alert-light border-danger w-75 text-dark shadow-sm mt-3" role="alert"><h2>Order #{order.orderNo}</h2>Your payment has been successfully taken. Thank you for shopping with us!
            <br/><a href='./'>Go back to home >></a></div>
            </div>
            <br/>
            <h3>Order Summary</h3>
            <div className="d-flex justify-content-center">
            <table className='table table-secondary table-bordered w-50 m-3'>
                <thead>
                    <tr><th className="text-start">SUMMARY</th><th className="text-start">ADDRESS</th></tr>
                    </thead>
                    <tbody>
                    <tr><td className="text-start"><span className="fw-bold">Order #:</span> {order.orderNo}<br/>
                    <span className="fw-bold">Order Date:</span> {order.date.slice(0, 10)}<br/>
                    <span className="fw-bold">Order Total:</span> £{order.cost}</td>
                    <td className="text-start">{order.addressFirstLine}<br/> {order.town}<br/> {order.postCode}<br/> {order.country}</td></tr>
                    </tbody>
                </table>
                </div>
                <br/>
                <h3>Items Shipped</h3>
                <div className="d-flex justify-content-center">
                <table className='table w-75 table-bordered m-3'>
                <thead>
                    <tr><th>Item</th><th>Quantity</th><th>Cost</th></tr>
                    </thead>
                    <tbody>
                    <OrderSummaryList orderItems={order.order}/>
                    </tbody>
                </table>
                </div>
        </div>}
        </>
    );
  }
  
  export default PaymentForm;