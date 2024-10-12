import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for the OMDB API
const apiKey = '8eec2a77';
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

// Define an async thunk for fetching movies from the API
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  // Axios GET request to fetch movies from the API
  const response = await axios.get(`${baseUrl}&s=batman`);
  return response.data.Search; // Return the list of movies from the response
});

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (imdbID, { getState }) => {
    const state = getState();
    const cachedMovie = state.movies.movieDetails[imdbID];
    if (cachedMovie) {
      return cachedMovie;
    } else {
      const response = await axios.get(`${baseUrl}&i=${imdbID}&plot=full`);
      return response.data;
    }
  }
);

// Create a movie slice using createSlice
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [], // Store movies here
    cart: [],
    movieDetails: {}, // Cache for detailed data
    status: 'idle', // Status of the API request ('idle', 'loading', 'succeeded', 'failed')
    error: null, // In case of failure, stores error messages from API requests
    selectedMovie: null,  // Add selectedMovie to the initial state
    searchTerm: '',  // Add searchTerm to the state
  },
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;  // Update search term in state
    },
    addMovieToCart: (state, action) => {
      const exists = state.cart.find(movie => movie.imdbID === action.payload.imdbID);
      if (!exists) {
        state.cart.push(action.payload);
      }
    },
    removeMovieFromCart: (state, action) => {
      state.cart = state.cart.filter(movie => movie.imdbID !== action.payload.imdbID);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    // Handle different states of the fetchMovies action
    builder
      .addCase(fetchMovies.pending, (state) => {
        // When the request is pending, set status to 'loading'
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        // When the request is successful, set status to 'succeeded' and update the movies array
        state.status = 'succeeded';
        state.movies = action.payload; // Store the fetched movies in the state
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        // When the request fails, set status to 'failed' and store the error message
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
        state.movieDetails[action.payload.imdbID] = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer to include it in the store
export const { setSelectedMovie, addMovieToCart, removeMovieFromCart, clearCart, setSearchTerm } = movieSlice.actions;
export default movieSlice.reducer;
