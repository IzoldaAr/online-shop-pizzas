import { createSlice } from '@reduxjs/toolkit';

type TProduct = {
  categoryId: number;
  sortType: { name: string; sortProperty: string };
};

const initialState: TProduct = {
  categoryId: 0,
  sortType: { name: 'популярности', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const { setCategoryId, setSortType } = filterSlice.actions;
export default filterSlice.reducer;
