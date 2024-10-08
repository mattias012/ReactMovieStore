import './styles/Header.css'
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

    <div className="nav-left">
    <div className="logo"><img alt="logo" src="/src/assets/logo.webp" /></div>
      <nav className="nav">
        <Link to="/">Movies</Link>
      </nav>
    </div>

    <div className="nav-right">
      <Link to="/cart" className='cart-link' >Cart 🛒</Link>
    </div>
  </header>
  );
}

export default Header;
