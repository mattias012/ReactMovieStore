import './styles/Header.css';
import imageLink from '../assets/logo-nobackground.png';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeMovieFromCart } from '../features/movieSlice.js'; 

function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch(); 

  const cartItems = useSelector((state) => state.movies.cart);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);


  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity; 
  }, 0);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleCheckout = () => {
    // TO DO: Gå till varukorg
    window.location.hash = "#cart";
  };

  const handleRemove = (id) => {
    dispatch(removeMovieFromCart({ id })); 
  };

  return (
    <header className="header">
      <div className="nav-left">
        <div className="logo">
          <img alt="logo" src={imageLink} />
        </div>
        <nav className="nav">
          <a href="#movies">Movies</a>
        </nav>
      </div>

      <div className="nav-right">
        <button className="cart-link" onClick={toggleCart}>
          🛒
          {cartItems.length > 0 && (
            <span className="cart-item-count">{totalQuantity}</span>
          )}
        </button>

        {cartOpen && (
          <div className="cart-dropdown" ref={dropdownRef}>
            {cartItems.length === 0 ? (
              <p>Cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="dropdown-cart-item">
                    <div className="dropdown-cart-item-title">
                      <strong>{item.Title}</strong>
                    </div>
                    <div className="dropdown-cart-item-quantity">
                      <span>{item.quantity}   </span>
                      <span 
                        className="remove-icon" 
                        onClick={() => handleRemove(item.id)} 
                        role="button"
                        aria-label={`Remove ${item.Title} from cart`}
                      >
                        ❌
                      </span>
                    </div>
                    
                  </li>
                ))}
              </ul>
            )}
                        <div className="total-price">
              <strong>Total: ${totalPrice.toFixed(2)}</strong> 
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
