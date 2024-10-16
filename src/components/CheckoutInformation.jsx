import React from "react";
import "./styles/CheckoutInformation.css";

function CheckoutInformation({ formData, handleFormChange, errors }) {
  return (
    <div className="checkout-information">
      <div className="information-section">
        <h3>Shipping Address</h3>
        <div className="information-grid">

          <div className="input-container">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleFormChange}
              className={errors.firstName ? "error-input" : ""}
            />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleFormChange}
              className={errors.lastName ? "error-input" : ""}
            />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>

          <div className="input-container">
            <input
              type="text"
              className={`full-width ${errors.telephone ? "error-input" : ""}`}
              name="telephone"
              placeholder="Telephone number "
              value={formData.telephone}
              onChange={handleFormChange}
            />
            {errors.telephone && <p className="error-message">{errors.telephone}</p>}
          </div>

          <div className="input-container">
            <input
              type="email"
              className={`full-width ${errors.email ? "error-input" : ""}`}
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleFormChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-container">
            <input
              type="text"
              className={`full-width ${errors.address ? "error-input" : ""}`}
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleFormChange}
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip code "
              value={formData.zipCode}
              onChange={handleFormChange}
              className={errors.zipCode ? "error-input" : ""}
            />
            {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleFormChange}
              className={errors.city ? "error-input" : ""}
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutInformation;

