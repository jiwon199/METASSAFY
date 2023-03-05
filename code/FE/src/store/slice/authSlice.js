import { createSlice } from '@reduxjs/toolkit';
import { loginAction, registerAction } from '../action/authAction';

const initialState = {
  data: null,
  status: null,
  error: null,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginSlice(state, action) {
      state.user = action.payload;
    },
    logoutSlice(state) {
      state.data = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
    builder.addCase(registerAction.pending, (state, action) => {
      state = { ...action.payload };
      return state;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state = { ...action.payload };
      return state;
    });
  },
});

export const { loginSlice, logoutSlice } = authSlice.actions;

export default authSlice;
