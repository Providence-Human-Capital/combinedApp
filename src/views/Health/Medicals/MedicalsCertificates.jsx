import React, { forwardRef, useRef, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const InHouseCertificatePrintAll = forwardRef(
  ({ company, clients, examData }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          margin: "0",
        }}
      >
        <h1>Print Inhouse</h1>
      </div>
    );
  }
);

const CityOfHarareCertificatePrintAll = forwardRef(({}, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "0",
      }}
    >
      <h1>Print City of Harare</h1>
    </div>
  );
});

const MedicalsCertificates = () => {
  const [selectedOption, setSelectedOption] = useState("professional");
  const companies = useSelector((state) => state.company.companies) || [];
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const validationSchema = Yup.object().shape({
    examinerName: Yup.string().required("Examiner Name is required"),
    qualifications: Yup.string().required("Qualifications are required"),
    exam_date: Yup.date().required("Date of Medical Examination is required"),
    company_name: Yup.string().required("Company is required"),
    fileInput: Yup.mixed().required("CSV file is required"),
    designation: Yup.string().nullable(),
    doc_address: Yup.string().nullable(),
  });

  const handleSubmit = (values, { setSubmitting }) => {};

  const inHouseCertificatesPrintAllRef = useRef();
  const handlePrintAllInHouseCertificates = useReactToPrint({
    content: () => inHouseCertificatesPrintAllRef.current,
  });

  const cityOfHarareCertificatesPrintAllRef = useRef();
  const handlePrintCityofHarareCertificates = useReactToPrint({
    content: () => cityOfHarareCertificatesPrintAllRef.current,
  });

  return (
    <>
      <BreadCrumb
        title={"Certificate Printing Page"}
        activeTab={"Printing Using Csv"}
      />
      <section className="content">
        <div className="row">
          <Formik
            initialValues={{
              examinerName: "DR F MUSHAMBI",
              qualifications: "MD (UNIVERSITY OF ALGIERS)",
              exam_date: "",
              company_name: "",
              fileInput: null,
              designation: "",
              doc_address: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <div>
                  <div className="card p-4 mt-5">
                    <div className="row g-3">
                      <div className="col-12 mb-4">
                        <h4>Printing Medicals </h4>
                        <span className="text-muted">
                          Please make sure that you upload the csv files
                          containing all the names and don't forget the doctor
                          and Qualifications
                        </span>
                      </div>
                      <div className="col-12">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="Professional"
                            value="professional"
                            checked={selectedOption === "professional"}
                            onChange={handleOptionChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Professional"
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            INHOUSE MEDICAL CERTIFICATE
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="InHouse"
                            value="inhouse"
                            checked={selectedOption === "city"}
                            onChange={handleOptionChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="InHouse"
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            CITY OF HARARE MEDICAL CERTIFICATE
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            placeholder="Examiner Name"
                            id="examinerName"
                            name="examinerName"
                          />
                          <label htmlFor="examinerName">
                            MEDICAL EXAMINER NAME
                          </label>
                          <ErrorMessage
                            name="examinerName"
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
                            id="qualifications"
                            name="qualifications"
                            placeholder=" MEDICAL EXAMINER QUALIFICATIONS
                    "
                          />
                          <label htmlFor="qualifications">
                            MEDICAL EXAMINER QUALIFICATIONS
                          </label>
                          <ErrorMessage
                            name="qualifications"
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
                            id="designation"
                            name="designation"
                            placeholder="EXAMINER DESIGNATION
                    "
                          />
                          <label htmlFor="designation">
                            EXAMINER DESIGNATION
                          </label>
                          <ErrorMessage
                            name="designation"
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
                            id="doc_address"
                            name="doc_address"
                            placeholder="EXAMINER ADDRESS
                    "
                          />
                          <label htmlFor="doc_address">EXAMINER ADDRESS</label>
                          <ErrorMessage
                            name="doc_address"
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
                            type="date"
                            className="form-control"
                            id="exam_date"
                            name="exam_date"
                            placeholder="DEPARTING"
                          />
                          <label htmlFor="exam_date">
                            DATE OF MEDICAL EXAMINATION
                          </label>
                          <ErrorMessage
                            name="exam_date"
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
                            as="select"
                            className="form-select"
                            id="company_name"
                            name="company_name"
                          >
                            <option value="">
                              Open this select menu to select company
                            </option>
                            <option value="">Select a company</option>
                            {companies.map((company) => (
                              <option key={company.id} value={company.name}>
                                {company.name}
                                {"  "} - {company.company_code}
                              </option>
                            ))}
                          </Field>
                          <label htmlFor="company_name">COMPANY</label>
                          <ErrorMessage
                            name="company_name"
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
                          <input
                            type="file"
                            className="form-control"
                            id="fileInput"
                            name="fileInput"
                            onChange={(event) => {
                              setFieldValue(
                                "fileInput",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <label for="fileInput">CLIENTS CSV</label>
                          <ErrorMessage
                            name="fileInput"
                            component="div"
                            style={{
                              color: "red",
                            }}
                            className="error-message"
                          />
                        </div>
                      </div>

                      <div className="col-12 mt-4">
                        <button
                          className="btn btn-primary text-uppercase"
                          disabled={isPrinting}
                          style={{
                            borderRadius: "20px",
                            fontWeight: "bold",
                          }}
                          type="submit"
                        >
                          PRINT CERTIFICATES {"  "}
                          <i className="fa fa-print"></i>
                        </button>

                        {/* <button onClick={handlePrintProfessionalAll}>
                        Prriii
                    </button> */}
                      </div>
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

export default MedicalsCertificates;
