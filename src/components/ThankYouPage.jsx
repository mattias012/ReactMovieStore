import React from 'react';
import './styles/ThankYouPage.css';

function ThankYouPage() {
  const orderNumber = '5892798379'; 

  return (
    <div className="thank-you-page">
      <h1>Thank You for your purchase</h1>
      <p><strong>ORDER NO: {orderNumber}</strong></p>
      <p>WE WILL SEND YOU ANOTHER EMAIL WHEN IN TRANSIT</p>
      <a className="track-order-button">TRACK YOUR ORDER HERE</a>
    </div>
  );
}

export default ThankYouPage;
