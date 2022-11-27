import React, {useState} from 'react';
import OrderList from './OrderList';
import Checkout from './Checkout';
import { Outlet, Link } from "react-router-dom";
import OrderNo from "order-no";

function CustomerDetails({cartItems, totalCost, allItems, setItemsList, setCartItems, setCartNo}) {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState('');
    const[firstAddressLine, setFirstAddressLine] = useState('');
    const[secondAddressLine, setSecondAddressLine] = useState('');
    const[town, setTown] = useState('');
    const[postCode, setPostCode] = useState('');
    const[country, setCountry] = useState('');
    const[detailsCompleted, setDetailsCompleted] = useState(false);
    const[order, setOrder] = useState({});
    const[orderNo, setOrderNo] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(firstName && lastName && email && phone && firstAddressLine && town && postCode){
            const orderDate = new Date();
            const orderDateString = orderDate.toISOString();
        setOrder({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
        addressFirstLine: firstAddressLine,
        town: town,
        postCode: postCode,
        country: 'United Kingdom',
        order: cartItems,
        cost: totalCost,
        date: orderDateString,
        orderNo: OrderNo.makeOrderNo(1, 5)
        });
        setDetailsCompleted(true);
        
    } else {
        alert('Please fill out all required fields');
    }
    
    }
   
    return (
        <>
            { !detailsCompleted ?
                <div className="d-flex justify-content-around flex-wrap" style={{marginTop: '100px'}}>
            
            <div className="Delivery m-2">
            <h3>Enter Your Delivery Address</h3>
        <form onSubmit={handleSubmit}>
            
        <div className="row">
            <div className="col-auto m-2">
                <input type="text" className="form-control" placeholder="First name*" aria-label="First name" onChange={(e) => setFirstName(e.target.value.trim())} required></input>
                <div class="invalid-tooltip">This is required.</div>
            </div>
            <div className="col-auto m-2">
                <input type="text" id="lname" className="form-control" placeholder="Last name*" aria-label="Last name" onChange={(e) => setLastName(e.target.value.trim())} required></input>
                <div class="invalid-tooltip">This is required.</div>
            </div>
        </div>
        
                <input type="email" className="form-control m-2" placeholder="Email address*" aria-label="Email address" onChange={(e) => setEmail(e.target.value)} required></input>
                <div class="invalid-tooltip">Add a valid email address.</div>
        
                <input type="tel" name="phone" pattern="[0-9]{10,12}" title="Add a valid phone number - enter only numbers with no other characters, including spaces." className="form-control m-2" placeholder="Phone number*" aria-label="Phone number" onChange={(e) => setPhone(e.target.value)} required></input>
                <div class="invalid-tooltip">Add a valid phone number - enter only numbers with no other characters, including spaces.</div>
        
                <input type="text" className="form-control m-2" placeholder="First line of address*" aria-label="First line of address" onChange={(e) => setFirstAddressLine(e.target.value)} required></input>
                <div class="invalid-tooltip">Please enter the first line of your address.</div>
      
                <input type="text" className="form-control m-2" placeholder="Second line of address" aria-label="Second line of address" onChange={(e) => setSecondAddressLine(e.target.value)}></input>
        
        <div className="row">
        <div className="col-auto m-2">
                <input type="text" className="form-control" placeholder="Town/City*" aria-label="Town or City" onChange={(e) => setTown(e.target.value.trim())} required></input>
                <div class="invalid-tooltip">Please enter the name of your town or city.</div>
        </div>
        <div className="col-auto m-2">
                <input type="text" className="form-control" placeholder="Postcode*" title="Add postcode in the UK format" aria-label="Postcode" pattern="[A-Z]{2}[0-9]{1,2}\s[0-9]{1,2}[A-Z]{2}" onChange={(e) => setPostCode(e.target.value)} required></input>
                <div class="invalid-tooltip">Add postcode in the UK format.</div>
        </div>
        </div>
        <button className="btn btn-danger m-3" type="submit">Go to payment</button>
        </form>
        </div>
        <div className="Order card border-0 m-2 p-2 shadow">
            
            <div className="m-2">
                <h3>Your Order</h3>
                <table className='table'>
                <thead>
                    <tr><th>Item</th><th>Quantity</th><th>Cost</th></tr>
                    </thead>
                    <tbody>
                    <OrderList cartItems={cartItems}/>
                    </tbody>
                </table>
            </div>
            <h4>Total Cost: £{totalCost}</h4>
            <Link to="/" className='btn btn-secondary m-3' type='button' onClick={() => {setItemsList(allItems)}}>Continue shopping</Link>
            </div>
        </div>
        :
        <Checkout order={order} setCartItems={setCartItems} setCartNo={setCartNo} cartItems={cartItems}/>
        
}   
      </>
    );
  }
  
  export default CustomerDetails;