import React, { Fragment, useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading.jsx/Loading";
import { API } from "../../../../config";
import { getAllCompanies } from "../../../services/api";
import { companyActions } from "../../../store/company";

const AddCompany = () => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    company_code: "",
    address: "",
    site_telephone: "",
    company_email: "",
    contact_person: "",
    province: "",
    designation: "",
    contact_number: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Company name is required"),
    company_code: yup.string(),
    address: yup.string().required("Address is required"),
    site_telephone: yup.string().required("Site telephone is required"),
    company_email: yup
      .string()
      .email("Invalid email")
      .required("Company email is required"),
    contact_person: yup.string().required("Contact person is required"),
    province: yup.string().required("Province is required"),
    designation: yup.string().required("Designation is required"),
    contact_number: yup.string().required("Contact number is required"),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    formData.name = formData.name.toUpperCase();
    formData.company_code = formData.company_code.toUpperCase();
    formData.contact_person = formData.contact_person.toUpperCase();
    formData.designation = formData.designation.toUpperCase();
    setLoading(true);
    console.log("FormData", formData);
    try {
      const response = await fetch(`${API}/api/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      console.log(data);
    //   if (response.statusCode === 200 || response.statusCode === 201) {
    //   }
      resetForm();
      setRedirectBack(true);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New Company successfully Added",
        timer: 4000,
        confirmButtonColor: "#007a41",
      });
      const companies = await getAllCompanies();
      dispatch(
        companyActions.setCompanies({
          companies: companies,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (redirectBack) {
      navigate("/companies");
    } else {
      return;
    }
  }, [redirectBack]);

  return (
    <>
      <BreadCrumb title={"Add Companies"} activeTab={"Add Companies"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="card">
              <div className="custom-form">
                <div className="box-body">
                  <div className="">
                    <h5
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Enter New Company
                    </h5>

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
                                <label htmlFor="name">COMPANY NAME</label>

                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  id="company_code"
                                  name="company_code"
                                  className={`form-control ${
                                    touched.company_code && errors.company_code
                                      ? "error-input"
                                      : ""
                                  }`}
                                />
                                <label htmlFor="company_code">
                                  COMPANY CODE
                                </label>

                                <ErrorMessage
                                  name="company_code"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4 mt-2">
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
                                <label htmlFor="address">ADDRESS</label>
                                <ErrorMessage
                                  name="address"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.site_telephone &&
                                    errors.site_telephone
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="site_telephone"
                                  name="site_telephone"
                                />
                                <label htmlFor="site_telephone">
                                  SITE TELEPHONE
                                </label>
                                <ErrorMessage
                                  name="site_telephone"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-floating">
                                <Field
                                  type="email"
                                  className={`form-control ${
                                    touched.company_email &&
                                    errors.company_email
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="company_email"
                                  name="company_email"
                                />
                                <label htmlFor="company_email">
                                  COMPANY EMAIL
                                </label>

                                <ErrorMessage
                                  name="company_email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control ${
                                    touched.designation && errors.designation
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="designation"
                                  name="designation"
                                />
                                <label htmlFor="designation">DESIGNATION</label>

                                <ErrorMessage
                                  name="designation"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  className={`form-control  ${
                                    touched.contact_person &&
                                    errors.contact_person
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="contact_person"
                                  name="contact_person"
                                />
                                <label htmlFor="contact_person">
                                  CONTACT PERSON
                                </label>
                                <ErrorMessage
                                  name="contact_person"
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
                                    touched.contact_number &&
                                    errors.contact_number
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="contact_number"
                                  name="contact_number"
                                />
                                <label htmlFor="contact_number">
                                  CONTACT NUMBER
                                </label>
                                <ErrorMessage
                                  name="contact_number"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  className={`form-select ${
                                    touched.province && errors.province
                                      ? "error-input"
                                      : ""
                                  }`}
                                  id="province"
                                  name="province"
                                >
                                  <option value="Choose province">
                                    Choose province
                                  </option>
                                  <option value="Harare">Harare</option>
                                  <option value="Bulawayo">Bulawayo</option>
                                  <option value="Manicaland">Manicaland</option>
                                  <option value="Mashonaland Central">
                                    Mashonaland Central
                                  </option>
                                  <option value="Mashonaland East">
                                    Mashonaland East
                                  </option>
                                  <option value="Mashonaland West">
                                    Mashonaland West
                                  </option>
                                  <option value="Masvingo">Masvingo</option>
                                  <option value="Matebeleland North">
                                    Matebeleland North
                                  </option>
                                  <option value="Matebeleland South">
                                    Matebeleland South
                                  </option>
                                </Field>
                                <label htmlFor="province">PROVIDENCE</label>

                                <ErrorMessage
                                  name="province"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="separation-div"></div>
                          {loading ? (
                            <Loading />
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{
                                textTransform: "uppercase",
                              }}
                              disabled={isSubmitting}
                              onClick={handleSubmit}
                            >
                              Save Company
                            </button>
                          )}
                        </Form>
                      )}
                    </Formik>
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

export default AddCompany;
