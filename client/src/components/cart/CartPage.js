import React from 'react';
import Cart from './Cart';
import { Outlet, Link } from "react-router-dom";

const CartPage = ({cartItems, setCartItems, cartNo, setCartNo, setTotalCost, allItems, setItemsList}) => {
    return (
      <>
      {cartItems == 0 ? 
        <div className="text-center" style={{marginTop: '100px'}}>
         <p className="fst-italic">You have <span className="fw-bold">{cartNo}</span> {cartNo == 1 ? <span>item</span> : <span>items</span>}  in your basket.</p>
        <Link to="/" className='btn btn-secondary m-3' type='button' onClick={() => {setItemsList(allItems)}}>Continue shopping</Link>
        <hr></hr>
        <div className="cartDisplay d-flex flex-wrap justify-content-center text-center" >
      <Cart cartItems={cartItems} setCartItems={setCartItems} setCartNo={setCartNo} setTotalCost={setTotalCost}/>
        </div>
        </div>
        :
        <div className="text-center" style={{marginTop: '100px'}}>
         <p className="fst-italic">You have <span className="fw-bold">{cartNo}</span> {cartNo == 1 ? <span>item</span> : <span>items</span>}  in your basket.</p>
        <Link to="/checkout" className='btn btn-danger m-3' type='submit'>Go to checkout</Link>
        <Link to="/" className='btn btn-secondary m-3' type='button' onClick={() => {setItemsList(allItems)}}>Continue shopping</Link>
        <hr></hr>
        <div className="cartDisplay d-flex flex-wrap justify-content-center text-center" >
      <Cart cartItems={cartItems} setCartItems={setCartItems} setCartNo={setCartNo} setTotalCost={setTotalCost}/>
      <Link to="/checkout" className='btn btn-danger m-3' type='submit'>Go to checkout</Link>
        </div>
        </div>
      }
      </>
    );
  };
  
  export default CartPage;