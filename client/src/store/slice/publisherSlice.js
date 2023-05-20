import { createSlice } from '@reduxjs/toolkit';

const publisherSlice = createSlice({
  name: 'publisher',
  initialState: {
    publishers: [],
    error: {},
    message: ''
  },
  reducers: {
    add_publisher: (state, action) => {
      state.publishers.push(action.payload.registered_publisher);
      state.error = action.payload.errors || {};
      state.message = action.payload.Message || '';
    },
    fetchAll_publishers: (state, action) => {
      state.publishers = action.payload.publishers
      state.error = {};
      state.message = '';
    },
    delete_publisher: (state, action) => {
      state.publishers = [...state.publishers].filter(publisher => publisher.id !== action.payload.deleted_publisher.id);
      state.error = {};
      state.message = action.payload.Message || ''
    },
    clear_publisherState: (state) => {
      state.publishers = [...state.publishers];
      state.error = {};
      state.message = '';
    }
  }
})

export const { add_publisher, clear_publisherState, fetchAll_publishers, delete_publisher } = publisherSlice.actions;
export default publisherSlice.reducer;