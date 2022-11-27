import React from 'react';
import Item from './Item';

function Items({itemsList, cartItems, setCartItems, setCartNo, setTotalCost}) {
    return (
        itemsList.map(item => {
        return < Item key={item._id} item={item} cartItems={cartItems} setCartItems={setCartItems} setCartNo={setCartNo} setTotalCost={setTotalCost}/>
      })
    );
  }
  
  export default Items;