import React, { Component} from 'react';
import { connect } from 'react-redux';

import withNavigate from '../../hook/withNavigate';
import { signupUserAction } from '../../store/action/authAction';

class SignUp extends Component {
  state= {
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    messageAlert: true
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { username, email, password, confirmPassword } = this.state;
    this.props.signupUserAction({ username, email, password, confirmPassword })
  }

  render() {
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-12 col-md-3 col-lg-3"></div>
          <div className="col-12 col-md-6 col-lg-6">
            <div className="card px-3 py-3">
              <h5 className="text-center">Signup here</h5>
              <p className="text-center">Have an account? </p>
              <div className="card-body">
                <form method="post" onSubmit={this.submitHandler}>
                  <div className="mb-3">
                    <label htmlFor= "username" className="form-label">Username</label>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      className= {this.props.errors.username ? "form-control is-invalid" : "form-control"}
                      value={ this.state.username } 
                      onChange={this.changeHandler}/>
                      { this.props.errors.username && 
                        <div className="invalid-feedback">
                          { this.props.errors.username }
                        </div>
                      } 
                  </div>

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
                      <p className="text-warning">Note: password must be between 6 to 10 character</p>
                      { this.props.errors.password && 
                        <div className="invalid-feedback">
                          { this.props.errors.password }
                        </div>
                      } 
                  </div>

                  <div className="mb-3">
                    <label htmlFor= "confirmPassword" className="form-label">Confirm password</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      className={this.props.errors.confirmPassword ? "form-control is-invalid" : "form-control"}
                      value={ this.state.confirmPassword } 
                      onChange={this.changeHandler}/>
                      { this.props.errors.confirmPassword && 
                        <div className="invalid-feedback">
                          { this.props.errors.confirmPassword }
                        </div>
                      }
                  </div>

                  <button type="submit" className="btn btn-primary">Sign up</button>
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

export default connect(mapStateToProps, {signupUserAction})(SignUp);
