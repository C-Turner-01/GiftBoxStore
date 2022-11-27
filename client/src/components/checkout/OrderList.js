import OrderItem from './OrderItem';

function OrderList({cartItems}) {
    return (
        cartItems.map( cartItem => {
        return < OrderItem key={cartItem._id} cartItem={cartItem}/>
      })
    );
  }
  
  export default OrderList;