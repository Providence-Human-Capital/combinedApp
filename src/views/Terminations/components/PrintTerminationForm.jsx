import React, { forwardRef, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { printActions } from "../../../store/prints";
import { Link } from "react-router-dom";
import TerminationDocumentPrint from "../prints/TerminationDocumentPrint";

const TerminationFormPrint = forwardRef(({ company, clients }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "0",
      }}
    >
      {clients &&
        clients.map((client, index) => (
          <div
            key={index}
            style={{
              marginTop: index >= 1 ? "0" : "4rem",
            }}
          >
            <TerminationDocumentPrint
              company={company}
              client={client}
              index={index}
            />
          </div>
        ))}
    </div>
  );
});

const PrintTerminationForm = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);

  const clients = useSelector((state) => state.print.currentTF);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    company: Yup.string().required(
      "Please  Select Form Type (Innscor/ Simbisa / Umbrella)"
    ),
    fileInput: Yup.mixed().required(
      "Select The CSV File With All The Employee Information"
    ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setIsPrinting(true);
    dispatch(printActions.clearOnLoad());
    setExamData(values);
    Papa.parse(values.fileInput, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnData = [];
        const namesData = [];

        result.data.map((d) => {
          columnData.push(Object.keys(d));
          namesData.push(Object.values(d));
        });

        const convertedData = namesData.map((dataItem) => {
          return {
            employee_no: dataItem[0],
            surname: dataItem[1],
            first_name: dataItem[2],
            date_joined_fund: dataItem[3],
            termination_date: dataItem[4],
            date_of_birth: dataItem[5],
            address: dataItem[6],
            address1: dataItem[7],
            address2: dataItem[8],
            email: dataItem[9],
            national_id: dataItem[10],
            bank_name: dataItem[11],
            branch_code: dataItem[12],
            account_number: dataItem[13],
            employer: dataItem[14],
            sex: dataItem[15],
            pension_ref: dataItem[16],
            mobile: dataItem[17],
            marital_status: dataItem[18],
            leaving_reason: dataItem[19],
          };
        });
        setColumnArray(columnData[0]);
        setCsvData(convertedData);
        dispatch(
          printActions.setCurrentPrintTerminationForms({
            currentTF: convertedData,
          })
        );
        console.log(convertedData);
      },
    });
  };
  const handlePrintTerminationPrint = () => {
    console.log("Termination Ref:", terminationRef.current); // Check if terminationRef is correctly set
    if (terminationRef.current) {
      Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: `Are you sure you are ready to print all ${csvData.length} termination forms`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          // Trigger printing only if the ref is valid
          handlePrintTerminationPrintF();
        } else {
          // Handle cancel logic if needed
        }
      });
    } else {
      console.error("Termination Ref is not set or is null.");
    }
  };

  const terminationRef = useRef();
  const handlePrintTerminationPrintF = useReactToPrint({
    content: () => terminationRef.current,
  });

  return (
    <>
      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        <TerminationFormPrint
          ref={terminationRef}
          company={examData}
          clients={csvData}
        />
      </div>
      <div className="row">
        <Formik
          initialValues={{
            company: "",
            fileInput: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="card p-4 mt-5">
                <div className="row g-3">
                  <div className="col-12 mb-4">
                    <h2
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Printing Termination Forms{" "}
                    </h2>
                    <span className="text-muted">
                      Please make sure that you upload the csv files containing
                      all the names and don't forget the company and any
                      neccessary information as per template
                    </span>
                    <h4>
                      {" "}
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        NB:
                      </span>{" "}
                      Please make sure the file that you are uploading is a CSV
                      file{" "}
                    </h4>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-12">
                      <div className="form-floating">
                        <Field
                          as="select"
                          className="form-select"
                          id="company"
                          name="company"
                        >
                          <option value=""></option>
                          <option
                            value="SIMBISA"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            SIMBISA
                          </option>
                          <option
                            value="UMBRELLA"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            UMBRELLA
                          </option>
                          <option
                            value="INNSCOR"
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            INNSCOR
                          </option>
                        </Field>
                        <label htmlFor="company">FORM TYPE</label>
                        <ErrorMessage
                          name="company"
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
                        <input
                          type="file"
                          className="form-control"
                          id="fileInput"
                          name="fileInput"
                          accept=".csv"
                          onChange={(event) => {
                            setFieldValue(
                              "fileInput",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        <label for="fileInput">
                          EMPLOYEE CSV (Make sure the file is a csv file)
                        </label>
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
                    <div className="space"></div>
                    <div className="col-12 mt-4">
                      <button
                        className="btn btn-primary text-uppercase"
                        disabled={isPrinting}
                        style={{
                          borderRadius: "10px",
                        }}
                        type="submit"
                      >
                        LOAD EMPLOYEES {"  "}
                        <i className="fa fa-print"></i>
                      </button>
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
                      Note that you can only print the forms if you have
                      successfully loaded the names{" "}
                    </h4>
                    <div>
                      <button
                        className="btn btn-primary text-uppercase"
                        onClick={handlePrintTerminationPrint}
                        disabled={csvData.length <= 0}
                        style={{
                          borderRadius: "10px",
                        }}
                      >
                        PRINT CERTIFICATES NOW
                        <i className="fa fa-print"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className="row"></div>
        <div className="box">
          <div className="box-header no-border">
            <h4
              className="box-title"
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Certificates Awaiting Printing
            </h4>
          </div>
          <div className="box-body pt-0">
            <div className="row mt-25">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="bb-2">DATE OF TERMINATION</th>
                      <th className="bb-2">FIRST NAME</th>
                      <th className="bb-2">SURNAME</th>
                      <th className="bb-2">PHONE NUMBER</th>
                      <th className="bb-2">COMPANY</th>
                      <th className="bb-2">PENSION REF NO.</th>
                      <th className="bb-2">LEAVING REASON</th>
                      <th className="bb-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* date_of_termination */}
                    {clients &&
                      clients.map((client, index) => (
                        <tr key={index}>
                          <td>{client.termination_date}</td>
                          <td>{client.first_name}</td>
                          <td>{client.surname}</td>
                          <td>{client.mobile}</td>
                          <td>{client.employer}</td>
                          <td>{client.pension_ref}</td>
                          <td>
                            <span className="badge badge-primary">
                              {client.leaving_reason}
                            </span>
                          </td>

                          <td>
                            <Link to={`/print/beneficiary/document/${index}`}>
                              <button
                                className="btn btn-primary"
                                style={{
                                  borderRadius: "10px",
                                }}
                              >
                                BCF PRINT
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintTerminationForm;
