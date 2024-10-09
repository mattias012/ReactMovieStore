import React, { useState } from 'react';
import './styles/Cart.css';
import moviePoster from '/src/assets/shawshank-redemption.jpg'; // Placeholder for the movie poster

function CartItem({ title, year, price }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="cart-item">
      <img className="poster" src={moviePoster} alt={title} />
      <div className="details">
        <h3>{title}</h3>
        <p>{year}</p>
        <p>Price: {price.toFixed(2)} USD</p>
        <div className="quantity-controls">
          <button onClick={decrement}>-</button>
          <span>{quantity}</span>
          <button onClick={increment}>+</button>
        </div>
      </div>
      <div className="actions">
        <button className="remove-btn">Remove</button>
        <button className="trash-btn">
          <i className="fa fa-trash"></i> {/* Font Awesome Icon */}
        </button>
      </div>
    </div>
  );
}

function Cart() {
  return (
    <div className="cart">
      <h2>In your cart right now</h2>
      <CartItem title="The Shawshank Redemption" year="1994" price={10.80} />
      <CartItem title="The Shawshank Redemption" year="1994" price={10.80} />
    </div>
  );
}

export default Cart;