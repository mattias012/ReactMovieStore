import React, { useState } from "react";
import CheckoutInformation from "./CheckoutInformation";
import CheckoutCardDetails from "./CheckoutCardDetails";
import "./styles/CombinedCheckout.css";
import { clearCart } from '../features/movieSlice';
import { useDispatch } from "react-redux";

function CombinedCheckout() {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    address: "",
    zipCode: "",
    city: "",
  });
  

  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    ccv: "",
  });

  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "telephone") {
      const formattedValue = formatTelephone(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
    } else if (name === "zipCode") {
      const formattedValue = formatZipCode(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = formatCardNumber(value);
      setCardDetails((prevCardDetails) => ({
        ...prevCardDetails,
        cardNumber: formattedValue,
      }));
    } else if (name === "expirationDate") {
      const formattedValue = formatExpirationDate(value);
      setCardDetails((prevCardDetails) => ({
        ...prevCardDetails,
        expirationDate: formattedValue,
      }));
    } else {
    
      setCardDetails((prevCardDetails) => ({
        ...prevCardDetails,
        [name]: value,
      }));
    }
  };

  const formatTelephone = (value) => {
    const numericValue = value.replace(/\D/g, "");
    const limitedValue = numericValue.substring(0, 10);
    const match = limitedValue.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `${match[1]}${match[2] ? " " + match[2] : ""}${match[3] ? " " + match[3] : ""}`.trim();
    }
    return value;
  };

  const formatZipCode = (value) => {
    const numericValue = value.replace(/\D/g, "").substring(0, 5);
    return numericValue;
  };

  const formatCardNumber = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpirationDate = (value) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length === 0) return "";
    if (numericValue.length <= 2) return numericValue;
    return `${numericValue.substring(0, 2)}/${numericValue.substring(2, 4)}`;
  };

  const validateFields = () => {
    let fieldErrors = {};

    // const nameRegex = /^[a-zA-Z]+$/;
    const nameRegex = /^[a-zA-ZåäöÅÄÖ]+$/;
    const phoneRegex = /^\d{3} \d{3} \d{4}$/;
    const zipRegex = /^\d{5}$/;

    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
      fieldErrors.firstName = "Please enter a valid first name (letters only).";
    }

    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
      fieldErrors.lastName = "Please enter a valid last name (letters only).";
    }

    if (!formData.telephone || !phoneRegex.test(formData.telephone)) {
      fieldErrors.telephone = "Please enter a valid telephone number (format: 000 000 0000).";
    }

    if (!formData.email) {
      fieldErrors.email = "Email is required.";
    }

    if (!formData.address) {
      fieldErrors.address = "Please enter a valid address.";
    }

    if (!formData.zipCode || !zipRegex.test(formData.zipCode)) {
      fieldErrors.zipCode = "Please enter a valid zip code (5 digits only).";
    }

    if (!formData.city || !nameRegex.test(formData.city)) {
      fieldErrors.city = "Please enter a valid city.";
    }

    const cardNumberRegex = /^[0-9]{16}$/;
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/(2[4-9]|30)$/;
    const ccvRegex = /^[0-9]{3,4}$/;

    if (!cardDetails.name || !/^[a-zA-Z\s]+$/.test(cardDetails.name)) {
      fieldErrors.cardName = "Please enter a valid cardholder name.";
    }

    const plainCardNumber = cardDetails.cardNumber.replace(/\s/g, "");
    if (!cardNumberRegex.test(plainCardNumber)) {
      fieldErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!expirationDateRegex.test(cardDetails.expirationDate)) {
      fieldErrors.expirationDate = "Expiration date must be MM/YY.";
    }

    if (!ccvRegex.test(cardDetails.ccv)) {
      fieldErrors.ccv = "CCV must be 3 or 4 digits.";
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };
  
  const handleClearCart = () => {
    dispatch(clearCart()); 
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
        handleClearCart();
      window.location.hash = "#ThankYouPage";
    } else {
     
    }
  };

  return (
    <div className="combined-checkout">
      <h2>Combined Checkout</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="checkout-form">
        <div className="checkout-forms-container">
          <CheckoutInformation
            formData={formData}
            handleFormChange={handleFormChange}
            errors={errors}
          />
          <CheckoutCardDetails
            cardDetails={cardDetails}
            handleCardChange={handleCardChange}
            errors={errors}
          />
        </div>
        <button type="submit" className="pay-button">
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default CombinedCheckout;

