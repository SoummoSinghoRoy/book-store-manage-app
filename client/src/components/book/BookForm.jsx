import React, { Component} from 'react';
import { connect } from 'react-redux';

import { bookCreateAction, clearBookStateAction } from '../../store/action/bookAction';
import { fetchAllPublishersAction } from '../../store/action/publisherAction';
import AlertComponent from '../Alert';

class BookForm extends Component {
  state = {
    name: '', 
    publish: '', 
    baseprice: '',
    publisher: ''
  }

  componentDidMount = () => {
    this.props.fetchAllPublishersAction()
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  selectHandler = (event) => {
    console.log(typeof(event.target.value));
    this.setState({
      publisher: event.target.value
    })
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
        publisher: ''
      })
    }
  }

  render() {
    return (
      <>
        {
          this.props.message ? 
          <AlertComponent message = { this.props.message } action = {clearBookStateAction()} alertStyle="alert alert-success alert-dismissible fade show"/> :
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
          <div className="mb-3">
            <label htmlFor="publisher" className='mb-1'>Select publisher</label>
            <select className={this.props.addError.publisher || this.props.editError.publisher ? "form-select is-invalid" : "form-select"}  value={this.state.publisher} onChange={this.selectHandler}>
              <option value= ""> Select a publisher.... </option>
              {
                this.props.publishers.map((publisher) => {
                  
                  return <option key={publisher.id} value={publisher.id}> { publisher.name } </option>
                })
              }
            </select>
            {
              this.props.addError.publisher || this.props.editError.publisher ? 
              <div className="invalid-feedback">
                { this.props.addError.publisher || this.props.editError.publisher }
              </div> :
              null
            }
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
    message: state.book.message
  }
}

export default connect(mapStateToProps, { bookCreateAction, clearBookStateAction, fetchAllPublishersAction })(BookForm);