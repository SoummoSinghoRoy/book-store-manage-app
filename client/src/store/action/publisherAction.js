import axios from 'axios';

import { fetchAll_publishers, add_publisher, delete_publisher, edit_publisher, clear_publisherState } from '../slice/publisherSlice';

export const fetchAllPublishersAction = () => dispatch => {
  axios.get('http://localhost:9920/api/publisher').then((res) => {
  dispatch(fetchAll_publishers({publishers: res.data}))
  }).catch(err => {
    console.log(err);
  })
}

export const addPublisherAction = (publisher) => dispatch => {
  axios.post('http://localhost:9920/api/publisher/add-publisher', publisher).then(res => {
    dispatch(add_publisher(res.data))
  }).catch(err => {
    console.log(err.response.data);
    dispatch(add_publisher(err.response.data))
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

export const publisherEditAction = (publisherid, publisher) => dispatch => {
  axios.put(`http://localhost:9920/api/publisher/edit/${publisherid}`, publisher).then((res) => {
    console.log(res.data);
    dispatch(edit_publisher(res.data))
  }).catch((err) => {
    console.log(err.response.data);
    dispatch(edit_publisher(err.response.data))
  })
}

export const clearPublisherStateAction = () => dispatch => {
  dispatch(clear_publisherState())
}