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

function App() {
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
            <Route exact path="/" element={<MovieCatalog />} />
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
