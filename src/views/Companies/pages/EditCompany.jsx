import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";
import { getAllCompanies } from "../../../services/api";
import { companyActions } from "../../../store/company";
import Swal from "sweetalert2";

const EditCompany = ({}) => {
  const [loading, setLoading] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);
  const navigate = useNavigate();
  const { companyId } = useParams();
  const companies = useSelector((state) => state.company.companies) || [];
  const [company, setCompany] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredCompany = companies.find(
      (company) => company.id === parseInt(companyId)
    );
    if (filteredCompany) {
      setCompany(filteredCompany);
    }
  }, [companies, companyId]);

  useEffect(() => {
    if (redirectBack) {
      navigate("/companies");
    }
  }, [redirectBack, navigate]);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Company name is required"),
    company_code: yup.string().required("Company code is required"),
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

  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    console.log("Values", values);

    try {
      const response = await fetch(`${API}/api/company/update/${companyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Response Data", data);

      resetForm();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Company  Update Success",
          timer: 2000,
          confirmButtonColor: "#007a41",
        });
        setRedirectBack(true);
      }

      const comp = await getAllCompanies();
      dispatch(
        companyActions.setCompanies({
          companies: comp,
        })
      );
    } catch (error) {
      console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save information!",
          timer: 3000,
          confirmButtonColor: "#e60000",
        });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <BreadCrumb title={"Edit Companies"} activeTab={"Edit Companies"} />
      <section className="content">
        <div className="row">
          <div className="col-xl-12 col-12">
            <div className="box">
              <div className="custom-form">
                <div className="box-body">
                  <div className="">
                    <h4
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Edit Company Details
                    </h4>
                    {company && (
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          name: company.name,
                          company_code: company.company_code,
                          address: company.address,
                          site_telephone: company.site_telephone,
                          company_email: company.company_email,
                          contact_person: company.contact_person,
                          province: company.province,
                          designation: company.designation,
                          contact_number: company.contact_number,
                        }}
                        onSubmit={handleUpdateSubmit}
                        validationSchema={validationSchema}
                      >
                        {({ values, isSubmitting, handleSubmit }) => (
                          <Form>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-floating ">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                  />
                                  <label htmlFor="name">Company Name</label>
                                  <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-floating ">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="company_code"
                                    name="company_code"
                                  />
                                  <label htmlFor="company_code">
                                    Company Code
                                  </label>
                                  <ErrorMessage
                                    name="company_code"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-floating">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                  />
                                  <label htmlFor="address">Address</label>
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
                                    className="form-control"
                                    id="site_telephone"
                                    name="site_telephone"
                                  />
                                  <label htmlFor="site_telephone">
                                    Site Telephone
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
                                    className="form-control"
                                    id="company_email"
                                    name="company_email"
                                  />
                                  <label htmlFor="company_email">
                                    Company Email
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
                                    className="form-control"
                                    id="designation"
                                    name="designation"
                                  />
                                  <label htmlFor="designation">
                                    Designation
                                  </label>
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
                                    className="form-control"
                                    id="contact_person"
                                    name="contact_person"
                                  />
                                  <label htmlFor="contact_person">
                                    Contact Person
                                  </label>
                                  <ErrorMessage
                                    name="contact_person"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>

                              <div className="col-md-4">
                                <div className="form-floating ">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    id="contact_number"
                                    name="contact_number"
                                  />
                                  <label htmlFor="contact_number">
                                    Contact Number
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
                              <div className="col-md-4">
                                <div className="form-floating">
                                  <Field
                                    as="select"
                                    className="form-select"
                                    id="province"
                                    name="province"
                                  >
                                    <option value="Choose province"></option>
                                    <option value="Harare">Harare</option>
                                    <option value="Bulawayo">Bulawayo</option>
                                    <option value="Manicaland">
                                      Manicaland
                                    </option>
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
                                  <label htmlFor="province">Province</label>

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
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                style={{
                                  textTransform: "uppercase",
                                }}
                              >
                                Update Company
                              </button>
                            )}
                          </Form>
                        )}
                      </Formik>
                    )}
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

export default EditCompany;
