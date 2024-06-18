import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BreadCrumb from "../../../components/BreadCrumb";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";
import "react-datepicker/dist/react-datepicker.css";
import AreaOfExpertiseSelect from "../components/AreaOfExpertiseSelect";

const CustomDatePicker = ({ field, form, ...props }) => {
  const handleChange = (date) => {
    form.setFieldValue(field.name, date);
  };

  return (
    <DatePicker
      {...field}
      {...props}
      selected={field.value}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      showYearDropdown
      scrollableYearDropdown
      className="custom-date-picker"
    />
  );
};

const NewEmployeeDataForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const targetRef = useRef();

  const initialValues = {
    first_name: "",
    last_name: "",
    national_id: "",
    date_of_birth: null,
    nationality: "",
    marital_status: "",
    address: "",
    phone_number: "",
    gender: "",
    email: "",
    bank_name: "",
    account_number: "",
    education_level: "",
    work_experience: "",
    area_of_expertise: "",
    occupation: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("Please Enter First Name"),
    last_name: Yup.string().required("Please Enter Last Name"),
    national_id: Yup.string().required("Nation ID Number Is Required"),
    date_of_birth: Yup.date().required("Enter Your Date Of Birth").nullable(),
    nationality: Yup.string().required("Nationality Is Required"),
    marital_status: Yup.string().required("Select Your Marital Status"),
    address: Yup.string().required("Residential Address is Required"),
    phone_number: Yup.string().required("Enter Your Phone number"),
    email: Yup.string(),
    gender: Yup.string().required("Please Select Your Gender"),
    bank_name: Yup.string().nullable(),
    account_number: Yup.string().nullable(),
    education_level: Yup.string().required(
      "Please Select Your Education Level"
    ),
    occupation: Yup.string().nullable(),
    area_of_expertise: Yup.string().nullable(),
    work_experience: Yup.string().nullable(),
    file: Yup.mixed().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);

    if (!file) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "File is required!",
        timer: 4000,
        confirmButtonColor: "#e60000",
      });
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "pdf") {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Your CV must be in PDF Format!",
        timer: 4000,
        confirmButtonColor: "#e60000",
      });
      return;
    }

    const date = new Date(values.date_of_birth);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if necessary
    const day = ("0" + date.getDate()).slice(-2); // Add leading zero if necessary
    const formattedDate = `${year}-${month}-${day}`;

    values.first_name = values.first_name.toUpperCase();
    values.last_name = values.last_name.toUpperCase();
    values.national_id = values.national_id.toUpperCase();
    values.address = values.address.toUpperCase();
    values.bank_name = values.bank_name.toUpperCase();
    values.date_of_birth = formattedDate;

    console.log("Values", values);
    console.log(file);

    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      formData.append("file", file);

      const response = await fetch(`${API}/api/employee`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to register new employee");
      }

      setIsLoading(false);
      resetForm();
      setFile(null); // Clear the file state
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Information Successfully Saved",
        timer: 4000,
        confirmButtonColor: "#007a41",
      });
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save information!",
        timer: 4000,
        confirmButtonColor: "#e60000",
      });
    }
  };

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
  });

  return (
    <div className="containerxxl">
      <section className="content" style={{ marginTop: "5rem" }}>
        <div ref={targetRef} style={{ display: "none" }}>
          <h1>Hello Hello</h1>
        </div>
        <div className="" style={{ marginBottom: "4rem" }}>
          <div className="row">
            <div
              className="col-md-4 col-12"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <div
                className=""
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <img
                  src="https://providence-human-capital.github.io/images/resune.png"
                  alt="logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="col-md-8 col-12">
              <div className="box">
                <div className="box-header">
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "35px",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      style={{
                        color: "#0E9645",

                        fontWeight: "bold",
                      }}
                    >
                      Providence Human Capital
                    </span>{" "}
                    <br />
                  </h3>

                  <h4>
                    <span
                      style={{
                        color: "#2C4894",
                        fontFamily: "Playwrite NO, cursive",
                      }}
                    >
                      Staffing Solutions
                    </span>
                  </h4>
                </div>
                <div className="box-body">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
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
                          <div className="col-md-4 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="first_name"
                                name="first_name"
                                className={`form-control ${
                                  touched.first_name && errors.first_name
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label
                                htmlFor="first_name"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                FIRST NAME
                              </label>
                              <ErrorMessage
                                name="first_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="last_name"
                                name="last_name"
                                className={`form-control ${
                                  touched.last_name && errors.last_name
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label
                                htmlFor="last_name"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                LAST NAME
                              </label>
                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-12 mb-4">
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
                          <div className="col-md-4 col-12 mb-4">
                            <p
                              style={{
                                color: "#2C4894",
                              }}
                            >
                              <span
                                style={{
                                  paddingRight: "10px",
                                  color: "#0E9645",
                                  fontWeight: "bold",
                                }}
                              >
                                NB:
                              </span>
                              Please make sure that the date of birth format is
                              in this format <br />
                              (YYYY-MM-DD) for example 2003-04-23
                            </p>
                          </div>
                          <div className="col-md-6 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                name="date_of_birth"
                                component={CustomDatePicker}
                                className={`form-control ${
                                  touched.date_of_birth && errors.date_of_birth
                                    ? "error-input"
                                    : ""
                                }`}
                              />

                              <ErrorMessage
                                name="date_of_birth"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <label
                              htmlFor="date_of_birth"
                              style={{
                                fontWeight: "bold",
                                color: "#2C4894",
                              }}
                            >
                              DATE OF BIRTH
                            </label>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-4 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="national_id"
                                name="national_id"
                                className={`form-control ${
                                  touched.national_id && errors.national_id
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label
                                htmlFor="national_id"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                NATIONAL ID
                              </label>
                              <ErrorMessage
                                name="national_id"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                as="select"
                                className={`form-select ${
                                  touched.nationality && errors.nationality
                                    ? "error-input"
                                    : ""
                                }`}
                                id="nationality"
                                name="nationality"
                              >
                                <option>SELECT NATIONALITY</option>
                                <option value="ZIMBABWEAN">ZIMBABWEAN</option>
                                <option value="NAMIBIAN">NAMIBIAN</option>
                                <option value="SOUTH AFRICAN">
                                  SOUTH AFRICAN
                                </option>
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
                          <div className="col-md-4 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                as="select"
                                className={`form-select ${
                                  touched.marital_status &&
                                  errors.marital_status
                                    ? "error-input"
                                    : ""
                                }`}
                                id="marital_status"
                                name="marital_status"
                              >
                                <option>SELECT MARITAL STATUS</option>
                                <option value="SINGLE">SINGLE</option>
                                <option value="MARRIED">MARRIED</option>
                                <option value="DIVORCED">DIVORCED</option>
                                <option value="WIDOWED">WIDOWED</option>
                              </Field>
                              <label
                                htmlFor="marital_status"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                MARITAL STATUS
                              </label>
                              <ErrorMessage
                                name="marital_status"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-12 col-12 mb-4">
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
                              <label
                                htmlFor="address"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                ADDRESS
                              </label>
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
                          <div className="col-md-6 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                className={`form-control ${
                                  touched.phone_number && errors.phone_number
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label
                                htmlFor="phone_number"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                PHONE NUMBER
                              </label>
                              <ErrorMessage
                                name="phone_number"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                type="email"
                                id="email"
                                name="email"
                                className={`form-control ${
                                  touched.email && errors.email
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label
                                htmlFor="email"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                EMAIL
                              </label>
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: "2rem" }}>
                          <h6 style={{ fontWeight: "bold", color: "#2C4894" }}>
                            EDUCATION AND WORK HISTORY INFORMATION
                          </h6>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-4 col-12 mb-4">
                            <label
                              htmlFor="education_level"
                              style={{
                                color: "#2C4894",
                                fontWeight: "bold",
                              }}
                            >
                              SELECT YOUR EDUCATION LEVEL
                            </label>
                            <div className="form-floating">
                              <Field
                                as="select"
                                className={`form-select ${
                                  touched.education_level &&
                                  errors.education_level
                                    ? "error-input"
                                    : ""
                                }`}
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

                              <ErrorMessage
                                name="education_level"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <AreaOfExpertiseSelect />
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-12 col-12 mb-4">
                            <label
                              htmlFor="work_experience"
                              style={{
                                color: "#2C4894",
                                fontWeight: "bold",
                              }}
                            >
                              BRIEFLY DESCRIBE YOUR WORK EXPERIENCE
                              <span
                                style={{
                                  fontWeight: "normal",
                                  color: "#0E9645",
                                }}
                              >
                                {"  "}
                                (NB: If your area of expertise is not available
                                in the dropdown menu, please briefly describe it
                                below in the work experience section.)
                              </span>
                            </label>
                            <div className="form-floating">
                              <Field
                                as="textarea"
                                name="work_experience"
                                placeholder="Briefly describe your work experience or qualifications"
                                className="form-control"
                                style={{ minHeight: "150px", minWidth: "100%" }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-6 col-12 mb-4">
                            <div className="form-floating">
                              <div
                                {...getRootProps()}
                                className="dropzone"
                                style={{
                                  border: "2px dashed #2C4894",
                                  padding: "20px",
                                  textAlign: "center",
                                  color: "#2C4894",
                                }}
                              >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                  <p>Drop the Resume/CV here ...</p>
                                ) : (
                                  <p>
                                    Drag & drop a CV here, or click to select a
                                    CV (PDF or Word document)
                                  </p>
                                )}
                              </div>
                              {file && (
                                <div style={{ marginTop: "10px" }}>
                                  <strong>Selected CV:</strong> {file.name}
                                </div>
                              )}
                              <ErrorMessage
                                name="file"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div>
                          {isLoading ? (
                            <Loading />
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{
                                color: "#fff",
                                backgroundColor: "#0E9645",
                                border: "1px solid #0E9645",
                              }}
                            >
                              <i
                                className="ti-check"
                                style={{
                                  marginRight: "10px",
                                }}
                              ></i>
                              SUBMIT APPLICATION
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
    </div>
  );
};

export default NewEmployeeDataForm;


