import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../../config";
import BreadCrumb from "../../../components/BreadCrumb";
import Loading from "../../../components/Loading.jsx/Loading";
import Select from "react-select";
import SearchBox from "./SearchBox";
import MedicalRecordForm from "./MedicalRecordForm";
import { patientsActions } from "../../../store/patients";
import Swal from "sweetalert2";
import { getAllPatients } from "../../../services/api";
import AddPatientForm from "./AddPatientForm";

const AddStatsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addMedicalRecord, setAddMedicalRecord] = useState(false);
  const selectedPatient = useSelector((state) => state.patient.selectedPatient);
  const [addingNewPatient, setAddingNewPatient] = useState(false);
  const [keepOldMember, setKeepOldMember] = useState(true);
  const [enableEdit, setEnableEdit] = useState(false);

  const patients = useSelector((state) => state.patient.patients) || [];
  const companies = useSelector((state) =>
    state.company.companies.map((comp) => ({
      value: comp.id,
      label: `${comp.name}`,
    }))
  );

  const handleEnableEdit = () => {
    setEnableEdit(!enableEdit);
  };
  const handleAddMedicalRecord = () => {
    setAddMedicalRecord(!addMedicalRecord);
  };



  const initialValues = {
    date_of_birth: selectedPatient ? selectedPatient.date_of_birth : "",
    employee_code: selectedPatient ? selectedPatient.employee_code : "",
    national_id: selectedPatient ? selectedPatient.national_id : "",
    first_name: selectedPatient ? selectedPatient.first_name : "",
    last_name: selectedPatient ? selectedPatient.last_name : "",
    gender: selectedPatient ? selectedPatient.gender : "",
    company: selectedPatient ? selectedPatient.company : "",
    patient_type: selectedPatient ? selectedPatient.patient_type : "",
  };

  const validationSchema = yup.object().shape({
    employee_code: yup.string().required("Employee code is required"),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    national_id: yup.string().required("National is required"),
    company: yup.string().required("Company is required"),
    patient_type: yup.string().required("Patient type is required"),
  });

  const onSubmit = async (values) => {
    values.employee_code = values.employee_code.toUpperCase();
    values.first_name = values.first_name.toUpperCase();
    values.last_name = values.last_name.toUpperCase();
    values.company_id = values.company;
    values.nationa_id = values.national_id;
    try {
      const response = await fetch(`${API}/api/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "New Patient Successfully Registered",
          timer: 4000,
          confirmButtonColor: "#007a41",
        });

        const patients = await getAllPatients();
        console.log(patients);
        dispatch(
          patientsActions.setPatients({
            patients: patients,
          })
        );
      }

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Handle success
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }

    console.log("values", values);
  };

  const triggerAddNewPatient = async () => {
    setKeepOldMember(false);
    setAddingNewPatient(true);
  };

  useEffect(() => {
    if (!addingNewPatient) {
      const initialValue = patients[0];
      dispatch(
        patientsActions.setSelectedPatient({
          selectedPatient: initialValue,
        })
      );
    }
  }, [addingNewPatient]);

  const cancelAddNewPatient = async () => {
    setAddingNewPatient(false);
    setKeepOldMember(true);
  };
  return (
    <>
      <BreadCrumb title={"NEW STATS FORM"} activeTab={"NEW STATS"} />
      <section className="content">
        <div className="row">
          <div className="row">
            <div className="col-xl-4 col-12">
              <SearchBox clearSelected={addingNewPatient} />
            </div>
            <div className="col-xl-8 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    {!addingNewPatient ? (
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          margin: 0,
                        }}
                      >
                        ENTER MEMBER DETAILS
                      </h4>
                    ) : (
                      <h4
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          margin: 0,
                        }}
                      >
                        CREATE NEW PATIENT
                      </h4>
                    )}

                    <button type="submit" className="btn btn-primary">
                      ADD USING CSV
                    </button>
                  </div>
                  <div className="space"></div>
                  {!addingNewPatient ? (
                    <Formik
                      enableReinitialize={true}
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
                        <Form>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.employee_code &&
                                    errors.employee_code
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="employee_code"
                                  name="employee_code"
                                  disabled={!enableEdit}
                                />
                                <label htmlFor="employee_code">
                                  EMPLOYEE CODE
                                </label>
                                <ErrorMessage
                                  name="employee_code"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.first_name && errors.first_name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="first_name"
                                  name="first_name"
                                  disabled={!enableEdit}
                                />
                                <label htmlFor="first_name">FIRST NAME</label>
                                <ErrorMessage
                                  name="first_name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.last_name && errors.last_name
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="last_name"
                                  name="last_name"
                                  disabled={!enableEdit}
                                />
                                <label htmlFor="last_name"> LAST NAME</label>
                                <ErrorMessage
                                  name="last_name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space"></div>
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.national_id && errors.national_id
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="national_id"
                                  name="national_id"
                                  disabled={!enableEdit}
                                />
                                <label htmlFor="national_id">
                                  {" "}
                                  NATIONAL ID
                                </label>
                                <ErrorMessage
                                  name="national_id"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.gender && errors.gender
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="gender"
                                  name="gender"
                                  disabled={!enableEdit}
                                >
                                  <option value=""></option>
                                  <option value="MALE">MALE</option>
                                  <option value="FEMALE">FEMALE</option>
                                </Field>
                                <label htmlFor="gender">GENDER</label>
                                <ErrorMessage
                                  name="gender"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-floating">
                                <Field
                                  type="date"
                                  className={`form-control ${
                                    touched.date_of_birth &&
                                    errors.date_of_birth
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="date_of_birth"
                                  name="date_of_birth"
                                  disabled={!enableEdit}
                                />
                                <label htmlFor="date_of_birth">
                                  DATE OF BIRTH
                                </label>
                                <ErrorMessage
                                  name="date_of_birth"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.patient_type && errors.patient_type
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="patient_type"
                                  name="patient_type"
                                  disabled={!enableEdit}
                                >
                                  <option value=""></option>
                                  <option value="EMPLOYEE">EMPLOYEE</option>
                                  <option value="DEPENDENT">DEPENDENT</option>
                                  <option value="CONTRACTOR">CONTRACTOR</option>
                                  <option value="TRAINEE">TRAINEE</option>
                                </Field>
                                <label htmlFor="patient_type">
                                  PATIENT TYPE
                                </label>
                                <ErrorMessage
                                  name="patient_type"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space"></div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="company">COMPANY</label>
                                <Select
                                  options={companies}
                                  name="company"
                                  styles={{
                                    control: (baseStyles) => ({
                                      ...baseStyles,
                                      height: "55px",
                                    }),
                                  }}
                                  onChange={(selectedOption) =>
                                    setFieldValue(
                                      "company",
                                      selectedOption.value
                                    )
                                  }
                                  onBlur={() =>
                                    setFieldTouched("company", true)
                                  }
                                  disabled={!enableEdit}
                                ></Select>

                                <ErrorMessage
                                  name="company"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space"></div>

                          <div className="border-bottom"></div>
                          <div className="space"></div>
                          <div className="card-body">
                            <div className="row">
                              <div className="d-md-flex align-items-center justify-content-between mb-20">
                                <div className="d-flex">
                                  {enableEdit ? (
                                    <>
                                      <button
                                        className="btn btn-primary m-2"
                                        style={{
                                          borderRadius: "7px",
                                        }}
                                        type="submit"
                                      >
                                        <i
                                          className="ti-check"
                                          style={{
                                            marginRight: "10px",
                                          }}
                                        ></i>
                                        {"  "}SAVE EDIT MEMBER
                                      </button>
                                      <a
                                        className="btn btn-warning m-2"
                                        style={{
                                          borderRadius: "7px",
                                        }}
                                        onClick={() => handleEnableEdit()}
                                      >
                                        <i
                                          className="ti-na"
                                          style={{
                                            marginRight: "10px",
                                          }}
                                        ></i>
                                        {"  "}CANCEL EDIT MEMBER
                                      </a>
                                    </>
                                  ) : (
                                    <>
                                      <a
                                        className="btn btn-success m-2"
                                        style={{
                                          borderRadius: "7px",
                                        }}
                                        onClick={() => triggerAddNewPatient()}
                                      >
                                        <i
                                          className="ti-check"
                                          style={{
                                            marginRight: "10px",
                                          }}
                                        ></i>
                                        {"  "}ADD NEW MEMBER
                                      </a>
                                      {selectedPatient && (
                                        <Link
                                          to={`/patient/profile/${selectedPatient?.id}`}
                                        >
                                          <button
                                            className="btn btn-secondary m-2"
                                            style={{
                                              borderRadius: "7px",
                                            }}
                                          >
                                            <i
                                              className="ti-info"
                                              style={{
                                                marginRight: "10px",
                                              }}
                                            ></i>
                                            {"  "} VIEW PATIENT
                                          </button>
                                        </Link>
                                      )}

                                      <a
                                        className="btn btn-primary m-2"
                                        style={{
                                          borderRadius: "7px",
                                        }}
                                        onClick={() => handleEnableEdit()}
                                      >
                                        <i
                                          className="ti-pencil-alt2"
                                          style={{
                                            marginRight: "10px",
                                          }}
                                        ></i>
                                        {"  "}ENABLE EDIT MEMBER
                                      </a>

                                      <a
                                        className="btn btn-warning m-2"
                                        style={{
                                          borderRadius: "7px",
                                        }}
                                        onClick={() => handleAddMedicalRecord()}
                                      >
                                        <i
                                          className="ti-support"
                                          style={{
                                            marginRight: "10px",
                                          }}
                                        ></i>
                                        ADD MEDICAL RECORD
                                      </a>
                                      <a
                                        className="btn btn-danger m-2"
                                        style={{
                                          borderRadius: "7px",
                                        }}
                                      >
                                        <i
                                          className="ti-trash"
                                          style={{
                                            marginRight: "10px",
                                          }}
                                        ></i>
                                        DELETE MEMBER
                                      </a>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <AddPatientForm cancelAddNewPatient={cancelAddNewPatient}  />
                  )}

                  {addMedicalRecord && (
                    <MedicalRecordForm
                      closeAddMedicalRecord={handleAddMedicalRecord}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddStatsForm;
