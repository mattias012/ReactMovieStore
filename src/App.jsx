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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieDetails from './components/MovieDetails';
import { fetchMovies } from "./features/movieSlice";


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

        {/* Single Routes block */}
        <Routes>
          <Route path="/" element={<MovieCatalog status={status} error={error} />} />
          <Route path="/cart" element={
            <div className="app-container">
              <HeaderCart />
              <div className="cart-layout">
                <Cart />
                <OrderSummary />
              </div>
            </div>
          } />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/checkoutinformation" element={
            <div className="app-container">
              <HeaderCart />
              <div className="cart-layout">
                <CheckoutInformation />
              </div>
            </div>
          } />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();

  // Fetch movies on component mount
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        <MainContent />
      </div>
    </Router>
  );
}

export default App;
