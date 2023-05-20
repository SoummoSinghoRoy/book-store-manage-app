import axios from 'axios';

import { add_publisher, clear_publisherState, delete_publisher, fetchAll_publishers } from '../slice/publisherSlice';

export const addPublisherAction = (publisher) => dispatch => {
  axios.post('http://localhost:9920/api/publisher/add-publisher', publisher).then(res => {
    dispatch(add_publisher(res.data))
  }).catch(err => {
    console.log(err.response.data);
    dispatch(add_publisher(err.response.data))
  })
}

export const fetchAllPublishersAction = () => dispatch => {
  axios.get('http://localhost:9920/api/publisher').then((res) => {
  dispatch(fetchAll_publishers({publishers: res.data}))
  }).catch(err => {
    console.log(err);
  })
}

export const publisherDeleteAction = (publisherid) => dispatch => {
  axios.delete(`http://localhost:9920/api/publisher/delete/${publisherid}`).then(res => {
    dispatch(delete_publisher(res.data))
  }).catch((err) => {
    console.log(err);
    dispatch(delete_publisher({message: "Error occured! Publisher can't delete"}))
  })
}

export const clearPublisherStateAction = () => dispatch => {
  dispatch(clear_publisherState())
}