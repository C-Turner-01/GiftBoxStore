import React from 'react';

function OrderItem({cartItem}) {
    return (
        <tr>
            <td>{cartItem.productName}</td>
            <td>{cartItem.quantity}</td>
            <td>£{cartItem.quantity*cartItem.cost}</td>
        </tr>
    );
  }
  
  export default OrderItem;