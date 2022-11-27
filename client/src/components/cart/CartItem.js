import React, {useState, useEffect} from 'react';

function CartItem({cartItem, setCartItems, setCartNo, setTotalCost}) {
  const [cartItemQuantity, setCartItemQuantity] = useState(cartItem.quantity);
  let cartItemImage = cartItem.image.toString();
    //<img src={require(`${cartItemImage}`)} alt="" className="img-thumbnail w-25"/>
    const removeFromCart = () => {
      setCartItems(previous => previous.filter(item => item.productName !== cartItem.productName));
      setCartNo(previous => previous - 1);
      setTotalCost(previous => previous - (cartItem.quantity*cartItem.cost));
  }
  const changeNoItems = (e) => {
    setTotalCost(previous => previous - (cartItem.quantity*cartItem.cost));
    setCartItemQuantity(e.target.value);
    cartItem.quantity = cartItemQuantity;
    setTotalCost(previous => previous + (cartItem.quantity*cartItem.cost));
}
    return (
        <div className="container-fluid bg-light p-3 mb-3 row justify-content-center text-center">
          <div className="col-auto justify-content-center">
          <div className="justify-content-center" style={{width: '170px'}}>
          <img src={require(`../../${cartItemImage}`)} alt={cartItemImage} style={{height: '5rem'}}/>
          </div>
        </div>
        <div className="col-auto">
        <div style={{width: '210px'}}>
        <h5>{cartItem.productName}</h5>
        <h6>Price: £{cartItem.cost}</h6>
        </div>
        </div>
        <div className="col-auto">
        <div style={{width: '170px'}}>
        <label for="cartQuantity" class="form-label fs-6">Quantity</label>
        <input type='number' className="form-control mb-2" id="cartQuantity" min="1" value={cartItem.quantity} onChange={changeNoItems}></input>
        </div>
        </div>
        <div className="col-auto">
        <button className="btn btn-outline-danger btn-sm" type="button" onClick={removeFromCart}>Remove from Basket</button>
        </div>
      </div>
    );
  }
  
  export default CartItem;