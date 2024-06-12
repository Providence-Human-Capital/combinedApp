import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API } from "../../../../config";
import useEmployee from "../hooks/useEmployee";
import BreadCrumb from "../../../components/BreadCrumb";
import Loading from "../../../components/Loading.jsx/Loading";
import AreaOfExpertiseSelect from "../components/AreaOfExpertiseSelect";
import UploadEmployeeCV from "../components/UploadEmployeeCv";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import UpdateAreasOfExpertise from "../components/UpdateAreasOfExpertise";

const validationSchema = Yup.object({
  first_name: Yup.string().nullable(),
  last_name: Yup.string().nullable(),
  national_id: Yup.string().nullable(),
  email: Yup.string().email("Invalid email address").nullable(),
  date_of_birth: Yup.date().nullable(),
  nationality: Yup.string().nullable(),
  gender: Yup.string().nullable(),
  address: Yup.string().nullable(),
  phone_number: Yup.string().nullable(),
  marital_status: Yup.string().nullable(),
  area_of_expertise: Yup.string().nullable(),
  education_level: Yup.string().nullable(),
  work_experience: Yup.string().nullable(),
  status: Yup.string().nullable(),
});

const initialValues = {
  first_name: "",
  last_name: "",
  national_id: "",
  email: "",
  date_of_birth: "",
  nationality: "",
  gender: "",
  address: "",
  phone_number: "",
  marital_status: "",
  area_of_expertise: "",
  education_level: "",
  work_experience: "",
  status: "",
};
const EmployeeUpdate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const {
    data: employee,
    error,
    isLoading,
  } = useEmployee(parseInt(employeeId));
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (employee) {
      setFormValues({ ...initialValues, ...employee });
    }
  }, [employee]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API}/api/employee/update/${parseInt(employeeId)}`,
        {
          method: "PATCH", // or "POST" depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (error) {
        data = {};
      }

      if (response.ok) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee information updated successfully!",
          timer: 4000,
          confirmButtonColor: "#007a41",
        });
        // alert("Employee information updated successfully!");
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to update employee information: ${
            data.message || "No response message"
          }`,
          timer: 4000,
          confirmButtonColor: "#e60000",
        });
        // alert(`Failed to update employee information: ${data.message || 'No response message'}`);
      }
    } catch (error) {
      console.error("Error updating employee information:", error);
      alert("An error occurred while updating employee information.");
    } finally {
      setSubmitting(false);
      setLoading(false);
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
        title={"Update Employee Information"}
        activeTab={"Employee"}
      />
      <section className="content">
        <div className="row">
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="card p-4 mt-5">
                  <div className="row g-3">
                    <div className="col-12 mb-4">
                      <h3
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        UPDATE{" "}
                        <span
                          style={{
                            fontSize: "24px",
                            color: "#58AB46",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                          }}
                        >
                          {formValues.first_name} {formValues.last_name}{" "}
                        </span>{" "}
                        INFORMATION
                      </h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                        />
                        <label htmlFor="first_name">FIRST NAME</label>
                        <ErrorMessage name="first_name" component="div" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                        />
                        <label htmlFor="last_name">LAST NAME</label>
                        <ErrorMessage name="last_name" component="div" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="national_id"
                          name="national_id"
                        />
                        <label htmlFor="national_id">NATIONAL ID</label>
                        <ErrorMessage name="national_id" component="div" />
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                        />
                        <label htmlFor="email">EMAIL</label>
                        <ErrorMessage name="email" component="div" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="date"
                          className="form-control"
                          id="date_of_birth"
                          name="date_of_birth"
                        />
                        <label htmlFor="date_of_birth">DATE OF BIRTH</label>
                        <ErrorMessage name="date_of_birth" component="div" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className={`form-select `}
                          id="nationality"
                          name="nationality"
                        >
                          <option>SELECT NATIONALITY</option>
                          <option value="ZIMBABWEAN">ZIMBABWEAN</option>
                          <option value="NAMIBIAN">NAMIBIAN</option>
                          <option value="SOUTH AFRICAN">SOUTH AFRICAN</option>
                          <option value="BOTSWANIAN">BOTSWANIAN</option>
                          <option value="ZAMBIAN">ZAMBIAN</option>
                          <option value="MOZAMBICAN">MOZAMBICAN</option>
                        </Field>
                        <label
                          htmlFor="nationality"
                          style={{
                            color: "#2C4894",
                            fontWeight: "bold",
                          }}
                        >
                          NATIONALITY
                        </label>
                        <ErrorMessage
                          name="nationality"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    {/* <AreaOfExpertiseSelect /> */}
                    <div className="col-lg-3 col-md-12">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className={`form-select`}
                          id="gender"
                          name="gender"
                        >
                          <option valuue="">SELECT GENDER</option>
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
                        </Field>
                        <label
                          htmlFor="gender"
                          style={{
                            color: "#2C4894",
                            fontWeight: "bold",
                          }}
                        >
                          GENDER
                        </label>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                        />
                        <label htmlFor="address">ADDRESS</label>
                        <ErrorMessage name="address" component="div" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="phone_number"
                          name="phone_number"
                        />
                        <label htmlFor="phone_number">PHONE NUMBER</label>
                        <ErrorMessage name="phone_number" component="div" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className="form-select"
                          id="marital_status"
                          name="marital_status"
                        >
                          <option value="" label="Select marital status" />
                          <option value="SINGLE" label="Single" />
                          <option value="MARRIED" label="Married" />
                          <option value="DIVORCED" label="Divorced" />
                          <option value="WIDOWED" label="Widowed" />
                        </Field>
                        <label htmlFor="marital_status">MARITAL STATUS</label>
                        <ErrorMessage name="marital_status" component="div" />
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>

                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="area_of_expertise"
                          name="area_of_expertise"
                        />
                        <label htmlFor="area_of_expertise">
                          AREA(S) OF EXPERTISE
                        </label>
                        <ErrorMessage
                          name="area_of_expertise"
                          component="div"
                        />
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className={`form-select`}
                          id="education_level"
                          name="education_level"
                        >
                          <option></option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="ZJC">
                            Zimbabwe Junior Certificate (ZJC)
                          </option>
                          <option value="Ordinary Level">
                            Ordinary Level (O Level)
                          </option>
                          <option value="Advanced Level">
                            Advanced Level (A Level)
                          </option>
                          <option value="National Certificate">
                            National Certificate (NC)
                          </option>
                          <option value="National Diploma">
                            National Diploma (ND)
                          </option>
                          <option value="Higher National Diploma">
                            Higher National Diploma (HND)
                          </option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Diploma">Diploma</option>
                          <option value="Master's Degree">
                            Master's Degree
                          </option>
                          <option value="Doctoral Degree">PhD</option>
                          <option value="Professional Certifications">
                            Professional Certifications
                          </option>
                        </Field>
                        <label
                          htmlFor="education_level"
                          style={{
                            color: "#2C4894",
                            fontWeight: "bold",
                          }}
                        >
                          SELECT YOUR EDUCATION LEVEL
                        </label>
                        <ErrorMessage
                          name="education_level"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>
                  <div className="row">
                    <div className="col-lg-8 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="work_experience"
                          name="work_experience"
                        />
                        <label htmlFor="work_experience">WORK EXPERIENCE</label>
                        <ErrorMessage name="work_experience" component="div" />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className="form-select"
                          id="status"
                          name="status"
                        >
                          <option value="" label="Select status" />
                          <option value="New" label="NEW" />
                          <option value="Pending" label="PENDING" />
                          <option value="Inactive" label="INACTIVE" />
                          <option value="Terminated" label="TERMINATED" />
                          <option value="Deployed" label="DEPLOYED" />
                        </Field>
                        <label htmlFor="status">STATUS</label>
                        <ErrorMessage name="status" component="div" />
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>

                  <div className="space"></div>
                  {loading ? (
                    <Loading />
                  ) : (
                    <button
                      className="btn btn-info"
                      style={{ width: "fit-content", fontWeight: 400, textTransform: "uppercase" }}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <i class="fa fa-upload" aria-hidden="true"></i> {"  "}
                      Update Employee Information
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="box">
              <div className="box-body">
                <div className="row">
                  <div className="col-12">
                    <UploadEmployeeCV employeeId={employeeId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box">
              <div className="box-body">
                <div className="row">
                  <div className="col-12">
                    <UpdateAreasOfExpertise employeeId={employeeId} specializations={formValues.area_of_expertise} />
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

export default EmployeeUpdate;
