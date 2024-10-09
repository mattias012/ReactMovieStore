import React from "react";
import "./styles/CheckoutInformation.css";

function CheckoutInformation() {
    return (
        <div className="checkout-infromtaion">
        <div className="form-header">
          <a href="#back" className="back-link">&larr; Checkout</a>
          <img src="/src/assets/logo.png" alt="logo" className="form-logo" />
        </div>
      
        <div className="checkout-information">
          <div className="information-section">
            <h3>Your information</h3>
            <div className="information-grid">
              <input type="text" placeholder="First name" />
              <input type="text" placeholder="Last name" />
              <input type="text" className="full-width" placeholder="Telephone number" />
              <input type="email" className="full-width" placeholder="Mail" />
              <input type="text" className="full-width" placeholder="Address" />
              <input type="text" placeholder="Zip code" />
              <input type="text" placeholder="City" />
            </div>
          </div>
      
          <div className="information-section">
            <h3>Card Details</h3>
            <div className="information-grid">
              <input type="text" placeholder="Name on card" />
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="Expiration date" />
              <input type="text" placeholder="CCV" />
            </div>
          </div>
        </div>
      
        <button className="pay-button">Pay</button>
      </div>
      
        




    );



}

export default CheckoutInformation;