import {useState, useEffect} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/home/Home';
import All from './components/shop/All';
import CartPage from './components/cart/CartPage';
import CustomerDetails from './components/checkout/CustomerDetails';
import Spinner from "./components/loader/Spinner";
import './css/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const LOCAL_STORAGE_KEY = 'shopApp.items';
const LOCAL_STORAGE_KEY_COST = 'shopApp.cost';


function App() {
  const [itemsList, setItemsList] = useState([]);
  const [allItems, setAllItems] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [cartNo, setCartNo] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect (() => {
    setIsLoading(true);
    const headers = {
      'Access-Control-Allow-Origin': 'https://giftbox.chloevturner.co.uk',
      'Content-Type': 'application/json'
    };
    Axios.get("https://giftboxapi.chloevturner.co.uk/getProducts", {headers}).then((response) =>{
      setAllItems(response.data);
      setItemsList(response.data);
      setIsLoading(false);
    })
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const storedCost = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_COST));
    
    if(storedCartItems != null){
      setCartItems(storedCartItems);
      setCartNo(cartItems.length);
    }

    if(storedCost != null){
      setTotalCost(storedCost);
    }
    
  }, [])

  useEffect(() => {
    if(cartItems){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    setCartNo(cartItems.length);
    }
  }, [cartItems]);

  useEffect(() => {
    if(totalCost){
    localStorage.setItem(LOCAL_STORAGE_KEY_COST, JSON.stringify(totalCost));
    }
  }, [totalCost]);
  
  return (
    <div className="App">
      {isLoading ? <Spinner /> : <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout cartNo={cartNo} allItems={allItems} setItemsList={setItemsList}/>}>
          <Route index element={<Home allItems={allItems} setItemsList={setItemsList} setIsLoading={setIsLoading} />} />
          <Route path="/shop" element={<All itemsList={itemsList} cartItems={cartItems} setCartItems={setCartItems} setCartNo={setCartNo} setTotalCost={setTotalCost} isLoading={isLoading}/>} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} cartNo={cartNo} setCartNo={setCartNo} setTotalCost={setTotalCost} allItems={allItems} setItemsList={setItemsList}/>} />
          <Route path="/checkout" element={<CustomerDetails cartItems={cartItems} totalCost={totalCost} allItems={allItems} setItemsList={setItemsList} setCartItems={setCartItems} setCartNo={setCartNo}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    <footer className="bg-light mt-4 pt-1 ms-0 mb-0 ps-0 pb-3 border-top">
    <div className="text-end m-3"><p className="text-end text-secondary">© 2022 GiftBox, Inc</p></div>
    <div className="text-start ms-3"><p>GiftBox.Inc, 123 ABC Street, London, EN4 5ER, UK</p>
      <p><i className="bi bi-telephone-fill"></i> 0203 222 2222<br/><i className="bi bi-envelope"></i> customerservice@giftbox.co.uk</p></div>
      
      </footer>
      </>
}
    </div>
  );
}

export default App;
