import React, { useState } from 'react';
import emailjs from '@emailjs/browser';


function Contactus() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'your_service_id', // Replace with your EmailJS service ID
        'your_template_id', // Replace with your EmailJS template ID
        e.target,
        'your_user_id' // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          setStatus('Failed to send message. Please try again later.');
        }
      );
  };

  return (
    <div className="contact-form-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default Contactus;
