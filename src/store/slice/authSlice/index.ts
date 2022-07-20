import { createSlice } from '@reduxjs/toolkit';

type TAuth = {
  username: string;
  email: string;
};

const initialState: TAuth = {
  username: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserInfo(state, action) {
      state.email = action.payload.email;
      state.username = action.payload.email;
    },
    resetUserInfo(state) {
      state.email = '';
      state.username = '';
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addUserInfo, resetUserInfo } = authSlice.actions;
