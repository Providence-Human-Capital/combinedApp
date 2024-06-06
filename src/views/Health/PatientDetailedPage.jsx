import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PatientDetailedPage = () => {
  const [singlePatient, setSinglePatient] = useState();

  const { patientId } = useParams();
  const patients = useSelector((state) => state.patient.patients) || [];

  useEffect(() => {
    const patient = patients.find((p) => p.id === parseInt(patientId));
    setSinglePatient(patient);
  }, [patientId]);

  return (
    <>
      <BreadCrumb title={"PATIENT"} activeTab={"PROFILE"} />
      <section className="content">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="box">
              <div className="box-body">
                <div className="row">
                  <div class="d-md-flex align-items-center justify-content-end mb-20">
                    <div class="d-flex">
                      <button className="btn btn-success">
                        <i
                          className="ti-printer"
                          style={{
                            fontFamily: "Poppins",
                          }}
                        >
                          {" "}
                          <span
                            style={{
                              marginLeft: "10px",
                            }}
                          >
                            {" "}
                            PRINT PROFILE
                          </span>
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-12">
                    <div className="wed-up position-relative">
                      <div className="d-md-flex align-items-center">
                        <div>
                          <div className="image-container">
                            <img
                              src="/public/assets/images/user.jpg"
                              className="bg-success-light rounded50 square-image"
                              alt=""
                              style={{
                                width: "200px",
                                borderRadius: "50%",
                              }}
                            />
                            <label
                              htmlFor="image-upload"
                              className="upload-button"
                              style={{
                                width: "200px",
                                borderRadius: "50%",
                              }}
                            ></label>
                          </div>
                          <div className="space"></div>
                          <div className="text-start my-10">
                            <p className="mb-0">PATIENT TYPE</p>
                            <h4 className="badge badge-dark">
                              {singlePatient?.patient_type}
                            </h4>
                          </div>
                        </div>

                        <div className="mt-40">
                          <h4 className="fw-600 mb-10">
                            {singlePatient?.first_name}{" "}
                            {singlePatient?.last_name}
                          </h4>
                          <h5 className="fw-500 mb-10">
                            {singlePatient?.national_id}
                          </h5>
                          <p>
                            <i className="fa fa-tag"></i>{" "}
                            {singlePatient?.gender}
                          </p>
                          <p>
                            COMPANY
                            <span
                              className="badge badge-primary"
                              style={{
                                marginLeft: "40px",
                              }}
                            >
                              {" "}
                              {singlePatient?.company.name}
                            </span>
                          </p>
                          <p>
                            EMPLOYEE NUMBER:{" "}
                            <span className="fw-600">
                              {singlePatient?.employee_code
                                ? "N/A"
                                : singlePatient?.employee_code}
                            </span>
                          </p>
                          <p>
                            {" "}
                            <span className="btn btn-sm btn-primary-light me-4">
                              {singlePatient?.date_of_birth}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {JSON.stringify(singlePatient)}
    </>
  );
};

export default PatientDetailedPage;

// Patient Profile {JSON.stringify(singlePatient)}
