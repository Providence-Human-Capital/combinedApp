import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BreadCrumb from "../../../components/BreadCrumb";
import Loading from "../../../components/Loading.jsx/Loading";
import AreaOfExpertiseSelect from "../components/AreaOfExpertiseSelect";
import { useNavigate } from "react-router-dom";

import { API } from "../../../../config";
import DocumentUpload from "../components/DocumentUpload";

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

const AddStaffingEmployee = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const targetRef = useRef();
  const [fileUploads, setFileUploads] = useState([]);

  const handleFilesChange = (uploads) => {
    setFileUploads(uploads);
  };

  const initialValues = {
    first_name: "",
    last_name: "",
    national_id: "",
    date_of_birth: null,
    nationality: "",
    marital_status: "",
    address: "",

    house_number: "",
    street_name: "",
    location: "",
    city: "",
    country: "",

    phone_number: "",
    gender: "",
    email: "",
    bank_name: "",
    account_number: "",
    education_level: "",
    work_experience: "",
    area_of_expertise: "",
    expertie: "",
    occupation: "",

    ref_name: "",
    ref_contact: "",
    ref_emp: "",
    ref_relation: "",
    ref_type: "Referrer",
    from_company: "",
    from_position: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("Please Enter First Name"),
    last_name: Yup.string().required("Please Enter Last Name"),
    national_id: Yup.string().required("Nation ID Number Is Required"),
    date_of_birth: Yup.date().required("Enter Your Date Of Birth").nullable(),
    nationality: Yup.string().required("Nationality Is Required"),
    marital_status: Yup.string().required("Select Your Marital Status"),
    address: Yup.string().nullable(),

    house_number: Yup.string().required("House number is Required"),
    street_name: Yup.string().required("Street Name is Required"),
    location: Yup.string().required("Loacation is Required"),
    city: Yup.string().required("City is Requred"),
    country: Yup.string().required("Please Select A Country"),

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

    expertie: Yup.string().nullable(),

    work_experience: Yup.string().nullable(),

    ref_name: Yup.string().nullable(),
    ref_contact: Yup.string().nullable(),
    ref_emp: Yup.string().nullable(),
    ref_relation: Yup.string().nullable(),
    ref_type: Yup.string().nullable().required("Select a reference type"),
    from_company: Yup.string().nullable(),
    from_position: Yup.string().nullable(),

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

    values.house_number = values.house_number.toUpperCase();
    values.street_name = values.street_name.toUpperCase();
    values.location = values.location.toUpperCase();
    values.city = values.city.toUpperCase();
    values.country = values.country.toUpperCase();

    values.date_of_birth = formattedDate;

    console.log("Values", values);
    console.log(file);

    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      formData.append("file", file);

      // Include document uploads in the form data
      fileUploads.forEach((upload, index) => {
        formData.append(`documents[${index}][type]`, upload.type);
        formData.append(`documents[${index}][file]`, upload.file);
      });

      const response = await fetch(`${API}/api/employee`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessages = errorData.error
        console.log(errorData.error)
          ? Object.values(errorData.error).flat().join(", ")
          : errorData.message || "Failed to register new employee";
      
        throw new Error(errorMessages);
      }
      // documentUploadRef.current.handleUpload();
      setIsLoading(false);
      resetForm();
      setFile(null); // Clear the file state
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Information Successfully Saved",
        timer: 1000,
        confirmButtonColor: "#007a41",
      });

      setTimeout(function () {
        navigate("/new/employees");
      }, 500);
      // Redirect to employee application success page
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to save information ${error.message} `,
        timer: 4000,
        confirmButtonColor: "#e60000",
      });
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    // Check if the file size is greater than 2MB (2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `File size should not exceed 2MB, Your file is too large (${fileSizeInMB}MB)`,
        timer: 5000,
        confirmButtonColor: "#e60000",
      });
      return;
    }

    setFile(file);
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
    <>
      <BreadCrumb title={"Add Staffing Applicant"} activeTab={"Staffing"} />
      <section className="content">
        <div className="row col-md-12">
          <div className="card">
            <div className="card-header">
              <h4
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    color: "#0E9645",
                  }}
                >
                  ADD NEW APPLICANT
                </span>{" "}
                <br />
              </h4>
            </div>
            <div className="card-body">
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
                          <div className="col-md-3 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="house_number"
                                name="house_number"
                                className={`form-control ${
                                  touched.house_number && errors.house_number
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label
                                htmlFor="house_number"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                HOUSE NUMBER
                              </label>
                              <ErrorMessage
                                name="house_number"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-3 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="street_name"
                                name="street_name"
                                className={`form-control ${
                                  touched.street_name && errors.street_name
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label
                                htmlFor="street_name"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                STREET NAME
                              </label>
                              <ErrorMessage
                                name="street_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-3 col-12 mb-4">
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
                              <label
                                htmlFor="location"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                LOCATION/SUBURB
                              </label>
                              <ErrorMessage
                                name="location"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-3 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="city"
                                name="city"
                                className={`form-control ${
                                  touched.city && errors.city
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                              <label
                                htmlFor="city"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                CITY
                              </label>
                              <ErrorMessage
                                name="city"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-3 col-12 mb-4">
                            <div className="form-floating">
                              <Field
                                as="select"
                                name="country"
                                className={`form-select ${
                                  touched.country && errors.country
                                    ? "error-input"
                                    : ""
                                }`}
                              >
                                <option value="">COUNTRY</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                                <option value="Algeria">Algeria</option>
                                <option value="Angola">Angola</option>
                                <option value="Benin">Benin</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Burkina Faso">
                                  Burkina Faso
                                </option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cabo Verde">Cabo Verde</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Central African Republic">
                                  Central African Republic
                                </option>
                                <option value="Chad">Chad</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo (Brazzaville)">
                                  Congo (Brazzaville)
                                </option>
                                <option value="Congo (Kinshasa)">
                                  Congo (Kinshasa)
                                </option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Egypt">Egypt</option>
                                <option value="Equatorial Guinea">
                                  Equatorial Guinea
                                </option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Eswatini">Eswatini</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-Bissau">
                                  Guinea-Bissau
                                </option>
                                <option value="Ivory Coast">Ivory Coast</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Mali">Mali</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="São Tomé and Príncipe">
                                  São Tomé and Príncipe
                                </option>
                                <option value="Senegal">Senegal</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">
                                  Sierra Leone
                                </option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">
                                  South Africa
                                </option>
                                <option value="South Sudan">South Sudan</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Togo">Togo</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Zambia">Zambia</option>
                              </Field>
                              <label
                                htmlFor="country"
                                style={{
                                  textTransform: "uppercase",
                                  fontWeight: "bold",
                                }}
                              >
                                SELECT COUNTRY
                              </label>
                              <ErrorMessage
                                name="country"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-9 col-12 mb-4">
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
                                disabled
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

                          <div className="col-md-4 col-12 mb-4">
                          <label
                                htmlFor="expertie"
                                style={{
                                  color: "#2C4894",
                                  fontWeight: "bold",
                                }}
                              >
                                OTHER (EXPERTIES)
                              </label>
                            <div className="form-floating">
                              <Field
                                type="text"
                                id="expertie"
                                name="expertie"
                                className={`form-control ${
                                  touched.expertie && errors.expertie
                                    ? "error-input"
                                    : ""
                                }`}
                              />
                             
                              <ErrorMessage
                                name="expertie"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

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

                        <div
                          className="card card-body"
                          style={{
                            backgroundColor: "#149F8C",
                          }}
                        >
                          <div className="row">
                            <div className="col-md-4 col-12 mb-4">
                              <label
                                htmlFor="ref_type"
                                style={{
                                  textTransform: "uppercase",
                                  color: "#fff",
                                  fontWeight: "bold",
                                }}
                              >
                                Reference Type
                              </label>
                              <div className="form-floating">
                                <Field
                                  as="select"
                                  name="ref_type"
                                  className={`form-select ${
                                    touched.ref_type && errors.ref_type
                                      ? "error-input"
                                      : ""
                                  }`}
                                >
                                  <option value="">
                                    Select Reference Type
                                    (Self/Transfer/Referrer)
                                  </option>
                                  <option value="Self">SELF</option>
                                  <option value="Transfer">TRANSFER</option>
                                  <option value="Referrer">REFERRER</option>
                                </Field>
                                <label
                                  htmlFor="ref_type"
                                  style={{
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                    
                                  }}
                                >
                                  SELECT THE TYPE OF REFERENCE
                                </label>
                                <ErrorMessage
                                  name="ref_type"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </div>
                          </div>

                          {values.ref_type === "Transfer" && (
                            <>
                              <div className="row">
                                <div className="col-md-4 col-12 mb-4">
                                  <div className="form-floating">
                                    <Field
                                      type="text"
                                      id="from_company"
                                      name="from_company"
                                      className={`form-control ${
                                        touched.from_company &&
                                        errors.from_company
                                          ? "error-input"
                                          : ""
                                      }`}
                                    />
                                    <label
                                      htmlFor="from_company"
                                      style={{
                                        color: "#2C4894",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      WHICH COMPANY ARE YOU TRANSFERRING FROM
                                    </label>
                                    <ErrorMessage
                                      name="from_company"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 col-12 mb-4">
                                  <div className="form-floating">
                                    <Field
                                      type="text"
                                      id="from_position"
                                      name="from_position"
                                      className={`form-control ${
                                        touched.from_position &&
                                        errors.from_position
                                          ? "error-input"
                                          : ""
                                      }`}
                                    />
                                    <label
                                      htmlFor="from_position"
                                      style={{
                                        color: "#2C4894",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      WHICH COMPANY ARE YOU TRANSFERRING TO
                                    </label>
                                    <ErrorMessage
                                      name="from_position"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* <div>
                            <label htmlFor="from_position">From Position</label>
                            <Field name="from_position" />
                            <ErrorMessage
                              name="from_position"
                              component="div"
                            />
                          </div> */}
                            </>
                          )}

                          {values.ref_type === "Referrer" && (
                            <>
                              <div className="space"></div>
                              <div className="row">
                                <h6
                                  style={{
                                    fontWeight: "bold",
                                    color: "#fff",
                                  }}
                                >
                                  PROVIDE REFFERER INFORMATION (Who Referred you
                                  to Providence Human Capital)
                                </h6>

                                <div className="col-md-4 col-12 mb-4">
                                  <div className="form-floating">
                                    <Field
                                      type="text"
                                      id="ref_name"
                                      name="ref_name"
                                      className={`form-control ${
                                        touched.ref_name && errors.ref_name
                                          ? "error-input"
                                          : ""
                                      }`}
                                    />
                                    <label
                                      htmlFor="ref_name"
                                      style={{
                                        color: "#2C4894",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      REFFERER FULL NAME
                                    </label>
                                    <ErrorMessage
                                      name="ref_name"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-4 col-12 mb-4">
                                  <div className="form-floating">
                                    <Field
                                      type="text"
                                      id="ref_contact"
                                      name="ref_contact"
                                      className={`form-control ${
                                        touched.ref_contact &&
                                        errors.ref_contact
                                          ? "error-input"
                                          : ""
                                      }`}
                                    />
                                    <label
                                      htmlFor="ref_contact"
                                      style={{
                                        color: "#2C4894",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      REFFERER CONTACT DETAILS
                                    </label>
                                    <ErrorMessage
                                      name="ref_contact"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-4 col-12 mb-4">
                                  <div className="form-floating">
                                    <Field
                                      type="text"
                                      id="ref_emp"
                                      name="ref_emp"
                                      className={`form-control ${
                                        touched.ref_emp && errors.ref_emp
                                          ? "error-input"
                                          : ""
                                      }`}
                                    />
                                    <label
                                      htmlFor="ref_emp"
                                      style={{
                                        color: "#2C4894",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      REFFERER PLACE OF EMPLOYEMENT
                                    </label>
                                    <ErrorMessage
                                      name="ref_emp"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-md-4 col-12 mb-4">
                                  <label
                                    htmlFor="ref_relation"
                                    style={{
                                      color: "#fff",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    SELECT RELATIONSHIP TO REFERRER
                                  </label>
                                  <div className="form-floating">
                                    <Field
                                      as="select"
                                      className={`form-select ${
                                        touched.ref_relation &&
                                        errors.ref_relation
                                          ? "error-input"
                                          : ""
                                      }`}
                                      id="ref_relation"
                                      name="ref_relation"
                                    >
                                      <option></option>
                                      <option value="FATHER">FATHER</option>
                                      <option value="MOTHER">MOTHER</option>
                                      <option value="SON">SON</option>
                                      <option value="DAUGHTER">DAUGHTER</option>
                                      <option value="BROTHER">BROTHER</option>
                                      <option value="WIFE">WIFE</option>
                                      <option value="HUSBAND">HUSBAND</option>
                                      <option value="SISTER">SISTER</option>
                                      <option value="FRIEND">FRIEND</option>
                                      <option value="EXTENDED FAMILY">
                                        EXTENDED FAMILY
                                      </option>
                                      <option value="OTHER">OTHER</option>
                                      <option value="PARTNER">PARTNER</option>
                                      <option value="GRANDFATHER">
                                        GRANDFATHER
                                      </option>
                                      <option value="GRANDMOTHER">
                                        GRANDMOTHER
                                      </option>
                                      <option value="GRANDSON">GRANDSON</option>
                                      <option value="GRANDDAUGHTER">
                                        GRANDDAUGHTER
                                      </option>
                                      <option value="UNCLE">UNCLE</option>
                                      <option value="AUNT">AUNT</option>
                                      <option value="NEPHEW">NEPHEW</option>
                                      <option value="NIECE">NIECE</option>
                                      <option value="COUSIN">COUSIN</option>
                                      <option value="COLLEAGUE">
                                        COLLEAGUE
                                      </option>
                                      <option value="NEIGHBOR">NEIGHBOR</option>
                                      <option value="GUARDIAN">GUARDIAN</option>
                                      <option value="MENTOR">MENTOR</option>
                                    </Field>
                                    <label
                                      htmlFor="education_level"
                                      style={{
                                        color: "#2C4894",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      RELATIONSHIP
                                    </label>

                                    <ErrorMessage
                                      name="ref_relation"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* <button type="submit">Submit</button> */}
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
                                    CV (PDF Only)
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

                        <div style={{ marginTop: "2rem" }}>
                          <h6 style={{ fontWeight: "bold", color: "#2C4894" }}>
                            ADD THE DOCUMENTS THAT YOU HAVE
                          </h6>
                          <label
                            style={{
                              color: "#2C4894",
                              marginBottom: "10px",
                            }}
                          >
                            {" "}
                            <strong>NB:</strong> Accepted document types{" "}
                            <strong
                              style={{
                                color: "#0E9645",
                              }}
                            >
                              National ID, Educational Qualifications, Drivers
                              License, Affidavit, Birth Certificates, Medical
                              Certificate
                            </strong>{" "}
                            and they must all be <strong>PDF</strong> files
                          </label>
                        </div>

                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-6 col-12 mb-4">
                            <DocumentUpload onFilesChange={handleFilesChange} />
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
      </section>
    </>
  );
};

export default AddStaffingEmployee;
