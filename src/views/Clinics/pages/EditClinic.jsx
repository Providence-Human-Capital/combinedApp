import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading.jsx/Loading";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

const EditClinic = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);
  const clinics = useSelector((state) => state.clinic.clinics);

  const [clinic, setClinic] = useState({});
  const { clinicId } = useParams();

  useEffect(() => {
    const filteredClinic = clinics.filter(
      (clinic) => clinic.id === parseInt(clinicId)
    );
    console.log("Clinic", filteredClinic[0]);
    setClinic(filteredClinic[0]);

    if (redirectBack) {
      navigate("/clinics");
    } else {
      return;
    }
  }, [clinicId, redirectBack]);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter the name of the clinic"),
    address: yup.string().required("Whats the address of the clinic"),
    location: yup.string().required("Where is the clinic located?"),
    contact_number: yup
      .string()
      .required("Please enter the clinic contact number"),
  });

  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("Values", values);
    try {
      const response = await fetch(`${API}/clinic/update/${clinicId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Response Data", data);
      resetForm();
      setRedirectBack(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <BreadCrumb title={"Edit Clinic"} activeTab={"Clinic"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="card">
              <div className="custom-form">
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
                    enableReinitialize={true}
                    initialValues={{
                      name: clinic.name,
                      address: clinic.address,
                      location: clinic.location,
                      contact_number: clinic.contact_number,
                    }}
                    onSubmit={handleUpdateSubmit}
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
                          {loading ? (
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

export default EditClinic;
