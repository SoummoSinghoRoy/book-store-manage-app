import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    addError: {},
    editError: {},
    message: '',
    editMessage: ''
  },
  reducers: {
    fetch_AllBooks: (state, action) => {
      return {
        ...state,
        books: action.payload.books,
      }
    },
    add_book: (state, action) => {
      if(action.payload.book) {
        return {
          ...state,
          books: [...state.books, action.payload.book],
          message: action.payload.Message || ''
        };
      }else {
        return {
          ...state,
          publishers: [...state.books],
          addError: action.payload.errors || {},
        };
      }
    },
    delete_book: (state, action) => {
      return {
        ...state,
        books: action.payload.deleted_book.id ? [...state.books].filter((book) => book.id !== action.payload.deleted_book.id) : [...state.books],
        message: action.payload.Message || action.payload.Message
      }
    },
    edit_book: (state, action) => {
      if(action.payload.updated_book) {
        const bookIndex = [...state.books].findIndex((book) => book.id === action.payload.updated_book.id)
        const updatedBook = [...state.books]
        updatedBook[bookIndex] = action.payload.updated_book
        return {
          ...state,
          books: updatedBook,
          editMessage: action.payload.Message
        } 
      }else {
        return {
          ...state,
          books: [...state.books],
          editError: action.payload.errors || {}
        }
      }
    },
    clear_bookState: (state) => {
      return {
        ...state,
        editMessage: ''
      };
    }
  }
})

export const { add_book, fetch_AllBooks, delete_book, edit_book, clear_bookState } = bookSlice.actions;
export default bookSlice.reducer;