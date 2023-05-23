import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllBooksAction, bookDeleteAction } from '../../store/action/bookAction';
import DeleteComponent from '../DeleteButton';

const BookTable = () => {
  const [searchWord, setSearchWord] = useState('')
  const dispatch = useDispatch();
  const books = useSelector(state => state.book.books)

  useEffect(() => {
    dispatch(fetchAllBooksAction())
  }, [])

  const searchInputHandler = (event) => {
    setSearchWord(event.target.value)
  }

  const filteredBook = searchWord ? books.filter(book =>
    book.name.toLowerCase().includes(searchWord.toLowerCase())
  ) : books;

  return(
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>
              <h3>Book lists</h3>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th colSpan={2}>
              <input 
                type="text" 
                className='form-control'
                value={searchWord}
                onChange={searchInputHandler} 
                placeholder='search books...' 
              />
            </th>
          </tr>
          <tr className='text-center'>
            <th>No.</th>
            <th>Book name</th>
            <th>Publisher</th>
            <th>Base price </th>
            <th>Publish date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredBook.length !== 0 ?
              filteredBook.map((book, ind) => {
                return (
                  <tr key={book.id} className='text-center'>
                    <td> {ind + 1} </td>
                    <td> { book.name } </td>
                    <td> { book.Publisher.name } </td>
                    <td> { book.baseprice } </td>
                    <td> { book.publish } </td>
                    <td>
                      <DeleteComponent action={bookDeleteAction(book.id)} />
                    </td>
                  </tr>
                )
              }) :
              <tr>
                <td colSpan={6}><h5 className='text-center'>Book not found</h5></td>    
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default BookTable;
