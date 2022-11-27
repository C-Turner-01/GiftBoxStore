import { Outlet, Link } from "react-router-dom";

const Layout = ({cartNo, setItemsList, allItems, setIsLoading}) => {

  const selectCategory = (e) => {
    setItemsList(allItems);
    setItemsList(previous => previous.filter(prev => prev.productType === e.target.value));
  }

  const selectAll = () => {
    setIsLoading(true);
    setItemsList(allItems);
    setIsLoading(false);
  }
 
  return (
    <>
      
      <nav className="navbar navbar-expand-lg navbar-white bg-white position-fixed fixed-top w-100 border-bottom">
  <div className="container-fluid">
    <a className="navbar-brand text-danger" href="#" id="site-logo">GiftBox</a>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span><br/><span className=""> Menu</span>
    </button>
          <ul className="navbar-nav collapse navbar-collapse " id="navbarSupportedContent">
          <li className="nav-item"><Link to="/shop" className="nav-link text-decoration-none"><button className="nav-link btn btn-outline-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={selectAll}>All</button></Link></li>
            <li className="nav-item"><Link to="/shop" className="nav-link text-decoration-none"><button className="nav-link btn btn-outline-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" value="Jewellery" onClick={selectCategory}>Jewellery & Accessories</button></Link></li>
            <li className="nav-item"><Link to="/shop" className="nav-link text-decoration-none"><button className="nav-link btn btn-outline-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" value="Candle" onClick={selectCategory}>Candles</button></Link></li>
            <li className="nav-item"><Link to="/shop" className="nav-link text-decoration-none"><button className="nav-link btn btn-outline-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" value="Soap" onClick={selectCategory}>Soaps & Bath Items</button></Link></li>
            <li className="nav-item"><Link to="/shop" className="nav-link text-decoration-none"><button className="nav-link btn btn-outline-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" value="Pottery" onClick={selectCategory}>Mugs & Pottery</button></Link></li>
            <li className="nav-item"><Link to="/shop" className="nav-link text-decoration-none"><button className="nav-link btn btn-outline-light border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" value="Edible" onClick={selectCategory}>Chocolate & Edible Gifts</button></Link></li>
            <li className="nav-item me-3">
            <Link to="/" className="nav-link active"><button className="nav-link bg-transparent border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={() => setItemsList(allItems)}><i className="bi bi-heart"></i> Home</button></Link>
        </li>
        <li className="nav-item me-3">
          <Link to="/cart" className="nav-link active"><button className="nav-link bg-transparent border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"> <i className="bi bi-bag"></i> Basket <span className="badge bg-danger">{cartNo}</span></button></Link>
        </li>
          </ul>
          
     
      
  </div>
</nav>

      <Outlet />
    </>
  )
};

export default Layout;