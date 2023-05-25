import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllPublishersAction, publisherDeleteAction } from '../../store/action/publisherAction';
import DeleteComponent from '../DeleteButton';
import EditComponent from '../EditButton';

const PublisherTable = () => {
  const dispatch = useDispatch()
  const publishers = useSelector(state => state.publisher.publishers)
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    dispatch(fetchAllPublishersAction())
  },[])

  const searchInputHandler = (event) => {
    setSearchWord(event.target.value)
  }

  const filteredPublisher = searchWord ? publishers.filter(publisher =>
    publisher.name.toLowerCase().includes(searchWord.toLowerCase())
  ) : [...publishers].reverse();

  return (
    <>
      <div className="row mb-3">
        <div className="col-4">
          <input 
            type="text" 
            className='form-control'
            value={searchWord}
            onChange={searchInputHandler} 
            placeholder='search publisher by name' 
          />
        </div>
      </div>
      <div className='overflow-auto' style={{height: "500px"}}>
        <table className='table'>
          <thead>
            <tr className='text-center'>
              <th>No.</th>
              <th>Publisher name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredPublisher.length !== 0 ?
              filteredPublisher.map((publisher, ind) => {
                return(
                  <tr className='text-center' key={publisher.id}>
                    <td> { ind + 1 } </td>
                    <td> {publisher.name} </td>
                    <td>
                      <EditComponent itemId = {publisher.id}/>
                      <DeleteComponent action = {publisherDeleteAction(publisher.id)}/>
                    </td>
                  </tr>
                )
              }) : 
                <tr>
                  <td colSpan={3}><h5 className='text-center'>Publisher not found</h5></td>    
                </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}


export default PublisherTable;