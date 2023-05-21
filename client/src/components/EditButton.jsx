import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PublisherEditModal from './publisher/PublisherEditModal';

const EditComponent = (props) => {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const publishers = useSelector((state) => state.publisher.publishers)

  const handleEditModal = () => {
    setModalShow(true)
  }

  const closeModal = () => {
    setModalShow(false)
  }

  return(
    <>
      <button type="button" className="btn btn-warning me-2" onClick={handleEditModal}>Edit</button>
      {
        publishers.map((publisher) => {
          if(publisher.id === props.itemId) {
            return <PublisherEditModal key={publisher.id} show = {modalShow} close = {closeModal} publisher= {publisher} itemId= {props.itemId}/>
          } 
        })
      }
    </>
  )
}

export default EditComponent;