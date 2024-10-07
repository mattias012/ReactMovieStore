import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Sidebar from './components/SideBar';
import './App.css';
import MovieCatalog from './components/MovieCatalog';

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <div className="search-container">
        <SearchBar />
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Movie Section */}
        <MovieCatalog />
      </div>
    </div>
  );
}

export default App;
