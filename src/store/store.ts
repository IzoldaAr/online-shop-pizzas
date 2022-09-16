import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slice/authSlice';
import filterSlice from './slice/filterSlice.js';
import { productReducer } from './slice/productSlice';
import cart from './slice/cartSlice';

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterSlice,
    cart,
  }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type TRootStore = ReturnType<typeof store.getState>;
