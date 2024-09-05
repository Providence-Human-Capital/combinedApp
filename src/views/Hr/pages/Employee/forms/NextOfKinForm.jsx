import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API } from "../../../../../../config";
import useNextOfKin from "../../../hooks/useNextOfKin";

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

const NextOfKinForm = ({ employeeId, onSuccess }) => {
  const initialValues = {
    employee_id: employeeId || "", // Set employeeId here
    staffing_employee_id: "",
    first_name: "",
    last_name: "",
    physical_address: "",
    phone_number: "",
    relation: "",
  };

  const { data, error, isLoading, refetch } = useNextOfKin(employeeId);

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormValues({ ...initialValues, ...data });
    }
    console.log("NEXT OF KIN FORM", data);
  }, [data]);

  const mutation = useMutation((newData) =>
    axios.post(`${API}/api/next-of-kin`, newData)
  );

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
                onSuccess: () => {
                  onSuccess(); // Trigger refetch
                },
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="row">
                  {mutation.isError && (
                    <div className="alert alert-danger alert-dismissible m-4">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                      <h4>
                        <i className="icon fa fa-ban"></i> ERROR!
                      </h4>
                      {mutation.error.message}
                    </div>
                  )}
                  {mutation.isSuccess && (
                    <div className="alert alert-primary alert-dismissible m-4">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                      <h4>
                        <i className="icon fa fa-check"></i> SUCCESS!
                      </h4>
                      Next of Kin added successfully!
                    </div>
                  )}
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
                <div className="row">
                  <div className="col-md-12 col-12 mb-4">
                    <div className="form-floating">
                      <Field
                        type="text"
                        className="form-control"
                        name="physical_address"
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
          <div className="space"></div>
        </div>
      </div>
    </div>
  );
};

export default NextOfKinForm;
