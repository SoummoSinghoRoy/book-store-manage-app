import React from 'react';

const Pagination = (props) => {
  const pageNumbers = []
  for(let p = 1; p <= props.totalPages; p++) {
    pageNumbers.push(p)
  }

  const handlePageChange = (newPage) => {
    props.setCurrentPage(newPage);
  };

  return(
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center my-2">
          <li className={ props.currentPage == 1 ? "page-item disabled" : "page-item" }>
            <a 
              className="page-link" 
              onClick={() => handlePageChange(props.currentPage - 1)}
              style={props.currentPage === 1 ? {background: "#F8F9FA"}: {cursor: "pointer"}}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          { pageNumbers.map((number) => (
                <li key={number} className={props.currentPage === number ? "active page-item": "page-item"}>
                  <a 
                    className="page-link" 
                    style={{cursor: "pointer"}}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </a>
                </li>
              ))}
          <li className= {props.currentPage === pageNumbers.length ? "page-item disabled" : "page-item"}>
            <a 
              className="page-link" 
              style={props.currentPage === pageNumbers.length ? {background: "#F8F9FA"}: {cursor: "pointer"}}
              onClick={ () => handlePageChange(props.currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination;