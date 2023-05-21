import React, { Component } from "react";
import { connect } from 'react-redux';

import { publisherEditAction } from "../../store/action/publisherAction";

class PublisherEditModal extends Component {
  state = {
    publishername: ''
  }

  componentDidMount() {
    this.setState({
      publishername: this.props.publisher.name
    })
  }

  changeHandler= (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { publishername} = this.state;
    this.props.publisherEditAction(this.props.itemId, {publishername})
    this.setState({
      publishername
    })
  }

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
              <h1 className="modal-title fs-5" id="publisherEditModalLabel">Edit publisher</h1>
              <button type="button" className="btn-close" onClick={this.props.close} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body my-3">
              <form onSubmit={this.submitHandler} className="my-3">       
                <div className="input-group">
                  <span className="input-group-text fw-semibold">Publisher name</span>
                  <input 
                    type="text" 
                    id="publishername" 
                    name="publishername" 
                    className={this.props.editError.publishername ? "form-control is-invalid" : "form-control"}
                    value={ this.state.publishername} 
                    onChange={this.changeHandler}
                  />
                  <button type="submit" className="btn btn-primary ms-2">Add publisher</button>
                  { this.props.editError.publishername &&
                    <div className="invalid-feedback">
                      { this.props.editError.publishername }
                    </div>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editError: state.publisher.editError,
    message: state.publisher.message,
  }
}

export default connect(mapStateToProps, {publisherEditAction})(PublisherEditModal);