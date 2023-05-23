import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import PublisherEditModal from './publisher/PublisherEditModal';
import BookEditModal from './book/BookEditModal';

const EditComponent = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const publishers = useSelector((state) => state.publisher.publishers)
  const books = useSelector((state) => state.book.books)

  const handleEditModal = () => {
    setModalShow(true)
  }

  const closeModal = () => {
    setModalShow(false)
  }

  return(
    <>
      <button type="button" className="btn btn-warning px-4 me-2" onClick={handleEditModal}>Edit</button>
      {
        publishers.map((publisher) => {
          if(publisher.id === props.itemId) {
            return <PublisherEditModal key={publisher.id} show = {modalShow} close = {closeModal} publisher= {publisher} itemId= {props.itemId}/>
          } 
        })
      }
      {
        books.map((book) => {
          if(book.id === props.bookId) {
            return <BookEditModal key={book.id} show = {modalShow} close = {closeModal} book = {book} bookId = {props.bookId}/>
          }
        })
      }
    </>
  )
}

export default EditComponent;