import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";
import { getAllHealthFacilities } from "../../../services/api";
import { clinicActions } from "../../../store/clinic";

const AddClinic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    address: "",
    location: "",
    contact_number: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter the name of the clinic"),
    address: yup.string().required("Whats the address of the clinic"),
    location: yup.string().required("Where is the clinic located?"),
    contact_number: yup
      .string()
      .required("Please enter the clinic contact number"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    values.name = values.name.toUpperCase();
    values.address = values.address.toUpperCase();
    values.location = values.location.toUpperCase();

    try {
      const response = await fetch(`${API}/api/clinic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to register new clinic");
      }

    

      const responseData = await response.json();
      const clinics = await getAllHealthFacilities();

      dispatch(
        clinicActions.setClinics({
          clinics: clinics,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New Clinic Successfully Registered",
        timer: 4000,
        confirmButtonColor: "#007a41",
      });

      navigate("/clinics");
      resetForm();
    } catch (error) {
      console.error("Error registering new clinic:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to register new clinic",
        timer: 4000,
        confirmButtonColor: "#e60000",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BreadCrumb title={"Add Clinics"} activeTab={"Clinics"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="card">
              <div className="custom-form-">
                <div className="box-body">
                  <h3
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    REGISTER A NEW CLINIC
                  </h3>
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
                    }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="name"
                                name="name"
                                className={`form-control ${
                                  touched.name && errors.name
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label htmlFor="name">CLINIC NAME</label>

                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="address"
                                name="address"
                                className={`form-control ${
                                  touched.address && errors.address
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label htmlFor="address">CLINIC ADDRESS</label>

                              <ErrorMessage
                                name="address"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="location"
                                name="location"
                                className={`form-control ${
                                  touched.location && errors.location
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label htmlFor="name">CLINIC LOCATION</label>

                              <ErrorMessage
                                name="location"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="contact_number"
                                name="contact_number"
                                className={`form-control ${
                                  touched.contact_number &&
                                  errors.contact_number
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label htmlFor="name">CLINIC CONTACT</label>

                              <ErrorMessage
                                name="contact_number"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="space"></div>
                          <div className="space"></div>
                          {isLoading ? (
                            <Loading />
                          ) : (
                            <button
                              className="btn btn-primary"
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                width: "fit-content",
                              }}
                            >
                              SAVE NEW CLINIC
                            </button>
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddClinic;
