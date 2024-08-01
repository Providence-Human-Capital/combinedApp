import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import useEmployee from "../hooks/useEmployee";
import Loading from "../../../components/Loading.jsx/Loading";
import UploadEmployeeCV from "../components/UploadEmployeeCv";
import { API } from "../../../../config";

import styles from "./employee-css/styles.module.css";
import Qualifications from "../components/Qualifications";

export const formatDate = (dateString, options) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};

export const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

const workerVersion = "3.12.0";
const ApplicantsDetailedPage = () => {
  const { applicantId } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const { data: employee, error, isLoading } = useEmployee(applicantId);

  useEffect(() => {
    setEmployeeData(employee);
  }, [employee]);

  const refetchEmployee = async () => {
    console.log("Refetching employee data...");
    try {
      // You can perform any necessary logic here before refetching data
      const updatedEmployee = await fetchEmployeeData(applicantId);
      console.log("Updated employee data:", updatedEmployee);
      setEmployeeData(updatedEmployee);
    } catch (error) {
      console.error("Error occurred while refetching employee data:", error);
    }
  };

  const handleEmployeeRefetch = () => {
    refetchEmployee();
  };

  const fetchEmployeeData = async (employeeId) => {
    try {
      // Perform API call or any other logic to fetch updated employee data
      const response = await fetch(`${API}/api/employee/${employeeId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error occurred while fetching employee data:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="content">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <BreadCrumb
        title={"Deployed Employees"}
        activeTab={"Staffing Solutions"}
      />
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <Link to={`/employee/update/${employee.id}`}>
              <button
                className="btn btn-secondary"
                style={{
                  marginRight: "10px",
                }}
              >
                {" "}
                <i
                  className="ti-pencil-alt2"
                  style={{
                    marginRight: "10px",
                  }}
                ></i>{" "}
                Edit Employee
              </button>
            </Link>

            {employee.file_path && (
              <>
                <a
                  className="btn btn-primary"
                  href={`${API}/api/storage/${employee.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View and Download CV PDF
                </a>
              </>
            )}

            <div className="box bg-bubbles-white mt-4">
              <div
                className={`box-body text-end  ${styles["my-component"]}`}
                style={{
                  minHeight: "350px !important",
                }}
              >
                <img src="https://providence-human-capital.github.io/images/6308.jpg" />
              </div>
              <div className="box-body wed-up position-relative">
                <div className="d-md-flex align-items-center">
                  <div className="image-container">
                    <img
                      src="/assets/images/user.jpg"
                      className="bg-success-light rounded50 square-image"
                      alt="https://providence-human-capital.github.io/images/6308.jpg"
                      style={{
                        width: "200px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="text-center my-10">
                      <p className="mb-0">EMPLOYEMENT STATUS</p>
                      <h4 className="badge badge-pill badge-primary">
                        {employee.status}
                      </h4>
                    </div>
                  </div>
                  <div className="mt-40">
                    <h4 className="fw-600 mb-5">
                      {employee.first_name} {employee.last_name}
                    </h4>
                    <h5 className="fw-500 mb-5">{employee.national_id}</h5>
                    <p>
                      Date of Application {"  "}
                      <i className="fa fa-clock-o"></i>{" "}
                      {formatDate(employee.created_at, options)}
                    </p>

                    <h5>
                      NATIONALITY:{" "}
                      <span className="badge badge-secondary">
                        {" "}
                        {employee.nationality}
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="p-3">
                  <h5 className="fw-bold mb-3">
                    Gender:
                    <span className="fw-light ms-2">{employee.gender}</span>
                  </h5>
                  <h5 className="fw-bold mb-3">
                    Date Of Birth:
                    <span className="fw-light ms-2">
                      <span className="badge bg-primary">
                        {employee.date_of_birth}
                      </span>
                    </span>
                  </h5>
                  <h5 className="fw-bold mb-3">
                    Marital Status:
                    <span className="fw-light ms-2">
                      <span className="badge bg-warning text-dark">
                        {employee.marital_status}
                      </span>
                    </span>
                  </h5>
                  <div className="mb-3">
                    <h5 className="fw-bold mb-1">HOME ADDRESS</h5>
                    <p className="text-uppercase fw-bold mb-0">
                      {employee.address}
                    </p>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">
                      PHONE NUMBER
                      <span className="fw-light ms-2">
                        <span className="badge bg-info text-dark">
                          {employee.phone_number}
                        </span>
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="box">
              <div className="box-body">
                <div className="row">
                  {employee.documents.length > 0 && (
                    <>
                      {employee.documents.map((doc) => (
                        <>
                          <div class="col-md-4">
                            <div
                              class="card"
                              style={{
                                backgroundColor: "#96FABC",
                              }}
                            >
                              <div class="card-body">
                                <h5
                                  class="card-title"
                                  style={{
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {doc?.type}
                                </h5>
                                <a
                                  href={`${API}/api/storage/${doc?.file_path}`}
                                  class="btn btn-primary"
                                  target="_blank"
                                >
                                  <i
                                    className="ti-eye"
                                    style={{
                                      marginRight: "10px",
                                    }}
                                  ></i>
                                  View {doc?.type}
                                </a>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-12">
            <div className="box">
              <UploadEmployeeCV
                employeeId={applicantId}
                onUploadSuccess={handleEmployeeRefetch}
              />
            </div>
            <div class="container mt-5">
              <h2
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Reference Information
              </h2>
              <div
                class="card"
                style={{
                  textTransform: "uppercase",
                  backgroundColor: "#96FABC",
                }}
              >
                <div class="card-body">
                  <h5 class="card-title">Reference Details</h5>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>From Company:</strong>
                    </div>
                    <div class="col-sm-8">{employee.from_company}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>From Position:</strong>
                    </div>
                    <div class="col-sm-8">{employee.from_position}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>Reference Type:</strong>
                    </div>
                    <div
                      class="col-sm-8"
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      {employee.ref_type ? (
                        <span className="badge badge-primary">
                          {employee.ref_type}
                        </span>
                      ) : (
                        <span className="badge badge-primary">SELF</span>
                      )}
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>REFERRER FULL NAME:</strong>
                    </div>
                    <div class="col-sm-8">{employee.ref_name}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>REFERRER Contact:</strong>
                    </div>
                    <div class="col-sm-8">{employee.ref_contact}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>REFERRER PLACE OF EMPLOYMENT:</strong>
                    </div>
                    <div class="col-sm-8">{employee.ref_emp}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>REFERRER Relation:</strong>
                    </div>
                    <div class="col-sm-8">{employee.ref_relation}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="box-header no-border">
                <h4
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  QUALIFICATIONS & WORK EXPERIENCE
                </h4>
              </div>
              <div className="box-body">
                <div className="container">
                  <div className="row mb-4">
                    <div className="col-12">
                      <h4
                        className="mb-3"
                        style={{ color: "#0E9645", fontWeight: "bold" }}
                      >
                        QUALIFICATIONS (EDUCATION LEVEL)
                      </h4>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <h5>{employee?.education_level}</h5>
                          {/* <p className="mb-0">University of XYZ</p>
                          <small className="text-muted">2014 - 2018</small> */}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-12">
                      <h4
                        className="mb-3"
                        style={{ color: "#0E9645", fontWeight: "bold" }}
                      >
                        WORK EXPERIENCE
                      </h4>
                      <div
                        className="card mb-3"
                        style={{ backgroundColor: "#f0fdf3" }}
                      >
                        <div className="card-body">
                          <p className="card-text">
                            {employee?.work_experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Qualifications employee={employee} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplicantsDetailedPage;
