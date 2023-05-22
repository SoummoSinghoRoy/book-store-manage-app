import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slice/authSlice';
import publisherSlice from './slice/publisherSlice';
import bookSlice from './slice/bookSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    publisher: publisherSlice,
    book: bookSlice
  }
})

export default store;