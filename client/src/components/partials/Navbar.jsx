import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '../../images.png';
import { logoutUserAction } from '../../store/action/authAction';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUserAction(navigate))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg bg-primary-subtle mb-2 fw-semibold">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">
                <img src={logo} alt="logo" className='img-fluid' width="70" height="auto"/>
              </NavLink>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav me-auto">
                  <li className='nav-item'>
                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                  </li>
                  {
                    isAuthenticated && 
                    <React.Fragment>
                      <li className='nav-item'>
                        <NavLink className="nav-link" to="/book">Book list</NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink className="nav-link" to="/book/create">Add book</NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink className="nav-link" to="/publisher">Publisher</NavLink>
                      </li>
                    </React.Fragment>
                  }
                </ul>
                <ul className="navbar-nav">
                  {
                    isAuthenticated ?
                    <li className='nav-item'>
                      <button
                        type='button'
                        className="btn btn-outline-secondary fw-semibold"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                    </li>
                    :
                    <React.Fragment>
                      <li className='nav-item me-2'>
                        <NavLink className="btn btn-outline-secondary fw-semibold" to="/signup">Signup</NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink className="btn btn-outline-secondary px-3 fw-semibold" to="/login">Login</NavLink>
                      </li>
                    </React.Fragment>
                  }
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar;