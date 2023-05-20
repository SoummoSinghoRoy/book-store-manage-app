import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slice/authSlice';
import publisherSlice from './slice/publisherSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    publisher: publisherSlice
  }
})

export default store;