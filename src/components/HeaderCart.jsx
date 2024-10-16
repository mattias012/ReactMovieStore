
import './styles/HeaderCart.css'
import logo from '/src/assets/logo-nobackground.png';


function HeaderCart() {
  return (
    <header className="header-cart">

      <div className="nav-left">
        <a href="#/" className="continue-shopping">
          <span>&larr;</span> Continue shopping
        </a>
      </div>

      <div className="logo">
        <img alt="logo" src={logo} />
      </div>

      <div className="nav-right-cart">
       
      </div>

    </header>
  );
}

export default HeaderCart;
