import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://www.omdbapi.com/?s=batman&&plot=full&apikey=8eec2a77&page=1';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(apiUrl);
  return response.data.Search;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    cart: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addMovieToCart: (state, action) => {
      // Control if movie is already in cart
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
      });
  },
});

export const { addMovieToCart, removeMovieFromCart, clearCart } = movieSlice.actions;
export default movieSlice.reducer;