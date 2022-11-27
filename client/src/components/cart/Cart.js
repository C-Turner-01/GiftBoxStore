import React from 'react';
import CartItem from './CartItem';

function Cart({cartItems, setCartItems, setCartNo, setTotalCost}) {
    return (
        cartItems.map( cartItem => {
        return < CartItem key={cartItem._id} cartItem={cartItem} setCartItems={setCartItems} setCartNo={setCartNo} setTotalCost={setTotalCost}/>
      })
    );
  }
  
  export default Cart;