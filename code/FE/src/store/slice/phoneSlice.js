import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  status: null,
  error: null,
  other: {},
};

const phoneSlice = createSlice({
  name: 'phone',
  initialState: initialState,
  reducers: {
    otherUserSlice(state, action) {
      state.other = action.payload;
    },
  },
});

export const { otherUserSlice } = phoneSlice.actions;

export default phoneSlice;
