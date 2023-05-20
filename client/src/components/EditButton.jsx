import React from 'react';
import { useDispatch } from 'react-redux';

const EditComponent = (props) => {
  const dispatch = useDispatch()
  return(
    <button type="button" className="btn btn-warning me-2">Edit</button>
  )
}

export default EditComponent;