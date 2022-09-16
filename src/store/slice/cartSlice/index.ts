import { createSlice } from '@reduxjs/toolkit';

type Cart = {
  totalPrice: number;
  items: Array<{
    id: number;
    price: number;
    count: number;
    title: string;
    imageUrl: string;
    type: number;
    size: number;
  }>;
};

const initialState: Cart = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const foundItem = state.items.find((obj) => obj.id === action.payload.id);
      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
