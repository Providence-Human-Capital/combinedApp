import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API } from "../../../../../../config";
import Swal from "sweetalert2";

// Validation schema using Yup
const validationSchema = Yup.object({
  employee_id: Yup.number().nullable(),
  staffing_employee_id: Yup.number().nullable(),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  physical_address: Yup.string().nullable(),
  phone_number: Yup.string().nullable(),
  relation: Yup.string().nullable(),
});

const fetchEmployeeData = async (applicantId) => {
  try {
    const response = await fetch(`${API}/api/employee/${applicantId}`);
    const data = await response.json();
    return data.data; // Assuming 'data.data' contains the employee data
  } catch (error) {
    console.error("Error occurred while fetching employee data:", error);
    throw error;
  }
};

const NextOfKinForm = ({
  employeeId,
  onSuccess,
  handlePrev,
  handleNext,
  triggerRefetch,
}) => {
  const initialValues = {
    employee_id: employeeId || "", // Set employeeId here
    staffing_employee_id: "",
    first_name: "",
    last_name: "",
    physical_address: "",
    phone_number: "",
    relation: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [useApplicantAddress, setUseApplicantAddress] = useState(false); // Track if we use the applicant address

  // Fetch the next of kin data for the employee
  const { data, error, isLoading, refetch } = useQuery(
    ["nextOfKin", employeeId],
    () => fetchEmployeeData(employeeId)
  );

  // Effect to update form values when data is fetched
  useEffect(() => {
    if (data) {
      setFormValues((prevValues) => ({ ...prevValues, ...data }));
    }
  }, [data]);

  // Mutation for saving Next of Kin
  const mutation = useMutation(
    (newData) => axios.post(`${API}/api/next-of-kin`, newData),
    {
      onSuccess: (response) => {
        Swal.fire({
          icon: "success",
          title: "Next Of Kin Added",
          text: "Next of Kin saved successfully",
          timer: 4000,
          confirmButtonColor: "#007a41",
        });
        handleNext();
        triggerRefetch();
        if (onSuccess) onSuccess();
      },
      onError: (error) => {
        console.error("Error saving Next of Kin:", error);
      },
    }
  );

  // Handle 'Use Applicant Address' button click
  const handleUseApplicantAddress = async () => {
    try {
      const employeeData = await fetchEmployeeData(employeeId);
      if (employeeData) {
        setFormValues((prevValues) => ({
          ...prevValues,
          physical_address: employeeData.address, // Assuming the applicant's address is in 'employeeData.address'
        }));
        setUseApplicantAddress(true); // Flag that we are using the applicant's address
      }
    } catch (error) {
      console.error("Error fetching applicant address:", error);
    }
  };
  return (
    <div className="step-form">
      <div className="card">
        <div className="card-header no-border">
          <h4
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                color: "#0E9645",
              }}
            >
              ADD EMPLOYEE NEXT OF KIN
            </span>{" "}
            <br />
          </h4>
        </div>
        <div className="card-body">
          <Formik
            initialValues={formValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              mutation.mutate(values, {
                onSettled: () => setSubmitting(false),
              });
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col-md-4 col-12 mb-4">
                    <div className="form-floating">
                      <Field
                        type="text"
                        name="first_name"
                        className="form-control"
                      />
                      <label
                        htmlFor="first_name"
                        style={{
                          color: "#2C4894",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Next Of Kin First Name
                      </label>
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  <div className="col-md-4 col-12 mb-4">
                    <div className="form-floating">
                      <Field
                        type="text"
                        className="form-control"
                        name="last_name"
                      />
                      <label htmlFor="last_name">Last Name</label>
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                </div>

                {/* Button to use applicant's address */}
                <button
                  type="button"
                  className="btn btn-warning mb-3"
                  onClick={handleUseApplicantAddress}
                >
                  <i class="fa fa-thumb-tack" aria-hidden="true"></i> {"  "}
                  USE APPLICANT ADDRESS
                </button>

                <div className="row">
                  <div className="col-md-12 col-12 mb-4">
                    <div className="form-floating">
                      {/* <Field
                        type="text"
                        className="form-control"
                        name="physical_address"
                        value={formValues.physical_address}
                      /> */}
                      <Field
                        type="text"
                        className="form-control"
                        name="physical_address"
                        value={values.physical_address} // Editable field
                        onChange={(e) =>
                          setFieldValue("physical_address", e.target.value)
                        } // Allow manual editing
                      />
                      <label htmlFor="physical_address">Physical Address</label>
                      <ErrorMessage
                        name="physical_address"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-12 mb-4">
                    <div className="form-floating">
                      <Field
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        className="form-control"
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

                  <div className="col-md-4 col-12 mb-4">
                    <div className="form-floating">
                      <Field
                        as="select"
                        className="form-select"
                        id="relation"
                        name="relation"
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
                        <option value="GRAND PARENT">GRAND PARENT</option>
                        <option value="EXTENDED FAMILY">EXTENDED FAMILY</option>
                        <option value="OTHER">OTHER</option>
                      </Field>
                      <label
                        htmlFor="relation"
                        style={{
                          color: "#2C4894",
                          fontWeight: "bold",
                        }}
                      >
                        RELATIONSHIP TO NEXT OF KIN
                      </label>

                      <ErrorMessage
                        name="relation"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || mutation.isLoading}
                >
                  {mutation.isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <>
                      <i
                        className="ti-check"
                        style={{
                          marginRight: "10px",
                        }}
                      ></i>{" "}
                      Add Next Of Kin
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NextOfKinForm;
