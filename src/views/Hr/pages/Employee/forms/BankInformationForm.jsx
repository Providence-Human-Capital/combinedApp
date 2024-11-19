import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API } from "../../../../../../config";
import useBankInformation from "../../../hooks/useBankInformation";
import Swal from "sweetalert2";

// Validation schema using Yup
const validationSchema = Yup.object({
  employee_id: Yup.number().nullable(),
  staffing_employee_id: Yup.number().nullable(),
  zig_bank_name: Yup.string().nullable().max(255, "Maximum 255 characters"),
  zig_branch: Yup.string().nullable().max(255, "Maximum 255 characters"),
  zig_account_number: Yup.string()
    .nullable()
    .max(255, "Maximum 255 characters"),
  usd_bank_name: Yup.string().nullable().max(255, "Maximum 255 characters"),
  usd_branch: Yup.string().nullable().max(255, "Maximum 255 characters"),
  usd_account_number: Yup.string()
    .nullable()
    .max(255, "Maximum 255 characters"),
});

const BankInformationForm = ({ employeeId, handlePrev, handleNext, triggerRefetch }) => {
  const initialValues = {
    employee_id: employeeId || "", // Set employeeId here
    staffing_employee_id: "",
    zig_bank_name: "",
    zig_branch: "",
    zig_account_number: "",
    usd_bank_name: "",
    usd_branch: "",
    usd_account_number: "",
  };

  const { data, error, isLoading } = useBankInformation(employeeId);

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormValues({ ...initialValues, ...data });
    }
    console.log("BANK INFORMATION", data);
  }, [data]);

  const mutation = useMutation(
    (newData) => axios.post(`${API}/api/bank-information`, newData),
    {
      onSuccess: (response) => {
        // Perform any actions needed after successful submission
        console.log("Bank Information saved successfully", response);

        Swal.fire({
          icon: "success",
          title: "Bank Information Added",
          text: "Bank Information saved successfully",
          timer: 4000,
          confirmButtonColor: "#007a41",
        });

        // Trigger the handleNext function
        handleNext();
        triggerRefetch()
        // Call any success callback passed in
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error) => {
        console.error("Error saving Next of Kin:", error);
      },
    }
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
          BANK INFORMATION
        </h3>
      </div>
      <div className="box-body">
        <Formik
          initialValues={formValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(values, {
              onSettled: () => {
                setSubmitting(false);
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginTop: "10px" }}>
                <h4 style={{ fontWeight: "bold", color: "#2C4894" }}>
                  EMPLOYEE ZIG ACCOUNT INFORMATION
                </h4>
              </div>
              <div className="row">
                <div className="col-md-4 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      type="text"
                      className="form-control"
                      name="zig_bank_name"
                    />
                    <label htmlFor="zig_bank_name">ZIG Bank Name</label>
                    <ErrorMessage
                      name="zig_bank_name"
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
                      name="zig_branch"
                    />
                    <label htmlFor="zig_branch">ZIG Branch</label>
                    <ErrorMessage
                      name="zig_branch"
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
                      name="zig_account_number"
                    />
                    <label htmlFor="zig_account_number">
                      ZIG Account Number
                    </label>
                    <ErrorMessage
                      name="zig_account_number"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>
              <div className="space"></div>
              <div style={{ marginTop: "2rem" }}>
                <h4 style={{ fontWeight: "bold", color: "#2C4894" }}>
                  EMPLOYEE USD BANK ACCOUNT INFORMATION
                </h4>
              </div>
              <div className="space"></div>

              <div className="row">
                <div className="col-md-4 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      type="text"
                      className="form-control"
                      name="usd_bank_name"
                    />
                    <label>USD Bank Name</label>
                    <ErrorMessage
                      name="usd_bank_name"
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
                      name="usd_branch"
                    />
                    <label htmlFor="usd_branch">USD Branch</label>
                    <ErrorMessage
                      name="usd_branch"
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
                      name="usd_account_number"
                    />
                    <label htmlFor="usd_account_number">
                      USD Account Number
                    </label>
                    <ErrorMessage
                      name="usd_account_number"
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
                    Bank Information added successfully!
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

export default BankInformationForm;
