import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authSlice from './slice/authSlice';
import phoneSlice from './slice/phoneSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  phone: phoneSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
