import React, { Component } from 'react';
import BookForm from './BookForm';

class BookEditModal extends Component {
  render() {
    return(
      <div 
        className={`modal fade ${this.props.show ? "show" : ""} d-${this.props.show ? "block" : "none"}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="publisherEditModalLabel">Edit book</h1>
              <button type="button" className="btn-close" onClick={this.props.close} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body my-3">
              <BookForm isEditMode={true} book= {this.props.book} bookId = {this.props.bookId}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookEditModal;