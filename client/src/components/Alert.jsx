import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

const AlertComponent = (props) => {
  const [showAlert, setShowAlert] = useState(true)
  const dispatch = useDispatch();

  const handleDismiss = () => {
    setShowAlert(false)
    dispatch(props.action)
  }

  return(
    showAlert && (
      <div className= {props.alertStyle} role="alert">
        <strong>{ props.message }</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleDismiss}></button>
      </div>
    )
  )
}

export default AlertComponent;