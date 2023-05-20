import React from "react";

import PublisherForm from "../../components/publisher/PublisherForm";
import PublisherTable from "../../components/publisher/PublisherTable";

const Publisher = () => {
  return(
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center my-3">Book publisher</h4>
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