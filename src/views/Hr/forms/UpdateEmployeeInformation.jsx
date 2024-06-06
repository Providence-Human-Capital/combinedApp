import BreadCrumb from "../../../components/BreadCrumb";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";
import useEmployee from "../hooks/useEmployee";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  national_id: Yup.string().required("National ID is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  date_of_birth: Yup.date().required("Date of birth is required"),
  nationality: Yup.string().required("Nationality is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  phone_number: Yup.string().required("Phone number is required"),
  marital_status: Yup.string().required("Marital status is required"),
  area_of_expertise: Yup.string().required("Area of expertise is required"),
  education_level: Yup.string().required("Education level is required"),
  work_experience: Yup.string().required("Work experience is required"),
  status: Yup.string().required("Status is required"),
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


const UpdateEmployeeInformation = () => {
  const { applicantId } = useParams();
  const { data: employee, error, isLoading } = useEmployee(1);
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (employee) {
      setFormValues({ ...initialValues, ...employee });
    }
  }, [employee]);

  const handleSubmit = async (values, { setSubmitting }) => {
    // const formData = new FormData();
    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }

    try {
      const response = await fetch(`${API}/api/employee/update/${1}`, {
        method: "PATCH",
        body: JSON.stringify(values),

      });
      const data = await response.json();
      if (response.ok) {
        alert("Employee information updated successfully!");
      } else {
        alert(`Failed to update employee information: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating employee information:", error);
      alert("An error occurred while updating employee information.");
    } finally {
      setSubmitting(false);
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
    <BreadCrumb title={"Update Employee Information"} activeTab={"Employee"} />
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
                    <h3 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                      UPDATE{" "}
                      <span style={{ fontSize: "24px", color: "#58AB46", paddingLeft: "20px", paddingRight: "20px" }}>
                        {formValues.first_name} {formValues.last_name}
                      </span>{" "}
                      INFORMATION
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="form-floating">
                      <Field type="text" className="form-control" id="first_name" name="first_name" />
                      <label htmlFor="first_name">FIRST NAME</label>
                      <ErrorMessage name="first_name" component="div" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-floating">
                      <Field type="text" className="form-control" id="last_name" name="last_name" />
                      <label htmlFor="last_name">LAST NAME</label>
                      <ErrorMessage name="last_name" component="div" />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-floating">
                      <Field type="text" className="form-control" id="national_id" name="national_id" />
                      <label htmlFor="national_id">NATIONAL ID</label>
                      <ErrorMessage name="national_id" component="div" />
                    </div>
                  </div>
                </div>
                <div className="space"></div>
                <div className="row">
                  <div className="col-lg-3 col-md-12">
                    <div className="form-floating">
                      <Field type="email" className="form-control" id="email" name="email" />
                      <label htmlFor="email">EMAIL</label>
                      <ErrorMessage name="email" component="div" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-floating">
                      <Field type="date" className="form-control" id="date_of_birth" name="date_of_birth" />
                      <label htmlFor="date_of_birth">DATE OF BIRTH</label>
                      <ErrorMessage name="date_of_birth" component="div" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-floating">
                      <Field type="text" className="form-control" id="nationality" name="nationality" />
                      <label htmlFor="nationality">NATIONALITY</label>
                      <ErrorMessage name="nationality" component="div" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-floating">
                      <Field type="text" className="form-control" id="gender" name="gender" />
                      <label htmlFor="gender">GENDER</label>
                      <ErrorMessage name="gender" component="div" />
                    </div>
                  </div>
                </div>
                <div className="space"></div>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating">
                      <Field type="text" className="form-control" id="address" name="address" />
                      <label htmlFor="address">ADDRESS</label>
                      <ErrorMessage name="address" component="div" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-floating">
                      <Field type="text" className="form-control" id="phone_number" name="phone_number" />
                      <label htmlFor="phone_number">PHONE NUMBER</label>
                      <ErrorMessage name="phone_number" component="div" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-floating">
                      <Field type="text" className="form-control" id="marital_status" name="marital_status" />
                      <label htmlFor="marital_status">MARITAL STATUS</label>
                      <ErrorMessage name="marital_status" component="div" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div>
                    <label>Area of Expertise</label>
                    <Field name="area_of_expertise" type="text" />
                    <ErrorMessage name="area_of_expertise" component="div" />
                  </div>

                  <div>
                    <label>Education Level</label>
                    <Field name="education_level" type="text" />
                    <ErrorMessage name="education_level" component="div" />
                  </div>

                  <div>
                    <label>Work Experience</label>
                    <Field name="work_experience" type="text" />
                    <ErrorMessage name="work_experience" component="div" />
                  </div>

                  <div>
                    <label>Status</label>
                    <Field name="status" type="text" />
                    <ErrorMessage name="status" component="div" />
                  </div>

                 

                  <div className="space"></div>
                  <button className="btn btn-info" style={{ width: "fit-content" }} type="submit" disabled={isSubmitting}>
                    Update
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  </>
  );
};

export default UpdateEmployeeInformation;
