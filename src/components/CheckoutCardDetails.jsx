import React from "react";
import "./styles/CheckoutCardDetails.css";

function CheckoutCardDetails({ cardDetails, handleCardChange, errors }) {
  return (
    <div className="card-checkout-information">
      <div className="card-information-section">
        <h3>Card Details</h3>
        <div className="card-information-grid">

          <div className="input-container">
            <input
              type="text"
              name="name"
              placeholder="Name on card"
              value={cardDetails.name}
              onChange={handleCardChange}
              className={errors.cardName ? "error-input" : ""}
            />
            {errors.cardName && <p className="error-message">{errors.cardName}</p>}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              maxLength="19"
              className={errors.cardNumber ? "error-input" : ""}
            />
            {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="expirationDate"
              placeholder="Expire date (MM/YY)"
              value={cardDetails.expirationDate}
              onChange={handleCardChange}
              maxLength="5"
              className={errors.expirationDate ? "error-input" : ""}
            />
            {errors.expirationDate && <p className="error-message">{errors.expirationDate}</p>}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="ccv"
              placeholder="CCV"
              value={cardDetails.ccv}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, ""); 
                handleCardChange({ target: { name: "ccv", value: numericValue } });
              }}
              maxLength="4"
              className={errors.ccv ? "error-input" : ""}
            />
            {errors.ccv && <p className="error-message">{errors.ccv}</p>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutCardDetails;


