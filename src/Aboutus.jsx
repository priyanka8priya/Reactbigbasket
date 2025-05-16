import React from 'react';
import './AboutUs.css';


function AboutUs() {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>Welcome to BigBasket – Your trusted online grocery store.</p>
      </header>

      <section className="about-us-section">
        <h2>Our Mission</h2>
        <p>
          At BigBasket, our mission is to provide a seamless and convenient online grocery shopping experience. We aim to deliver fresh and quality products right to your doorstep, ensuring customer satisfaction at every step.
        </p>
      </section>

      <section className="about-us-section">
        <h2>Our Team</h2>
        <p>
          Our team comprises dedicated professionals working tirelessly to bring you the best shopping experience. From sourcing quality products to ensuring timely deliveries, each team member plays a crucial role in our success.
        </p>
      </section>

      <section className="about-us-section">
        <h2>Our Values</h2>
        <ul>
          <li>Customer-Centric Approach</li>
          <li>Integrity and Transparency</li>
          <li>Innovation and Excellence</li>
          <li>Commitment to Sustainability</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutUs;
