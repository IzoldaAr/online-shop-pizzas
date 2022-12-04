import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

type TPizza = {
  id: number;
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[]
  
};

export type SearchPizzaParams = {
  category: string; 
  sortBy: string; 
  order: string; 
  search: string
}

export const fetchPizzas = createAsyncThunk<TPizza[], SearchPizzaParams>('pizza/fetchPizzasItems', async(params) => {
  const {category, sortBy, order, search} = params;
  const {data} = await axios.get<TPizza[]>('https://630492e494b8c58fd720179b.mockapi.io/items?' + category + sortBy + order + search);
  return data;
})

const initialState: {pizzas: TPizza[], status: string} = {
  pizzas: [],
  status: 'loading'
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.pizzas = action.payload
    }
  },
  extraReducers: (builder) => {
    return (
    builder.addCase(fetchPizzas.pending, (state)=> {
      state.status = 'loading';
      state.pizzas = []
    }),
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.pizzas = action.payload
    }),
    builder.addCase(fetchPizzas.rejected, state => {
      state.status = 'error';
      state.pizzas = []
    }))
  }
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
