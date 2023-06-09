import React from 'react';
import { useDispatch } from 'react-redux';

const DeleteComponent = (props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(props.action)
  }

  return(
    <button type="button" className="btn btn-danger px-3" onClick={handleDelete}>Delete</button>
  )
}

export default DeleteComponent;