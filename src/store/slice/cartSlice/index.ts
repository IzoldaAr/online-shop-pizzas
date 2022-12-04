import { createSlice } from '@reduxjs/toolkit';
import { TRootStore } from '../../store';


type Cart = {
  totalPrice: number;
  totalCount: number;
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
  totalCount: 0,
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
      state.totalCount = state.items.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
      state.totalCount = state.items.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const foundItem = state.items.find(obj => obj.id === action.payload.id);
      if (foundItem) {
        foundItem.count --;
        state.totalCount --;
        state.totalPrice = state.totalPrice - action.payload.price
        if (+foundItem.count === 0 || +foundItem.count < 0) {
          state.items = state.items.filter(obj => obj.id !== action.payload.id)
        }
      }
    }
  },
});

export const selectCart = (state: TRootStore) => state.cart
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
