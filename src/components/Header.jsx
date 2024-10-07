import './styles/Header.css'

function Header() {
  return (
    <header className="header">

    <div className="nav-left">
    <div className="logo"><img alt="logo" src="/src/assets/logo.webp" /></div>
      <nav className="nav">
        <a href="#movies">Movies</a>
      </nav>
    </div>

    <div className="nav-right">
      <a href="#cart" className="cart-link">Cart 🛒</a>
    </div>
  </header>
  );
}

export default Header;
