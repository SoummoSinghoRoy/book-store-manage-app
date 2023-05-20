import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPublisherAction } from '../../store/action/publisherAction';

class PublisherForm extends Component {
  state={
    publishername: '',
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { publishername} = this.state;
    this.props.addPublisherAction({publishername})
    this.setState({
      publishername: ''
    })
  }

  render() {
    return(
      <>
        <form onSubmit={this.submitHandler} className="my-3">       
          <div className="input-group">
            <span className="input-group-text fw-semibold">Publisher name</span>
            <input 
              type="text" 
              id="publishername" 
              name="publishername" 
              className={this.props.error.publishername ? "form-control is-invalid" : "form-control"}
              value={ this.state.publishername } 
              onChange={this.changeHandler}
            />
            <button type="submit" className="btn btn-primary ms-2">Add publisher</button>
            { this.props.error.publishername &&
              <div className="invalid-feedback">
                { this.props.error.publishername }
              </div>
            }
          </div>
        </form>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.publisher.error,
    message: state.publisher.message,
  }
}

export default connect(mapStateToProps, { addPublisherAction })(PublisherForm);