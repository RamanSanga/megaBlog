// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // if you have slices

const store = configureStore({
  reducer: {
    auth:  authReducer, // example
  },
});

export default store;
