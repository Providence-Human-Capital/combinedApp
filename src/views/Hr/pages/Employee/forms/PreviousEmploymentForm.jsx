import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API } from "../../../../../../config";

// Validation schema using Yup
const validationSchema = Yup.object({
  employee_id: Yup.number().nullable(),
  staffing_employee_id: Yup.number().nullable(),
  company_name: Yup.string().nullable().max(255, "Maximum 255 characters"),
  position_held: Yup.string().nullable().max(255, "Maximum 255 characters"),
  manager_name: Yup.string().nullable().max(255, "Maximum 255 characters"),
  duration_n: Yup.string().nullable().max(255, "Maximum 255 characters"),
  duration_my: Yup.string().nullable().max(255, "Maximum 255 characters"),
  reasons_for_leaving: Yup.string()
    .nullable()
    .max(255, "Maximum 255 characters"),
  additional_comments: Yup.string()
    .nullable()
    .max(1000, "Maximum 1000 characters"),
});

const PreviousEmploymentForm = ({ employeeId }) => {
  const mutation = useMutation((newData) =>
    axios.post(`${API}/api/employment-history`, newData)
  );

  return (
    <div className="box">
      <div className="box-header no-border">
        <h3
          className="box-title"
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          EMPLOYMENT HISTORY
        </h3>
      </div>
      <div className="box-body">
        <Formik
          initialValues={{
            employee_id: employeeId || "", // Set employeeId here
            staffing_employee_id: "",
            company_name: "",
            position_held: "",
            manager_name: "",
            duration_n: "",
            duration_my: "",
            reasons_for_leaving: "",
            additional_comments: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formattedValues = {
              ...values,
              duration_n: values.duration_n.toString(),
            };

            mutation.mutate(formattedValues, {
              onSettled: () => {
                setSubmitting(false);
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="row">
                <div className="col-md-6 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      type="text"
                      className="form-control"
                      name="company_name"
                    />
                    <label htmlFor="company_name">Company Name</label>
                    <ErrorMessage
                      name="company_name"
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
                      name="position_held"
                    />
                    <label htmlFor="position_held">Position Held</label>
                    <ErrorMessage
                      name="position_held"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>
              <div className="space"></div>
              <div className="row">
                <div className="col-md-4 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      type="text"
                      className="form-control"
                      name="manager_name"
                    />
                    <label htmlFor="manager_name">Manager Name</label>
                    <ErrorMessage
                      name="manager_name"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="col-md-2 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      type="number"
                      className="form-control"
                      name="duration_n"
                    />
                    <label htmlFor="duration_n">Duration (N)</label>
                    <ErrorMessage
                      name="duration_n"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      as="select"
                      className="form-select"
                      name="duration_my"
                    >
                      <option value="MONTH(S)">MONTH(S)</option>
                      <option value="YEAR(S)">YEAR(S)</option>
                    </Field>
                    <label htmlFor="duration_my">
                      Duration (YEARS / MONTHS)
                    </label>
                    <ErrorMessage
                      name="duration_my"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>
              <div className="space"></div>
              <div className="row">
                <div className="col-md-4 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      type="text"
                      className="form-control"
                      name="reasons_for_leaving"
                    />
                    <label htmlFor="reasons_for_leaving">
                      Reasons for Leaving
                    </label>
                    <ErrorMessage
                      name="reasons_for_leaving"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>
              <div className="space"></div>
              <div className="row">
                <div className="col-md-12 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      as="textarea"
                      rows="4"
                      className="form-control"
                      style={{
                        height: "100px",
                      }}
                      name="additional_comments"
                    />
                    <label>Additional Comments</label>
                    <ErrorMessage
                      name="additional_comments"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "fit-content",
                  }}
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
                      Submit
                    </>
                  )}
                </button>
              </div>

              <div className="space"></div>
              {mutation.isError && (
                <div className="alert alert-danger alert-dismissible">
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
                <>
                  <div className="alert alert-primary alert-dismissible">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                    <h4>
                      <i className="icon fa fa-check"></i> SUCCESS!
                    </h4>
                    Employment history added successfully!
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PreviousEmploymentForm;
