import React, {useState} from 'react';

function Item({item, cartItems, setCartItems, setCartNo, setTotalCost}) {
  const [cartItemNo, setCartItemNo] = useState(1);
    let itemImage = item.image.toString();
    const addToCart = () => {
      const quantity = cartItemNo;
      item.quantity = quantity;
      if(!cartItems.includes(item)){
      setCartItems(previous => [...previous, item]);
      setCartNo(previous => previous + 1);
      setTotalCost(previous => previous + (item.quantity*item.cost));
      } else {
        alert(`${item.productName} has already been added to your cart. Go to your cart to add more items.`);
      }
  }
   
    return (
      <>
      <div className="shop-item card bg-white m-3 p-3 shadow border-0 text-center">
        <form>
        <img src={require(`../../${itemImage}`)} alt={itemImage} loading="lazy"/>
        <p className="m-2">{item.productName}</p>
        <h6 className="m-3"> £{item.cost}</h6>
        <div className="w-100 d-flex justify-content-center">
        <div className="input-group  input-group-sm mb-2" style={{width: '170px'}}>
        <span className="input-group-text">Quantity</span>
        <input type='number' id="quantity" className="form-control" min="1" value={cartItemNo} onChange={(e) => setCartItemNo(e.target.value)}></input>
        </div>
        </div>
        {(item.noOfItems < 1) ?
        <button className="btn btn-warning btn-sm btn-disabled" tabindex="-1" type="button" aria-disabled="true">Out of Stock</button>:
        <button className="btn btn-secondary bg-gradient bg-25 btn-sm" type="button" onClick={addToCart}>Add to Basket</button>
        }
        </form>
      </div>
      </>
    );
  }
  
  export default Item;