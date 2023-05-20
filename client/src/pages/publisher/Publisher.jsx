import React from "react";
import { useSelector } from 'react-redux';

import { clearPublisherStateAction } from '../../store/action/publisherAction';
import AlertComponent from "../../components/Alert";
import PublisherForm from "../../components/publisher/PublisherForm";
import PublisherTable from "../../components/publisher/PublisherTable";

const Publisher = () => {

  const message = useSelector(state => state.publisher.message)

  return(
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center my-3">Book publisher</h4>
              { message ? 
                <AlertComponent message = { message } action = {clearPublisherStateAction()} alertStyle="alert alert-success alert-dismissible fade show"/>
                : null 
              }
              <PublisherForm/>
            </div>
            <div className="card-body">
              <PublisherTable/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Publisher;