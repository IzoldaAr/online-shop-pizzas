import { createSlice } from '@reduxjs/toolkit';

type TProduct = {
  searchValue: string;
  categoryId: number;
  sortType: { name: string; sortProperty: string };
};

const initialState: TProduct = {
  searchValue: '',
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
    setFilters(state, action) {
      state.sortType = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSortType, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
