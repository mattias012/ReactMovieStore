import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Sidebar from './components/SideBar';
import {HashRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';
import MovieCatalog from './components/MovieCatalog';
import Cart from "./components/Cart";
import NotFound from './components/NotFound';
import Thankyou from './components/Thankyou';
import Checkout from './components/Checkout';
import Details from './components/Details';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import fetchMovies action from our slice
import { fetchMovies } from "./features/movieSlice";

function App() {
  //Initialize dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  //Get status and error from the Redux store
  const status = useSelector((state) => state.movies.status); //Select status from state
  const error = useSelector((state) => state.movies.error); //Select error message from state

  //useEffect to dispatch fetchMovies when the component is mounted
  useEffect(() => {
    if (status === "idle") {
      //Dispatch fetchMovies action if status is 'idle'
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  return (
    <Router>
      <div className="app-container">
        <Header />

        <div className="search-container">
          <SearchBar />
        </div>

        <div className="main-layout">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<MovieCatalog status={status} error={error} />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/thankyou" element={<Thankyou />} />
            <Route exact path="/details" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
