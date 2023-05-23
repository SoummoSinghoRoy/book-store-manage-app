import React from 'react';
import { useSelector } from 'react-redux';

import BookTable from '../../components/book/BookTable';
import AlertComponent from '../../components/Alert';
import { clearBookStateAction } from '../../store/action/bookAction';

const BookList = () => {
  const message = useSelector(state => state.book.message)
  const editMessage = useSelector(state => state.book.editMessage)
  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card py-3">
            { message ? 
              <AlertComponent message = { message } editMessage = {editMessage} action = {clearBookStateAction()} alertStyle="alert alert-success alert-dismissible fade show"/>
              : null 
            }
            <div className="card-body">
              <BookTable/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookList;