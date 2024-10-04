import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API } from "../../../../../../config";
import Swal from "sweetalert2";

// Validation schema using Yup
const validationSchema = Yup.object({
  employee_id: Yup.number().nullable(),
  staffing_employee_id: Yup.number().nullable(),
  misc_type: Yup.string().nullable().max(255, "Maximum 255 characters"),
  misc_details: Yup.string().nullable().max(1000, "Maximum 1000 characters"),
});

const MiscellaneousForm = ({ employeeId, handlePrev, handleNext }) => {
  const styles = {
    textarea: {
      height: "100px",
    },
    seperation: {
      height: "20px",
    },
    formc: {
      marginLeft: "-20px",
    },
    border: {
      border: " 2px solid #e7e7e7",
    },
  };

  const mutation = useMutation((newData) =>
    axios.post(`${API}/api/misc`, newData),
  {
    onSuccess: (response) => {
      // Perform any actions needed after successful submission
      console.log("Misc Information saved successfully", response);

      Swal.fire({
        icon: "success",
        title: "Misc ",
        text: "Misc Information saved successfully",
        timer: 4000,
        confirmButtonColor: "#007a41",
      });

      // Trigger the handleNext function
      handleNext();

      // Call any success callback passed in
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error("Error saving Misc:", error);
    },
  }
  );

  return (
    <Formik
      initialValues={{
        employee_id: employeeId || "",
        staffing_employee_id: "",
        misc_type: "",
        misc_details: "",
      }}
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
          <div className="box">
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
              <>
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
                  <p style={{
                    color: "#fff",
                    fontWeight: "400"
                  }}>Miscellaneous details added successfully!</p>
                </div>
              </>
            )}
            <div className="box-header no-border">
              <h4
                className="box-title"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Miscellaneous Details
              </h4>
            </div>
            <div className="box-body">
              <div className=" row">
                <div className="col-md-4 col-12 mb-4">
                  <div className="form-floating">
                    <Field
                      as="select"
                      className={`form-select`}
                      id="misc_type"
                      name="misc_type"
                    >
                      <option valuue=""></option>
                      <option value="CRIMINAL RECORD">CRIMINAL RECORD</option>
                    </Field>
                    <label
                      htmlFor="misc_type"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Miscellaneous Type
                    </label>

                    <ErrorMessage
                      name="misc_type"
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
                      className="form-control"
                      name="misc_details"
                      rows="4"
                      style={styles.textarea}
                    />
                    <label
                      htmlFor="misc_details"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Miscellaneous Details
                    </label>
                    <ErrorMessage
                      name="misc_details"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

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
                      Add Next Of Kin
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MiscellaneousForm;
