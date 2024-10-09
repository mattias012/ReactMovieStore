import './styles/Header.css';
import imageLink from '../assets/logo.webp';
import { useState, useRef, useEffect } from 'react';

function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    // Navigate to the checkout section
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
            <ul>
              <li>Movie 1</li>
              <li>Movie 2</li>
              <li>Movie 3</li>
            </ul>
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