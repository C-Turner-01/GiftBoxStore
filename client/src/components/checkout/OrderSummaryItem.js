import React from 'react';

function OrderSummaryItem({orderItem}) {
    return (
        <tr>
            <td>{orderItem.productName}</td>
            <td>{orderItem.quantity}</td>
            <td>£{orderItem.quantity*orderItem.cost}</td>
        </tr>
    );
  }
  
  export default OrderSummaryItem;