import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Sidebar from './components/SideBar';
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom"; 
import './App.css';
import MovieCatalog from './components/MovieCatalog';
import Cart from "./components/Cart";
import NotFound from './components/NotFound';
import Thankyou from './components/Thankyou';
import Checkout from './components/Checkout';

import HeaderCart from './components/HeaderCart';
import OrderSummary from './components/OrderSummary';
import CheckoutInformation from './components/CheckoutInformation';
import CheckoutCardDetails from './components/CheckoutCardDetails';
import CombinedCheckout from './components/CombinedCheckout';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieDetails from './components/MovieDetails';
import { fetchMovies } from "./features/movieSlice";
import ThankYouPage from './components/ThankYouPage';


function MainContent() {
  const location = useLocation();
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const isMovieDetailsPage = location.pathname.includes("/movie/");

  return (
    <div className="app-container">
      <Header />
      {!isMovieDetailsPage && (
        <div className="search-container">
          <SearchBar />
        </div>
      )}
      <div className="main-layout">
        {!isMovieDetailsPage && <Sidebar />}

        <Routes>
          <Route path="/" element={<MovieCatalog status={status} error={error} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Router>
      <Routes>

         <Route

          path="/cart"
          element={
            <div className="app-container">
              <HeaderCart /> 
              <div className="cart-layout">
                <Cart /> 
                <OrderSummary />
              </div>
            </div>
          }
        />
        <Route
          path="/checkout"
          element={
            <div className="fullpage-layout">
              <HeaderCart />
              <Checkout />
            </div>
          }
        />
        <Route
          path="/ThankYouPage"
          element={
            <div className="fullpage-layout">
              <HeaderCart />
              <ThankYouPage />
            </div>
          }
        />
        <Route
  path="/checkoutinfromtaion"
  element={
    <div className="app-container">
      <HeaderCart />
      <div className="cart-layout">
        <CombinedCheckout /> 
      </div>
    </div>
  }
/>

        <Route path="/*" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
