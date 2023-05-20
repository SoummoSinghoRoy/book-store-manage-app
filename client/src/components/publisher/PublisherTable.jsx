import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllPublishersAction, publisherDeleteAction } from '../../store/action/publisherAction';
import DeleteComponent from '../DeleteButton';

const PublisherTable = () => {
  const dispatch = useDispatch()
  const publishers = useSelector(state => state.publisher.publishers)

  useEffect(() => {
    dispatch(fetchAllPublishersAction())
  },[dispatch])

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>No.</th>
          <th>Publisher name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          publishers.length !== 0 ?
          publishers.map((publisher, ind) => {
            return(
              <tr key={publisher.id}>
                <td> { ind + 1 } </td>
                <td> {publisher.name} </td>
                <td>
                  <DeleteComponent action = {publisherDeleteAction(publisher.id)} />
                </td>
              </tr>
            )
          }) : 
            <tr>
              <td colSpan={3}>Publishers not found</td>    
            </tr>
        }
      </tbody>
    </table>
  )
}


export default PublisherTable;