import React from 'react';

import BookForm from '../../components/book/BookForm';

const BookCreate = () => {
  return(
    <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-3"></div>
          <div className="col-12 col-md-6 col-lg-6">
            <div className="card px-3 py-3">
              <h5 className="text-center">Create a book</h5>
              <div className="card-body">
                <BookForm isCreateMode = {true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default BookCreate;