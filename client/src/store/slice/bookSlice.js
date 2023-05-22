import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    addError: {},
    editError: {},
    message: ''
  },
  reducers: {
    add_book: (state, action) => {
      if(action.payload.book) {
        state.books.push(action.payload.book);
        state.addError = {};
        state.editError = {};
        state.message = action.payload.Message || ''
      }else {
        state.publishers = [...state.books];
        state.addError = action.payload.errors || {};
        state.editError = {};
        state.message = '';
      }
    },
    clear_bookState: (state) => {
      state.publishers = [...state.books];
      state.addError = {};
      state.editError = {};
      state.message = '';
    }
  }
})

export const { add_book, clear_bookState } = bookSlice.actions;
export default bookSlice.reducer;