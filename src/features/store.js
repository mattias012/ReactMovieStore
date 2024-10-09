
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movieSlice';

//Create the Redux store and add the movieReducer to it
export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
