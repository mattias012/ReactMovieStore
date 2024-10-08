import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Sidebar from './components/SideBar';
import './App.css';
import MovieCatalog from './components/MovieCatalog';

import{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 //Import fetchMovies action from our slice
import { fetchMovies } from './features/movieSlice';


function App() {

// Initialize dispatch function to send actions to the Redux store
const dispatch = useDispatch();

// Get movies, status, and error from the Redux store
const movies = useSelector((state) => state.movies.movies); // Select movies array from state
const status = useSelector((state) => state.movies.status); // Select status from state
const error = useSelector((state) => state.movies.error); // Select error message from state

// useEffect to dispatch fetchMovies when the component is mounted
useEffect(() => {
  if (status === 'idle') {
    // Dispatch fetchMovies action if status is 'idle'
    dispatch(fetchMovies());
  }
}, [status, dispatch]);


  return (
    <div className="app-container">
      <Header />

      <div className="search-container">
        <SearchBar />
      </div>

      <div className="main-layout">
        <Sidebar />
        <MovieCatalog />
        <div className="App">
      <h1>React Movie Store</h1>
      {/* Display loading message when movies are being fetched */}
      {status === 'loading' && <p>Loading movies...</p>}
      
      {/* Display error message if the fetch request failed */}
      {status === 'failed' && <p>Error: {error}</p>}
      
      {/* Render the list of movies when data is successfully fetched */}
      <ul>
        {movies && movies.length > 0 ? (
          movies.map((movie, index) => (
            <li key={index}>
              <h2>{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </ul>
    </div>
      </div>
    </div>
  );
}

export default App;
