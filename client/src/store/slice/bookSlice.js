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
    fetch_AllBooks: (state, action) => {
      return {
        ...state,
        books: action.payload.books,
        addError: {},
        editError: {},
        message:''
      }
    },
    add_book: (state, action) => {
      if(action.payload.book) {
        return {
          ...state,
          books: [...state.books, action.payload.book],
          addError: {},
          editError: {},
          message: action.payload.Message || ''
        };
      }else {
        return {
          ...state,
          publishers: [...state.books],
          addError: action.payload.errors || {},
          editError: {},
          message: ''
        };
      }
    },
    clear_bookState: (state) => {
      return {
        ...state,
        publishers: [...state.books],
        addError: {},
        editError: {},
        message: ''
      };
    }
  }
})

export const { add_book, fetch_AllBooks, clear_bookState } = bookSlice.actions;
export default bookSlice.reducer;