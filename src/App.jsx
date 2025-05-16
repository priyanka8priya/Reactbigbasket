import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NonVeg from './NonVeg';
import Veg from './veg';
import Signing from './Signing';
import Order from './Order';
import Home from './Home';
import Cart from './Cart';


import Contactus from './Contactus';
import Aboutus from './Aboutus';

import Fruits from './Fruits';
import './vegstyle.css';
import { useSelector } from 'react-redux';
import './Cart';
import Pagenotfound from './Pagenotfound';
import Chocolate from './Chocolate';

function App() {
let CartObject = useSelector(globalState => globalState.cart);
  let totalcartcount = CartObject.reduce((totalsum, item) => totalsum + item.quantity, 0);
  
      
  return (
   
    <BrowserRouter>


    <nav className="navbar">

     
  <Link to="/" className="nav-button">Home🏠</Link>
  <Link to="/nonveg" className="nav-button">NonVeg items🍗</Link>
  <Link to="/veg" className="nav-button">Vegetables🥦</Link>
  <Link to="/signing" className="nav-button">Signing off 🚪</Link>
  <Link to="/order" className="nav-button">Order items🛒</Link>
  <Link to="/Fruits" className="nav-button">Fruits🍉</Link>
  <Link to="/cart" className="nav-button">🛒 Cart({totalcartcount})</Link>
  <Link to="/Chocolate" className="nav-button">Chocolate🍫</Link>
  <Link to="/contactus" className="nav-button">Contact Us📞</Link>
  <Link to="/aboutus" className="nav-button">About Us ℹ️ </Link>
</nav>

      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/Fruits" element={<Fruits/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Chocolate" element={<Chocolate/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/contactus" element={<Contactus/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/signing" element={<Signing/>}/>
        <Route path="/*" element={<Pagenotfound/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
