import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
  addOrder,
} from './store';
import { useNavigate } from 'react-router-dom';
import './cartstyle.css';
import QRCode from 'react-qr-code';
import emailjs from '@emailjs/browser';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponCodeDiscountPer, setCouponDiscountPer] = useState(0);
  const [couponName, setCouponName] = useState('');
  const couponCodeRef = useRef();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const taxPercentage = 5;
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (item) => dispatch(incrementQuantity(item.name));
  const handleDecrement = (item) =>
    item.quantity === 1 ? dispatch(removeItem(item.name)) : dispatch(decrementQuantity(item.name));
  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleDiscountClick = (percentage) => {
    setDiscountPercentage(percentage);
    setCouponDiscountPer(0);
    setCouponName('');
  };

  const handleCouponPer = () => {
    const code = couponCodeRef.current.value.trim().toUpperCase();
    const validCoupons = {
      DUSSERA10: 10,
      DIWALI20: 20,
      PONGAL30: 30,
    };
    if (validCoupons[code]) {
      setCouponDiscountPer(validCoupons[code]);
      setCouponName(code);
      setDiscountPercentage(0);
    } else {
      alert('Invalid coupon code');
      setCouponDiscountPer(0);
      setCouponName('');
    }
  };

  const {
    totalPrice,
    discountAmount,
    afterDiscount,
    tax,
    finalAmount,
    appliedDiscount,
  } = (() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = (total * (discountPercentage || couponCodeDiscountPer)) / 100;
    const after = total - discount;
    const taxAmt = (after * taxPercentage) / 100;
    const final = after + taxAmt;
    return {
      totalPrice: total.toFixed(2),
      discountAmount: discount.toFixed(2),
      afterDiscount: after.toFixed(2),
      tax: taxAmt.toFixed(2),
      finalAmount: final.toFixed(2),
      appliedDiscount: discountPercentage || couponCodeDiscountPer,
    };
  })();

  const handleCompletePurchase = () => {
    const order = {
      id: 'ORD' + Date.now(),
      date: new Date().toLocaleString(),
      items: [...cartItems],
      total: finalAmount,
    };

    const templateParams = {
      order_id: order.id,
      Orders: cartItems.map((item) => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity,
      })),
      cost: {
        shipping: 50,
        tax: tax,
        total: finalAmount,
      },
      email: customerEmail,
    };

    emailjs
      .send('service_9zan3kg', 'template_rdo47r9', templateParams, 'UlZ6ufg8jj3grdLBI')
      .then(() => alert('Email sent successfully'))
      .catch((error) => alert('Email sending failed: ' + error));

    dispatch(addOrder(order));
    dispatch(clearCart());
    setDiscountPercentage(0);
    setCouponDiscountPer(0);
    setCouponName('');
    setPurchaseCompleted(true);
    setCountdown(10);
  };

  useEffect(() => {
    if (!purchaseCompleted || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/Orders');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [purchaseCompleted, countdown, navigate]);

  const handleCardPayment = () => {
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
      alert('Please fill all card fields');
    } else {
      handleCompletePurchase();
    }
  };

  const renderedCartItems = cartItems.length === 0 ? (
    <h3>Your cart is empty</h3>
  ) : (
    cartItems.map((item) => (
      <div key={item.id} className="cart-item-row">
        <img src={item.image} alt={item.name} width="100" />
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-price">₹{item.price}</div>
        <div className="quantity-controls">
          <button onClick={() => handleDecrement(item)}>-</button>
          <div className="item-quantity">{item.quantity}</div>
          <button onClick={() => handleIncrement(item)}>+</button>
        </div>
        <button onClick={() => handleRemove(item)} className="remove-btn">Remove</button>
      </div>
    ))
  );

  return (
    <div className="cart-message">
      {purchaseCompleted ? (
        <div className="cart-page-wrapper">
          <div className="cart-container" style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'green' }}>
              🎉 Purchase successful! Redirecting in {countdown} seconds...
            </h1>
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <h1>Cart is Empty 🛒</h1>
      ) : (
        <div className="cart-page-wrapper">
          <div className="cart-container">
            <h1>Your Cart</h1>
            <div className="cart-items">{renderedCartItems}</div>

            <div className="discount-buttons">
              <button onClick={() => handleDiscountClick(10)} disabled={couponCodeDiscountPer > 0}>
                Apply 10% Discount
              </button>
              <button onClick={() => handleDiscountClick(20)} disabled={couponCodeDiscountPer > 0}>
                Apply 20% Discount
              </button>
              <button onClick={() => handleDiscountClick(30)} disabled={couponCodeDiscountPer > 0}>
                Apply 30% Discount
              </button>

              <div className="coupon-section">
                <input ref={couponCodeRef} type="text" placeholder="Enter Coupon Code" className="coupon-input" />
                <button onClick={handleCouponPer} className="apply-coupon-btn">Apply Coupon</button>
              </div>
            </div>

            <div className="cart-summary">
              <h5>Total Items: {cartCount}</h5>
              <p>Total Amount: ₹{totalPrice}</p>
              <p>Discount ({appliedDiscount}%): -₹{discountAmount}</p>
              <p>Applied Coupon: {couponName ? `(${couponName})` : '(None)'}</p>
              <p>Tax ({taxPercentage}%): +₹{tax}</p>
              <p><strong>Final Amount: ₹{finalAmount}</strong></p>

              <div className="email-section">
                <h4>📧 Enter your email for the order receipt:</h4>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>

              <div className="payment-options">
                <h3>Select Payment Method</h3>
                <button onClick={() => setPaymentMethod('upi')}>📱 UPI</button>
                <button onClick={() => setPaymentMethod('card')}>💳 Card</button>
              </div>

              {paymentMethod === '' && (
                <p style={{ color: 'gray' }}>Please select a payment method to proceed.</p>
              )}

              {paymentMethod === 'upi' && (
                <div>
                  <h3>Scan QR to Pay</h3>
                  <QRCode
                    value={`upi://pay?pa=7989821721@ibl&pn=Store&am=${finalAmount}&cu=INR&tn=Order`}
                    size={200}
                  />
                  <p>Amount: ₹{finalAmount}</p>
                  <p>UPI ID:7989821721@ibl </p>
                  <button onClick={handleCompletePurchase} className="complete-purchase-btn">
                    ✅ I have completed payment
                  </button>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-payment-box">
                  <h3>Enter Card Details</h3>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  />
                  <button onClick={handleCardPayment} className="complete-purchase-btn">
                    ✅ Pay with Card
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
