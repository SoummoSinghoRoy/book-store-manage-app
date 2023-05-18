import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import withNavigate from '../../hook/withNavigate';
import { loginUserAction } from '../../store/action/authAction';

class LogIn extends Component {
  state= {
    email: '', 
    password: '', 
    messageAlert: true
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { email, password} = this.state;
    this.props.loginUserAction({ email, password}, this.props.navigation)
  }

  render() {
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-12 col-md-4 col-lg-4"></div>
          <div className="col-12 col-md-4 col-lg-4">
            <div className="card px-3 py-3">
              <h5 className="text-center">Login here</h5>
              <p className="text-center">Don't have an account? <Link to="/signup" className="card-link">Sign up now</Link> </p>
              <div className="card-body">
                <form method="post" onSubmit={this.submitHandler}>

                  <div className="mb-3">
                    <label htmlFor= "email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className={this.props.errors.email ? "form-control is-invalid" : "form-control"}
                      value={ this.state.email } 
                      onChange={this.changeHandler}/>
                      { this.props.errors.email && 
                        <div className="invalid-feedback">
                          { this.props.errors.email }
                        </div>
                      } 
                  </div>

                  <div className="mb-3">
                    <label htmlFor= "password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className={this.props.errors.password ? "form-control is-invalid" : "form-control"}
                      value={ this.state.password } 
                      onChange={this.changeHandler}/>
                      { this.props.errors.password && 
                        <div className="invalid-feedback">
                          { this.props.errors.password }
                        </div>
                      } 
                  </div>

                  <button type="submit" className="btn btn-primary">Log in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.auth.error
  }
}

export default connect(mapStateToProps, {loginUserAction})(withNavigate(LogIn));