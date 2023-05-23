import axios from 'axios';

import { add_book, fetch_AllBooks, clear_bookState } from '../slice/bookSlice';

export const fetchAllBooksAction = () => dispatch => {
  axios.get('http://localhost:9920/api/book').then((res) => {
    dispatch(fetch_AllBooks({ books: res.data }))
  }).catch((err) => {
    console.log(err);
  })
}

export const bookCreateAction = (book) => dispatch => {
  axios.post('http://localhost:9920/api/book/add-new', book).then((res) => {
    dispatch(add_book(res.data))
  }).catch((err) => {
    console.log(err.response.data);
    dispatch(add_book(err.response.data))
  })
}

export const clearBookStateAction = () => dispatch => {
  dispatch(clear_bookState())
}