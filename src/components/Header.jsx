import './styles/Header.css';
import imageLink from '../assets/logo-nobackground.png';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get movies from redux store
  const cartItems = useSelector((state) => state.movies.cart);

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
    // TO DO: Go to cart
    window.location.hash = "#cart";
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
        </button>

        {cartOpen && (
          <div className="cart-dropdown" ref={dropdownRef}>
            {cartItems.length === 0 ? (
              <p>Cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={item.imdbID}>{item.Title}</li>
                ))}
              </ul>
            )}
            <button className="checkout-button" onClick={handleCheckout}>
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;