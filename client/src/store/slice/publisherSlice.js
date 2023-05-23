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
      return {
        ...state,
        publishers: action.payload.publishers,
      }
    },
    add_publisher: (state, action) => {
      if(action.payload.registered_publisher) {
        return {
          ...state,
          publishers: [...state.publishers, action.payload.registered_publisher],
          message: action.payload.Message
        }
      } else {
        return {
          ...state,
          publishers: [...state.publishers],
          addError: action.payload.errors
        }
      }
    },
    delete_publisher: (state, action) => {
     return {
      ...state,
      publishers: [...state.publishers].filter(publisher => publisher.id !== action.payload.deleted_publisher.id),
      message: action.payload.Message || ''
     }
    },
    edit_publisher: (state, action) => {
      if (action.payload.updated_publisher) {
        const publisherIndex = state.publishers.findIndex(publisher => publisher.id === action.payload.updated_publisher.id);
        const updatedPublishers = [...state.publishers];
        updatedPublishers[publisherIndex] = action.payload.updated_publisher;
    
        return {
          ...state,
          publishers: updatedPublishers,
          message: action.payload.Message
        };
      } else {
        return {
          ...state,
          publishers: [...state.publishers],
          editError: action.payload.errors || {}
        };
      }
    },
    clear_publisherState: (state) => {
      return {
        ...state,
        message: ''
      }
    }
  }
})

export const { add_publisher, clear_publisherState, fetchAll_publishers, delete_publisher, edit_publisher } = publisherSlice.actions;
export default publisherSlice.reducer;