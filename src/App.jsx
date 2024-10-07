import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Sidebar from './components/SideBar';
import './App.css';
import MovieCatalog from './components/MovieCatalog';

function App() {
  return (
    <div className="app-container">
      <Header />

      <div className="search-container">
        <SearchBar />
      </div>

      <div className="main-layout">
        <Sidebar />
        <MovieCatalog />
      </div>
    </div>
  );
}

export default App;
