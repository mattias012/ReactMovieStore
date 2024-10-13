import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const tmdbApiKey = 'a986d7821a9ea8443749e7e796735aa3'; 
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(`${tmdbBaseUrl}/search/movie`, {
    params: {
      api_key: tmdbApiKey,
      query: 'batman', 
    },
  });
  return response.data.results;
});

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId, { getState }) => {
    const state = getState();
    const cachedMovie = state.movies.movieDetails[movieId];
    if (cachedMovie) {
      return cachedMovie;
    } else {
      const response = await axios.get(`${tmdbBaseUrl}/movie/${movieId}`, {
        params: {
          api_key: tmdbApiKey,
          append_to_response: 'credits,images,videos,reviews,keywords,similar,recommendations,release_dates,external_ids,translations',
        },
      });
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
    error: null, // In case of failure, stores error messages from API request
    selectedMovie: null, // Add selectedMovie to the initial state
  },
  reducers: {
    addMovieToCart: (state, action) => {
      const exists = state.cart.find(movie => movie.id === action.payload.id);
      if (!exists) {
        state.cart.push(action.payload);
      }
    },
    removeMovieFromCart: (state, action) => {
      state.cart = state.cart.filter(movie => movie.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    // Handle different states of the fetchMovies action
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
        state.movieDetails[action.payload.id] = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer to include it in the store
export const { addMovieToCart, removeMovieFromCart, clearCart } = movieSlice.actions;
export default movieSlice.reducer;
