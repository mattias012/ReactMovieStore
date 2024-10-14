// import React, { useState } from 'react';
// import './styles/Cart.css';


// function CartItem({ title, year, price }) {
//   const [quantity, setQuantity] = useState(1);

//   const increment = () => setQuantity(prev => prev + 1);
//   const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

//   return (
//     <div className="cart-item">
//       <img className="poster" src={moviePoster} alt={title} />
//       <div className="details">
//         <h3>{title}</h3>
//         <p>{year}</p>
//         <p>Price: {price.toFixed(2)} USD</p>
//         <div className="quantity-controls">
//           <button onClick={decrement}>-</button>
//           <span>{quantity}</span>
//           <button onClick={increment}>+</button>
//         </div>
//       </div>
//       <div className="actions">
//         <button className="remove-btn">Remove</button>
//         <button className="trash-btn">
//           {/* trash button here */}
//         </button>
//       </div>
//     </div>
//   );
// }

// function Cart() {
//   return (
//     <div className="cart">
//       <h2>In your cart right now</h2>
//       {/* cart item here!!!!!!! */}
//       {/* fix when cart is empty */}
     
//     </div>
//   );
// }

// export default Cart;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles/Cart.css';
import { removeMovieFromCart, clearCart } from '../features/movieSlice';
import trashIcon from '../assets/trashcan1.png';


function Cart() {
  const cartItems = useSelector((state) => state.movies.cart); 
  const dispatch = useDispatch();

  const handleRemoveMovie = (imdbID) => {
    dispatch(removeMovieFromCart({ imdbID })); 
  };

  const handleClearCart = () => {
    dispatch(clearCart()); 
  };

  const increment = (movie) => {
   // to do later
  };

  const decrement = (movie) => {
     // to do later
  };

  return (
    <div className="cart">
      <h2>In your cart right now</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.imdbID} className="cart-item">
              <img
                className="poster"
                src={item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/80x120?text=No+Image'}
                alt={item.Title}
              />
              <div className="details">
                <h3>{item.Title}</h3>
                <p>{item.Year}</p>
                <p>Price: ${(item.Price || 10).toFixed(2)} USD</p>
                <div className="quantity-controls">
                  <button onClick={() => decrement(item)}>-</button>
                  <span>1</span> 
                  <button onClick={() => increment(item)}>+</button>
                </div>
              </div>
              <div className="actions">
                <button className="remove-btn" onClick={() => handleRemoveMovie(item.imdbID)}>Remove</button>
                <button className="trash-btn">
                <img src={trashIcon} alt="trash icon" className="trash-icon" />
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div>
          <button className="clear-cart" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
