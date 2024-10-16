import './styles/HeaderPayment.css'
import logo from '/src/assets/logo-nobackground.png';

function HeaderPayment() {
  return (
    <header className="header-payment">

      <div className="nav-left">
        <a href="#cart" className="go-back">
          <span>&larr;</span> Back to checkout
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

export default HeaderPayment;
