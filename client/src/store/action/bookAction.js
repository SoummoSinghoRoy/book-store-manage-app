import axios from 'axios';

import { add_book, fetch_AllBooks, delete_book, edit_book, clear_bookState } from '../slice/bookSlice';

export const fetchAllBooksAction = (currentpage) => dispatch => {
  axios.get('http://localhost:9920/api/book/', {
    params:{
      page: currentpage
    }
  }).then((res) => {
    dispatch(fetch_AllBooks(res.data))
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

export const bookDeleteAction = (bookid) => dispatch => {
  axios.delete(`http://localhost:9920/api/book/delete/${bookid}`).then((res) => {
    dispatch(delete_book(res.data))
  }).catch((err) => {
    console.log(err);
    dispatch(delete_book({ message: "Error occured! book can't delete" }))
  })
}

export const bookEditAction = (bookid, book) => dispatch => {
  axios.put(`http://localhost:9920/api/book/edit/${bookid}`, book).then((res) => {
    dispatch(edit_book(res.data))
  }).catch((err) => {
    console.log(err.response.data);
    dispatch(edit_book(err.response.data))
  })
}

export const clearBookStateAction = () => dispatch => {
  dispatch(clear_bookState())
}