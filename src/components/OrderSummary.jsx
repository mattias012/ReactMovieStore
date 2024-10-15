
import React from 'react';
import { useSelector } from 'react-redux'; 
 import "./styles/OrderSummary.css";

function OrderSummary() {
 
  const cartItems = useSelector((state) => state.movies.cart);
  const totalPrice = cartItems.reduce((total, item) => {

    const price = item.Price ? item.Price : 10; 
    return total + price;
  }, 0); 
  
  const handlePay = () => {
    window.location.hash = "#checkoutinfromtaion";
  };

  return (
    <div className="order-summary">
      <h3>Your order</h3>

      <div className="cost-section">
        <p>Total cost</p>
        <p>{totalPrice.toFixed(2)} USD</p> 
      </div>

      <hr />

      <div className="shipping-section">
        <p>Shipping</p>
        <p>0</p>
      </div>

      <div className="to-pay-section">
        <p>To pay</p>
        <p>{totalPrice.toFixed(2)} USD</p>
      </div>

      <div className="questions-section">
        <p>Questions?</p>
        <p>0000-000 000</p>
        <p>supportreactmovie@react.com</p>
      </div>

      <button className="pay-button" onClick={handlePay}>Pay Now</button>
    
    </div>
  );
}

export default OrderSummary;


