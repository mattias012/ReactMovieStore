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
    <>
      <Header />
      {!isMovieDetailsPage && (
        <div className="search-container">
          <SearchBar />
        </div>
      )}
      <div className="main-layout">
        {!isMovieDetailsPage && <Sidebar />}
        <Routes>
          <Route exact path="/" element={<MovieCatalog status={status} error={error} />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/thankyou" element={<Thankyou />} />
          <Route exact path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  const dispatch = useDispatch();

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
