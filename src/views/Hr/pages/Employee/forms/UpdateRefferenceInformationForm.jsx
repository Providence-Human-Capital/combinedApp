import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import useEmployee from "../../../hooks/useEmployee";
import { API } from "../../../../../../config";
import { useNavigate } from "react-router-dom";

const UpdateRefferenceInformationForm = ({ employeeId }) => {
  const { data: employee, error, isLoading } = useEmployee(employeeId);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    ref_name: Yup.string().nullable(),
    ref_contact: Yup.string().nullable(),
    ref_emp: Yup.string().nullable(),
    ref_relation: Yup.string().nullable(),
    ref_type: Yup.string().nullable().required("Select a reference type"),
    from_company: Yup.string().nullable(),
    from_position: Yup.string().nullable(),
  });

  const initialValues = {
    ref_name: employee?.ref_name || "",
    ref_contact: employee?.ref_contact || "",
    ref_emp: employee?.ref_emp || "",
    ref_relation: employee?.ref_relation || "",
    ref_type: employee?.ref_type || "",
    from_company: employee?.from_company || "",
    from_position: employee?.from_position || "",
  };

  const updateReferenceInformation = async (data) => {
    const response = await axios.put(
      `${API}/api/employee/${employeeId}/update-reference`,
      data
    );
    return response.data;
  };

  const mutation = useMutation(updateReferenceInformation, {
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Reference information updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate(`/applicant/detail/${employeeId}`);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  return (
    <>
      <div className="box">
        <div className="box-header no-border">
          <h3
            className="box-title"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            REFERENCE INFORMATION UPDATE
          </h3>
        </div>
        <div className="box-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              mutation.mutate(values);
            }}
            enableReinitialize
          >
            {({ values, isSubmitting, touched, errors }) => (
              <Form>
                <div className="row">
                  <div className="col-md-4 col-12 mb-4">
                    <label
                      htmlFor="ref_type"
                      style={{
                        textTransform: "uppercase",
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
                          Select Reference Type (Self/Transfer/Referrer)
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

                {values.ref_type === "Referrer" && (
                  <>
                    <div className="row">
                      <h6
                        style={{
                          fontWeight: "bold",
                          color: "#2C4894",
                        }}
                      >
                        PROVIDE REFFERER INFORMATION (Who Referred you to
                        Providence Human Capital)
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
                              touched.ref_contact && errors.ref_contact
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
                            color: "#2C4894",
                            fontWeight: "bold",
                          }}
                        >
                          SELECT RELATIONSHIP TO REFERRER
                        </label>
                        <div className="form-floating">
                          <Field
                            as="select"
                            className={`form-select ${
                              touched.ref_relation && errors.ref_relation
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
                            <option value="GRANDFATHER">GRANDFATHER</option>
                            <option value="GRANDMOTHER">GRANDMOTHER</option>
                            <option value="GRANDSON">GRANDSON</option>
                            <option value="GRANDDAUGHTER">GRANDDAUGHTER</option>
                            <option value="UNCLE">UNCLE</option>
                            <option value="AUNT">AUNT</option>
                            <option value="NEPHEW">NEPHEW</option>
                            <option value="NIECE">NIECE</option>
                            <option value="COUSIN">COUSIN</option>
                            <option value="COLLEAGUE">COLLEAGUE</option>
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

                {values.ref_type === "Transfer" && (
                  <div className="row">
                    <div className="col-md-4 col-12 mb-4">
                      <div className="form-floating">
                        <Field
                          type="text"
                          id="from_company"
                          name="from_company"
                          className={`form-control ${
                            touched.from_company && errors.from_company
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
                            touched.from_position && errors.from_position
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
                )}
                <div className="space"></div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      color: "#fff",
                      backgroundColor: "#0E9645",
                      border: "1px solid #0E9645",
                    }}
                    disabled={isSubmitting || mutation.isLoading}
                  >
                    <i
                      className="ti-check"
                      style={{
                        marginRight: "10px",
                      }}
                    ></i>
                    {mutation.isLoading
                      ? "Updating..."
                      : "UPDATE REF INFORMATION"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UpdateRefferenceInformationForm;
