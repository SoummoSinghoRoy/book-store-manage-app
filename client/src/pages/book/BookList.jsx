import React from 'react';

import BookTable from '../../components/book/BookTable';

const BookList = () => {
  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card py-3">
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