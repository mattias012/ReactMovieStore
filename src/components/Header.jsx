import './styles/Header.css'
import { Link } from "react-router-dom";
import imageLink from '../assets/logo.webp'

function Header() {
  const [cartOpen, setCartOpen] = useState(false);

  // Click to show/hide cart
  const toggleCart = () => {
    setCartOpen(!cartOpen);
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
        <a href="#cart" className="cart-link" onClick={toggleCart}>
          Cart 🛒
        </a>

        {/* Dropdown */}
        {cartOpen && (
          <div className="cart-dropdown">
            <ul>
              <li>Movie 1</li>
              <li>Movie 2</li>
              <li>Movie 3</li>
            </ul>
            {/* Button to checkout */}
            <button className="checkout-button" onClick={() => alert('Go to checkout!')}>
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;