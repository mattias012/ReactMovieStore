import React from "react";
import "./styles/OrderSummary.css";


function OrderSummary() {
    return (
        <div className="order-summary">
            <h3>Your order</h3>
            <div className="cost-section">
                <p>Total cost</p>
                <p>10.88 USD</p>
            </div>
            <hr />
            <div className="shipping-section">
                <p>Shipping</p>
                <p>0</p>
            
            </div>
            <div className="to-pay-section">
                <p>To pay</p>
                10.88 USD
            </div>

            <div className="questions-section">
                <p>Questions?</p>
                <p>0000-000 000</p>
                <p>supportreactmovie@react.com</p>

            </div>
            <button className="pay-button"></button>
        </div>


    );

}
export default OrderSummary;

