import React, { useState } from "react";
import { useSelector } from "react-redux";
import CompanyItem from "./CompanyItem";
import ReactPaginate from "react-paginate";

const CompanyTable = () => {
  const companies = useSelector((state) => state.company.companies) || [];
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;

  const getCurrentPageData = () => {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return companies.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="bb-2">ID</th>
              <th className="bb-2">Company Name</th>
              <th className="bb-2">Company Code</th>
              <th className="bb-2">Address</th>
              <th className="bb-2">Site Telephone</th>
              <th className="bb-2">Company Email</th>
              <th className="bb-2">Contact Person</th>
              <th className="bb-2">Province</th>
              <th className="bb-2">Designation</th>
              <th className="bb-2">Contact Number</th>
              <th className="bb-2"></th>
            </tr>
          </thead>
          <tbody>
            {companies &&
              getCurrentPageData().map((company, index) => (
                <CompanyItem key={company.id} company={company} index={index} />
              ))}
          </tbody>
        </table>
      </div>
      <div className="table-spacing"></div>
      <div className="paginate-position">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(companies.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(companies) => {
            setPageNumber(companies.selected);
          }}
          containerClassName={"pagination"}
          activeClassName={"active-paginate"}
        />
      </div>
    </>
  );
};

export default CompanyTable;
