import React, { Component} from 'react';
import { connect } from 'react-redux';

import { bookCreateAction, bookEditAction, clearBookStateAction } from '../../store/action/bookAction';
import { fetchAllPublishersAction } from '../../store/action/publisherAction';
import AlertComponent from '../Alert';

class BookForm extends Component {
  state = {
    name: '', 
    publish: '', 
    baseprice: '',
    publisher: '',
    searchWord: '',
    publishername: '',
    accordionIndex: null
  }

  componentDidMount = () => {
    this.props.fetchAllPublishersAction()
    if(this.props.isEditMode) {
      this.setState({
        name: this.props.book.name,
        publish: this.props.book.publish,
        baseprice: this.props.book.baseprice,
        publisher: this.props.book.Publisher.id,
        publishername: this.props.book.Publisher.name
      })
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAccordionClick = (index) => {
    if (index === this.state.accordionIndex) {
      this.setState({
        accordionIndex: null
      })
    } else {
      this.setState({
        accordionIndex: index
      })
    }
  }

  isAccordionActive = (index) => {
    return index === this.state.accordionIndex ? 'show' : '';
  }

  searchInputHandler = (event) => {
    this.setState({
      searchWord: event.target.value
    })
  }

  selectHandler = (event) => {
    const selectedPublisherId = event.target.value;
    console.log(selectedPublisherId);
    const selectedPublisher = this.props.publishers.find(publisher => publisher.id === parseInt(selectedPublisherId))
    const selectedPublisherName = selectedPublisher ? selectedPublisher.name : '';

    this.setState({
      publisher: selectedPublisherId,
      publishername: selectedPublisherName,
      accordionIndex: null
    });
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { name, publish, baseprice, publisher } = this.state;
    if(this.props.isCreateMode) {
      this.props.bookCreateAction({name, publish, baseprice, publisher})
      this.setState({
        name: '', 
        publish: '', 
        baseprice: '',
        publisher: '',
        searchWord: '',
        accordionIndex: null
      })
    }else if(this.props.isEditMode) {
      this.props.bookEditAction(this.props.bookId, { name, publish, baseprice, publisher })
      this.setState({
        searchWord: '',
        accordionIndex: null
      })
    }
  }

  render() {
    let filteredPublisher;

    if (this.state.searchWord) {
      filteredPublisher = this.props.publishers.filter((publisher) =>
        publisher.name.toLowerCase().includes(this.state.searchWord.toLowerCase())
      );
    }
    return (
      <>
        {
          this.props.message || this.props.editMessage ? 
          <AlertComponent message = { this.props.message } editMessage = {this.props.editMessage} action = {clearBookStateAction()} alertStyle="alert alert-success alert-dismissible fade show"/> :
          null
        }
        <form method='post' onSubmit={this.submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className='mb-1'>Book name</label>
            <input 
              type="text"
              className={ this.props.addError.name || this.props.editError.name ? "form-control is-invalid" : "form-control" }
              name='name'
              id='name'
              value={this.state.name}
              onChange={this.changeHandler} 
            />
            {
              this.props.addError.name || this.props.editError.name ? 
              <div className="invalid-feedback">
                { this.props.addError.name || this.props.editError.name }
              </div> :
              null
            }
          </div>
          <div className="mb-3">
            <label htmlFor="publish" className='mb-1'>Publish date</label>
            <input 
              type="date"
              className={ this.props.addError.publish || this.props.editError.publish ? "form-control is-invalid" : "form-control" }
              name='publish'
              id='publish'
              value={this.state.publish}
              onChange={this.changeHandler} 
            />
            {
              this.props.addError.publish || this.props.editError.publish ? 
              <div className="invalid-feedback">
                { this.props.addError.publish || this.props.editError.publish }
              </div> :
              null
            }
          </div>
          <div className="mb-3">
            <label htmlFor="baseprice" className='mb-1'>Base price</label>
            <input 
              type="text"
              className={ this.props.addError.baseprice || this.props.editError.baseprice ? "form-control is-invalid" : "form-control" }
              name='baseprice'
              id='baseprice'
              value={this.state.baseprice}
              onChange={this.changeHandler} 
            />
            {
              this.props.addError.baseprice || this.props.editError.baseprice ? 
              <div className="invalid-feedback">
                { this.props.addError.baseprice || this.props.editError.baseprice }
              </div> :
              null
            }
          </div>
          <div className="accordion mb-3" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className={`accordion-button publisher-accordion-btn ${this.isAccordionActive(0)}`}
                  type="button"
                  onClick={() => this.handleAccordionClick(0)}
                >
                  { this.state.publishername !== '' ? this.state.publishername : "Enter a publisher" }
                </button>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse ${this.isAccordionActive(0)}`}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <input 
                    type="text" 
                    value={this.state.searchWord}
                    onChange={this.searchInputHandler}
                    className='form-control'
                    placeholder='Search by publisher name'
                  />
                  <div className='overflow-auto' style={{height: "200px"}}>
                    <div className="list-group my-2">
                      { this.state.searchWord ? 
                        filteredPublisher.map((publisher) => {
                          return(
                            <button
                              key={publisher.id} 
                              type="button" 
                              className="list-group-item list-group-item-action" 
                              onClick={this.selectHandler} 
                              value={publisher.id}
                            > 
                              {publisher.name} 
                            </button>
                          )
                        }) :
                        this.props.publishers.map((publisher) => {
                          return(
                            <button
                              key={publisher.id} 
                              type="button" 
                              className="list-group-item list-group-item-action" 
                              onClick={this.selectHandler} 
                              value={publisher.id}
                            > 
                              {publisher.name} 
                            </button>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='feedback'>
              {
                this.props.addError.publisher || this.props.editError.publisher ? 
                <div className="invalid-feedback d-block">
                  { this.props.addError.publisher || this.props.editError.publisher }
                </div> :
                null
              }
            </div>
          </div>
          <button type="submit" className="btn btn-primary ms-2">{this.props.isCreateMode ? "Add book" : "Edit book" }</button>
        </form>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    publishers: state.publisher.publishers,
    addError: state.book.addError,
    editError: state.book.editError,
    message: state.book.message,
    editMessage: state.book.editMessage
  }
}

export default connect(mapStateToProps, { bookCreateAction, bookEditAction, clearBookStateAction, fetchAllPublishersAction })(BookForm);