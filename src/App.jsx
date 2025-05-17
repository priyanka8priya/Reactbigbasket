import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './Home';
import NonVeg from './NonVeg';
import Veg from './Veg';

import Fruits from './Fruits';
import Chocolate from './Chocolate';
import Order from './Order';
import Contactus from './Contactus';
import Aboutus from './Aboutus';
import Cart from './Cart';
import Signing from './Signing';
import Pagenotfound from './Pagenotfound';

import { logoutUser } from './store'; // ✅ Make sure this action exists in your Redux store
import './vegstyle.css';

function App() {
  const dispatch = useDispatch();
  const CartObject = useSelector((state) => state.cart);
  const totalcartcount = CartObject.reduce((sum, item) => sum + item.quantity, 0);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <header>
        <div className="logo">🛍 FreshMart</div>

        {/* Top Bar with Auth Info */}
        <div className="icon">
          {isAuthenticated ? (
            <div className="welcome-message">
              <span>Welcome, {currentUser?.username || 'User'}</span>
              <button onClick={() => dispatch(logoutUser())}>Log Out</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/signing">Sign In</Link>
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/" className="nav-button">Home🏠</Link>
          <Link to="/veg" className="nav-button">Vegetables🥦</Link>
          <Link to="/nonveg" className="nav-button">NonVeg items🍗</Link>
          <Link to="/fruits" className="nav-button">Fruits🍉</Link>
          <Link to="/chocolate" className="nav-button">Chocolate🍫</Link>
          <Link to="/aboutus" className="nav-button">About Us ℹ️</Link>
          <Link to="/order" className="nav-button">Order items🛒</Link>
          <Link to="/contactus" className="nav-button">Contact Us📞</Link>
          <Link to="/cart" className="nav-button">🛒 Cart({totalcartcount})</Link>
          {!isAuthenticated && (
            <Link to="/signing" className="nav-button">Sign In 🚪</Link>
          )}
        </nav>
      </header>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chocolate" element={<Chocolate />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/signing" element={<Signing />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
