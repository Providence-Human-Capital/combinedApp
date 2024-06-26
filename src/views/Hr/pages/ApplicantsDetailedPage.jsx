import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { useParams } from "react-router-dom";
import useEmployee from "../hooks/useEmployee";
import Loading from "../../../components/Loading.jsx/Loading";
import UploadEmployeeCV from "../components/UploadEmployeeCv";
import { API } from "../../../../config";

import styles from "./employee-css/styles.module.css";

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
                className={`box-body text-end min-h-150 ${styles["my-component"]}`}
              ></div>
              <div className="box-body wed-up position-relative">
                <div className="d-md-flex align-items-center">
                  <div className="image-container">
                    <img
                      src={"/assets/images/user.jpg"}
                      className="bg-success-light rounded50 square-image"
                      alt=""
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
          </div>
          <div className="col-xl-4 col-12">
            <div className="box">
              <UploadEmployeeCV
                employeeId={applicantId}
                onUploadSuccess={handleEmployeeRefetch}
              />
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
                  {/* <!-- Work Experience Section --> */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h4
                        className="mb-3"
                        style={{ color: "#0E9645", fontWeight: "bold" }}
                      >
                        Work Experience
                      </h4>
                      <div
                        className="card mb-3"
                        style={{ backgroundColor: "#f0fdf3" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">Software Engineer</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            Tech Company
                          </h6>
                          <p className="card-text">Jan 2020 - Present</p>
                          <p className="card-text">
                            Developing and maintaining web applications using
                            modern frameworks.
                          </p>
                        </div>
                      </div>
                      <div
                        className="card mb-3"
                        style={{ backgroundColor: "#f0fdf3" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">Junior Developer</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            Startup Inc.
                          </h6>
                          <p className="card-text">Jun 2018 - Dec 2019</p>
                          <p className="card-text">
                            Worked on a team to build scalable web services and
                            mobile applications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Qualifications Section --> */}
                  <div className="row">
                    <div className="col-12">
                      <h4
                        className="mb-3"
                        style={{ color: "#0E9645", fontWeight: "bold" }}
                      >
                        Qualifications
                      </h4>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <h5>Bachelor of Science in Computer Science</h5>
                          <p className="mb-0">University of XYZ</p>
                          <small className="text-muted">2014 - 2018</small>
                        </li>
                        <li className="list-group-item">
                          <h5>Certified Scrum Master</h5>
                          <p className="mb-0">Scrum Alliance</p>
                          <small className="text-muted">2021</small>
                        </li>
                        <li className="list-group-item">
                          <h5>Full Stack Web Development Certificate</h5>
                          <p className="mb-0">Online Coding Bootcamp</p>
                          <small className="text-muted">2019</small>
                        </li>
                      </ul>
                    </div>
                  </div>
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
