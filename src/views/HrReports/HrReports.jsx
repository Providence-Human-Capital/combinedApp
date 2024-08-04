import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API } from "../../../config";
import Loading from "../../components/Loading.jsx/Loading";
import EmployeeExpertise from "../Hr/components/EmployeeExpertise";
import { Link } from "react-router-dom";

const HrReports = ({}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    month: "",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 2018 },
      (_, index) => currentYear - index
    );

    return years.map((year) => (
      <>
        <option key={year} value={year}>
          {year}
        </option>
      </>
    ));
  };

  const handleGenerateReport = () => {
    setIsLoading(true);
    axios
      .post(`${API}/api/applicants/reports/generate`, {
        year: filters.year,
        month: filters.month,
      })
      .then((response) => {
        console.log("Generated report", response.data);
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error generating report:", error);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  return (
    <>
      <BreadCrumb title={"Reports Management"} activeTab={"Reports Analysis"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="box p-3  py-4">
              <h4
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Generate Applicants Reports
              </h4>
              <div className="row g-3 mt-2">
                <div className="col-md-2">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleFilterChange("year", e.target.value)
                      }
                    >
                      <option value="">Select Year</option>
                      {generateYearOptions()}
                    </select>
                    <label>SELECT YEAR</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) =>
                        handleFilterChange("month", e.target.value)
                      }
                    >
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <label>SELECT MONTH</label>
                  </div>
                </div>
                <div className="col-md-2">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <button
                      className="btn btn-primary btn-block"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        borderRadius: "5px",
                      }}
                      onClick={handleGenerateReport}
                    >
                      GENERATE REPORT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="box">
              <div className="box-header">
                <h4
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  Applicants List
                </h4>
              </div>
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex"></div>
                  <div>
                    <button className="btn btn-primary">
                      <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                      {"  "}
                      EXPORT FILTER
                    </button>
                  </div>
                </div>

                <div className="table-responsive rounded card-table"></div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="bb-2">FIRST NAME</th>
                      <th className="bb-2">LAST NAME</th>
                      <th className="bb-2">GENDER</th>
                      <th className="bb-2">AREAS OF SPECIALIZATIONS</th>
                      <th className="bb-2">DATE OF BIRTH</th>
                      <th className="bb-2">NATIONALITY</th>
                      <th className="bb-2">REFERENCE TYPE</th>
                      <th className="bb-2">MARITAL STATUS</th>
                      <th className="bb-2">ADDRESS</th>
                      <th className="bb-2">PHONE NUMBER</th>
                      <th className="bb-2">EMAIL</th>
                      <th className="bb-2">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((employee) => (
                        <tr key={employee.id}>
                          <td style={{ cursor: "pointer" }}>
                            <Link
                              to={`/applicant/detail/${employee.id}`}
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {employee.first_name}
                            </Link>
                          </td>
                          <td style={{ cursor: "pointer" }}>
                            <Link
                              to={`/applicant/detail/${employee.id}`}
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {employee.last_name}
                            </Link>
                          </td>
                          <td>{employee.gender}</td>
                          <EmployeeExpertise employee={employee} />
                          <td>{employee.date_of_birth}</td>
                          <td>{employee.nationality}</td>
                          <td>
                            {employee.ref_type ? (
                              <span
                                className="badge badge-primary"
                                style={{
                                  textTransform: "uppercase",
                                }}
                              >
                                {employee.ref_type}
                              </span>
                            ) : (
                              <span className="badge badge-danger">SELF</span>
                            )}
                          </td>
                          <td>{employee.marital_status}</td>
                          <td
                            style={{
                              maxWidth: "120px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {employee.address}
                          </td>
                          <td  style={{
                              maxWidth: "150px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}>{employee.phone_number}</td>
                          <td
                            style={{
                              maxWidth: "150px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {employee.email}
                          </td>
                          <td>
                            <span
                              className="badge badge-warning"
                              style={{ cursor: "pointer" }}
                            >
                              {employee.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HrReports;
