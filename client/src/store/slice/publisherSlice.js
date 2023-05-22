import { createSlice } from '@reduxjs/toolkit';

const publisherSlice = createSlice({
  name: 'publisher',
  initialState: {
    publishers: [],
    addError: {},
    editError: {},
    message: ''
  },
  reducers: {
    fetchAll_publishers: (state, action) => {
      state.publishers = action.payload.publishers;
      state.addError = {};
      state.editError = {};
      state.message = '';
    },
    add_publisher: (state, action) => {
      if(action.payload.registered_publisher) {
        state.publishers.push(action.payload.registered_publisher);
        state.addError = {};
        state.editError = {};
        state.message = action.payload.Message || '';
      } else {
        state.publishers = [...state.publishers];
        state.addError = action.payload.errors || {};
        state.editError = {};
        state.message = '';
      }
    },
    delete_publisher: (state, action) => {
      state.publishers = [...state.publishers].filter(publisher => publisher.id !== action.payload.deleted_publisher.id);
      state.addError = {};
      state.editError = {};
      state.message = action.payload.Message || ''
    },
    edit_publisher: (state, action) => {
      if(action.payload.updated_publisher) {
        const publisherIndex= [...state.publishers].findIndex((publisher) => publisher.id === action.payload.updated_publisher.id);
        state.publishers[publisherIndex] = action.payload.updated_publisher;
        state.addError = {};
        state.editError = {};
        state.message = action.payload.Message;
      } else {
        state.publishers = [...state.publishers];
        state.addError = {};
        state.editError = action.payload.errors || {};
        state.message = '';
      }
    },
    clear_publisherState: (state) => {
      state.publishers = [...state.publishers];
      state.addError = {};
      state.editError = {};
      state.message = '';
    }
  }
})

export const { add_publisher, clear_publisherState, fetchAll_publishers, delete_publisher, edit_publisher } = publisherSlice.actions;
export default publisherSlice.reducer;