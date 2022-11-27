import OrderSummaryItem from './OrderSummaryItem';

function OrderSummaryList({orderItems}) {
    return (
        orderItems.map( orderItem => {
        return < OrderSummaryItem key={orderItem._id} orderItem={orderItem}/>
      })
    );
  }
  
  export default OrderSummaryList;