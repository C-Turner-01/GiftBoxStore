import Items from './Items';
import Spinner from "../loader/Spinner";

const All = ({itemsList, cartItems, setCartItems, setCartNo, setTotalCost, isLoading}) => {
    return (
        <>
        {isLoading ? <Spinner /> : 
        <div className="productsDisplay d-flex justify-content-center align-items-start flex-wrap" style={{marginTop: '90px'}}>
      <Items itemsList={itemsList} cartItems={cartItems} setCartItems={setCartItems} setCartNo={setCartNo} setTotalCost={setTotalCost} />
      </div>
        }
        </>
    );
  };
  
  export default All;