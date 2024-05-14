import React, { forwardRef, useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb";
import { printActions } from "../../../store/prints";
import BeneficiaryDocumentPrint from "../prints/BeneficiaryDocumentPrint";

const BeneficiaryFormPrint = forwardRef(({ client, bankData }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "0",
      }}
    >
      <div
        style={{
          height: "1025px",
        }}
      >
        <BeneficiaryDocumentPrint client={client} bankData={bankData} />
      </div>
    </div>
  );
});
const PrintBeneficiaryForm = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const [isPrinting, setIsPrinting] = useState(false);
  const clients = useSelector((state) => state.print.currentTF);
  const client = useSelector((state) => state.print.beneficiaryPrint);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const foundClient = clients[clientId];
    console.log("Found client: " + foundClient);
    dispatch(
      printActions.setBeneficiaryPrint({
        beneficiaryPrint: foundClient,
      })
    );
  }, []);

  const initialValues = {
    pension_fund: "",
    date_of_birth: "",
    national_id: "",
    name_of_bank: "",
    account_name: "",
    branch_name: "",
    account_number: "",
    email: "",
    phone_number1: "",
    phone_number2: "",
  };
  const validationSchema = Yup.object().shape({
    pension_fund: Yup.string().required("Enter the Name of the Pension Fund"),
    date_of_birth: Yup.string().required("Enter the Date of Birth"),
    national_id: Yup.string().required("Enter The National ID"),
    name_of_bank: Yup.string().required("Enter The Bank Name"),
    account_name: Yup.string().required("Enter The Account Name"),
    branch_name: Yup.string().required(
      "Which Branch Name Of The Provided Bank Name"
    ),
    account_number: Yup.string().required("Enter the Account Number"),
    email: Yup.string().nullable(),
    phone_number1: Yup.string().required("Enter Phone Number"),
    phone_number2: Yup.string().nullable(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setFormData(values);
    if (beneficiaryFormRef.current) {
      Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: `Are you sure you have supplied all the necessary information?`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          handlePrintBeneficiaryForm();
        } else {
        }
      });
    }
  };

  const beneficiaryFormRef = useRef();
  const handlePrintBeneficiaryForm = useReactToPrint({
    content: () => beneficiaryFormRef.current,
    // pageStyle: "@page { size A4;}",
  });

  return (
    <>
      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        <BeneficiaryFormPrint
          ref={beneficiaryFormRef}
          client={client}
          bankData={formData}
        />
      </div>
      <BreadCrumb
        activeTab={"PRINTING PAGE"}
        title={"BENEFICIARY FORM PRINTING"}
      />
      <section className="content">
        <div className="row">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <div className="card p-4 mt-5">
                  <div className="row g-3">
                    <div className="col-12 mb-4">
                      <h4
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        Printing Beneficiary Form For{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "30px",
                          }}
                        >
                          {" "}
                          {client.first_name} {client.surname}
                        </span>
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="pension_fund"
                            name="pension_fund"
                          />
                          <label htmlFor="pension_fund">
                            PENSION FUND NAME
                          </label>
                          <ErrorMessage
                            name="pension_fund"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space"></div>
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="date"
                            className="form-control"
                            id="date_of_birth"
                            name="date_of_birth"
                          />
                          <label htmlFor="date_of_birth">DATE OF BIRTH</label>
                          <ErrorMessage
                            name="date_of_birth"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id=" national_id"
                            name="national_id"
                          />
                          <label htmlFor="national_id">NATIONAL ID</label>
                          <ErrorMessage
                            name="national_id"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space"></div>
                    <h4>
                      {" "}
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        NB:
                      </span>{" "}
                      Enter the bank details for refund transfer{" "}
                    </h4>
                    <div className="space"></div>
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="name_of_bank"
                            name="name_of_bank"
                          />
                          <label htmlFor="name_of_bank">BANK NAME</label>
                          <ErrorMessage
                            name="name_of_bank"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="account_name"
                            name="account_name"
                          />
                          <label htmlFor="account_name">ACCOUNT NAME</label>
                          <ErrorMessage
                            name="account_name"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="branch_name"
                            name="branch_name"
                          />
                          <label htmlFor="branch_name">BRANCH NAME</label>
                          <ErrorMessage
                            name="branch_name"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space"></div>
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="number"
                            className="form-control"
                            id="account_number"
                            name="account_number"
                          />
                          <label htmlFor=" account_number">
                            ACCOUNT NUMBER
                          </label>
                          <ErrorMessage
                            name="account_number"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                          />
                          <label htmlFor=" email">EMAIL</label>
                          <ErrorMessage
                            name=" email"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
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
                            id="phone_number1"
                            name="phone_number1"
                          />
                          <label htmlFor=" phone_number1">PHONE NUMBER 1</label>
                          <ErrorMessage
                            name="phone_number1"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            id="phone_number2"
                            name="phone_number2"
                          />
                          <label htmlFor=" phone_number2">
                            PHONE NUMBER 2(Optional)
                          </label>
                          <ErrorMessage
                            name="phone_number2"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space"></div>
                    <div className="col-12 mt-4">
                      <button
                        className="btn btn-primary text-uppercase"
                        style={{
                          borderRadius: "10px",
                        }}
                        type="submit"
                      >
                        PRINT BENEFICIARY TRANSFER FORM
                      </button>
                    </div>
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

export default PrintBeneficiaryForm;
