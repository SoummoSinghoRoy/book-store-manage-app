import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllBooksAction, bookDeleteAction } from '../../store/action/bookAction';
import DeleteComponent from '../DeleteButton';
import EditComponent from '../EditButton';
import Pagination from '../Pagination';

const BookTable = () => {
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const getBooks = useSelector(state => state.book.books);
  const books = [...getBooks].reverse();
  const totalPages = useSelector(state => state.book.totalPages);
  const offset = useSelector(state => state.book.offset)

  useEffect(() => {
    dispatch(fetchAllBooksAction(currentPage))
  }, [currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const previousPage = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const searchInputHandler = (event) => {
    setSearchWord(event.target.value)
  }

  const filteredBook = searchWord ? books.filter(book =>
    book.name.toLowerCase().includes(searchWord.toLowerCase())
  ) : books;

  return(
    <>
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
                  <tr key={book.id}>
                    <td className='text-center'> {ind + 1 + offset} </td>
                    <td className='text-center'> { book.name } </td>
                    <td className='text-center'> { book.Publisher.name } </td>
                    <td className='text-center'> { book.baseprice } </td>
                    <td className='text-center'> { book.publish } </td>
                    <td>
                      <EditComponent bookId = {book.id} />
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
      { 
        books.length !== 0 ?
        <Pagination 
          currentPage={ currentPage } 
          totalPages = { totalPages } 
          handlePageChange = { handlePageChange }
          previousPage={ previousPage }
          nextPage={ nextPage } 
        /> : null
      }
    </>
  )
}

export default BookTable;
