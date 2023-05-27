import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UnProtectedRoute = ({children}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if(!isAuthenticated) {
    return children
  }
  return <Navigate to='/book'/>
}

export default UnProtectedRoute;