import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome Darshan Fresh Mart🧺</h1>
        <p>Your one-stop shop for fresh groceries, meat, fruits & more!</p>
      </header>
<section className="home-hero">
  <img src="/image/home.jpg" alt="Home" />
</section>


      <section className="home-buttons">
        <a href="/nonveg" className="home-btn">🥩 Non-Veg Items</a>
        <a href="/vegetables" className="home-btn">🥦 Vegetables</a>
        <a href="/fruits" className="home-btn">🍎 Fruits</a>
        <a href="/order" className="home-btn">🛒 Order Now</a>
      </section>

      <section className="home-footer">
        <p>We deliver fresh, high-quality products to your doorstep.</p>
        <a href="/about" className="learn-more">Learn More →</a>
      </section>
    </div>
  );
};

export default Home;
