import { Link } from "react-router-dom";
import Spinner from "../loader/Spinner";

const Home = ({allItems, setItemsList, setIsLoading, isLoading}) => {

    const selectCategory = (e) => {
        setIsLoading(true);
        setItemsList(allItems);
        setItemsList(previous => previous.filter(prev => prev.productType === e.target.value));
        setIsLoading(false);
      }

    return (
        <>
        {isLoading ? <Spinner /> : <>
        <div id="home" className="card mx-5 border-0 bg-light shadow-sm" style={{marginTop: '100px'}}><div className="card-body border"><h2>Find the perfect gift!</h2><h5 >All our products under £20!<br/> <a href='./shop'>Shop All >></a></h5></div>
        <img src={require('../../images/gift.jpg')} className="img border" alt="" loading="lazy"></img> </div>

        <div className="d-flex justify-content-center flex-wrap p-5 w-100">
        <div className="home-link card m-2 shadow-sm">
        <img src={require('../../images/goldnecklace.jpg')} className="card-img-top" alt="" loading="lazy"></img>
            <div className="card-body">
            <Link to="/shop"><button className="btn btn-link" type="button" value="Jewellery" onClick={selectCategory}>Shop Jewellery >></button></Link></div>
         </div>
         <div className="home-link card m-2 shadow-sm">
        <img src={require('../../images/lumacandle.jpg')} className="card-img-top" alt="" loading="lazy"></img>
            <div className="card-body">
            <Link to="/shop"><button className="btn btn-link" type="button" value="Candle" onClick={selectCategory}>Shop Candles >></button></Link></div>
         </div>
         <div className="home-link card m-2 shadow-sm">
        <img src={require('../../images/bathbombset.jpg')} className="card-img-top" alt="" loading="lazy"></img>
            <div className="card-body">
            <Link to="/shop"><button className="btn btn-link" type="button" value="Soap" onClick={selectCategory}>Shop Bath Items >></button></Link></div>
         </div>
         <div className="home-link card m-2 shadow-sm">
        <img src={require('../../images/cactusvase.jpg')} className="card-img-top" alt="" loading="lazy"></img>
            <div className="card-body">
            <Link to="/shop"><button className="btn btn-link" type="button" value="Pottery" onClick={selectCategory}>Shop Pottery >></button></Link></div>
         </div>
         <div className="home-link card m-2 shadow-sm">
        <img src={require('../../images/candybox.jpg')} className="card-img-top" alt="" loading="lazy"></img>
            <div className="card-body">
            <Link to="/shop"><button className="btn btn-link" type="button" value="Edible" onClick={selectCategory}>Shop Treats >></button></Link></div>
         </div>
         </div>
         </>
        }
        </>
    );
  };
  
  export default Home;