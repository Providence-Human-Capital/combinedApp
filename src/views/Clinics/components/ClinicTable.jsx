import React, { useState } from "react";
import { useSelector } from "react-redux";
import ClinicItem from "./ClinicItem";
import ReactPaginate from "react-paginate";

const ClinicTable = () => {
  const clinics = useSelector((state) => state.clinic.clinics);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;

  const getCurrentPageData = () => {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return clinics.slice(startIndex, endIndex);
  };
  return (
    <>
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="bb-2">ID</th>
                <th className="bb-2">Health Facility Name</th>
                <th className="bb-2">Address</th>
                <th className="bb-2">location</th>
                <th className="bb-2">Clinic Contact Number</th>

                <th className="bb-2"></th>
              </tr>
            </thead>
            <tbody>
              {clinics &&
                getCurrentPageData().map((clinic, index) => (
                  <ClinicItem key={clinic.id} clinic={clinic} index={index} />
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
            pageCount={Math.ceil(clinics.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(clinics) => {
              setPageNumber(clinics.selected);
            }}
            containerClassName={"pagination"}
            activeClassName={"active-paginate"}
          />
        </div>
      </div>
    </>
  );
};

export default ClinicTable;
