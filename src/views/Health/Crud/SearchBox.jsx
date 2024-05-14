import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patientsActions } from "../../../store/patients";

const SearchBox = ({ clearSelected }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const patients = useSelector((state) => state.patient.patients) || [];
  const sp = useSelector((state) => state.patient.selectedPatient) || {};

  const initialValues = {
    searchQuery: "",
  };

  const validationSchema = yup.object().shape({});

  const onSubmit = async (values) => {
    setSearchQuery(values.searchQuery);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.national_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const setPatientId = (patientId) => {
    console.log(patientId);
    const patient = filteredPatients.find(
      (patient) => patient.id === parseInt(patientId)
    );
    dispatch(
      patientsActions.setSelectedPatient({
        selectedPatient: patient,
      })
    );
    console.log(sp);
  };

  return (
    <div className="row">
      <div
        className="col-md-12 col-12"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="card">
          <div className="card-body">
            <h6
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              SEARCH MEMBER BY NAME / EMPLOYEE NUMBER / NATIONAL ID
            </h6>
            <div className="space"></div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({
                values,
                isSubmitting,
                handleSubmit,
                touched,
                errors,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className={`form-control ${
                            touched.searchQuery && errors.searchQuery
                              ? "error-input"
                              : ""
                          }`}
                          id="searchQuery"
                          name="searchQuery"
                          value={values.searchQuery}
                          onChange={(e) => {
                            setFieldValue("searchQuery", e.target.value);
                            setSearchQuery(e.target.value);
                          }}
                        />
                        <label htmlFor="searchQuery">SEARCH MEMBER</label>
                        <ErrorMessage
                          name="searchQuery"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          borderRadius: "10px",
                        }}
                      >
                        {" "}
                        <i
                          className="ti-search"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>{" "}
                        SEARCH
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="space"></div>
        <div
          className="box"
          style={{
            minHeight: "100vh",
          }}
        >
          <div className="box-body">
            {/* {JSON.stringify(patients)} */}
            <div className="row">
              <div className="table-responsive">
                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr
                          className="hover-primary"
                          style={{
                            cursor: "pointer",
                          }}
                          key={patient.id}
                          onClick={() => setPatientId(patient.id)}
                        >
                          <td>{patient?.first_name}</td>
                          <td>{patient?.last_name}</td>
                          <td>
                            <span
                              className={`badge badge-pill ${
                                patient?.patient_type === "EMPLOYEE"
                                  ? "badge-info"
                                  : "badge-warning"
                              }`}
                            >
                              {patient?.patient_type}
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-pill badge-success">
                              {patient?.gender}
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
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
