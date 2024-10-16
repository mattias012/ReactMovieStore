import React from 'react';
import { useSelector } from 'react-redux'; 
import "./styles/OrderSummary.css";


function OrderSummary() {
 
  const cartItems = useSelector((state) => state.movies.cart);
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.Price ? item.Price : 10; 
    return total + price * item.quantity; 
  }, 0); 
  
  const handlePay = () => {
    if (cartItems.length > 0) { 
      window.location.hash = "#checkoutinfromtaion";
    }
  };

  return (
    <div className="sum-order-summary">
      <h3>Your order</h3>
      <div className="sum-cost-section">
        <p>Total cost</p>
        <p>{totalPrice.toFixed(2)} USD</p> 
      </div>
      <hr />
      <div className="sum-shipping-section">
        <p>Shipping</p> 
        <p>0.00 USD</p>
      </div>
      <div className="sum-to-pay-section">
        <p>To pay</p>
        <p>{(totalPrice).toFixed(2)} USD</p> 
      </div>
      <div className="sum-questions-section">
        <p>Questions?</p>
        <p>0000-000 000</p>
        <p>supportreactmovie@react.com</p>
      </div>
      <button className="sum-pay-button" onClick={handlePay}>Pay Now</button>
    
    </div>
  );
}

export default OrderSummary;



