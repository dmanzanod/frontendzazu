import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import imagesReducer from '../features/indicators/indicatorSlice'
export const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
});
