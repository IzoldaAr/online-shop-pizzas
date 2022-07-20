import { createSlice } from '@reduxjs/toolkit';

type TProduct = {
  name: string;
  price: number;
};

const initialState: TProduct = {
  name: '',
  price: 0,
};

const productSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addProduct(state, action) {
      state = { ...state, ...action.payload };
    },
    removeProduct(state) {
      state.name = '';
      state.price = 0;
    },
  },
});

export const productReducer = productSlice.reducer;
export const { addProduct, removeProduct } = productSlice.actions;
