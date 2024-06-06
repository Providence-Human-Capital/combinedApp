import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import * as Yup from "yup";
import Papa from "papaparse";
import Swal from "sweetalert2";
import { hrActions } from "../../../store/hr";

const EmployeeTerminationForm = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    logo: Yup.string().required("Please Choose Logo "),
    fileInput: Yup.mixed().required("CSV FILE FOR DATA FORM IS REQUIRED"),
  });

  const handleSubmit = (values) => {
    setIsPrinting(true);
    dispatch(hrActions.clearTerminationsEmployees());
    setExamData(values);
    Papa.parse(values.fileInput, {
      header: true,
      skipEmptyLines: false,
      complete: function (result) {
        const columnData = [];
        const namesData = [];

        result.data.forEach((d) => {
          columnData.push(Object.keys(d));
          namesData.push(Object.values(d));
        });
        const convertedData = namesData.map((dataItem) => {
          return {}; // Adjust this to map dataItem to your desired format
        });
        setColumnArray(columnData[0]);
        setCsvData(convertedData);
        dispatch(
          hrActions.setEmployeesForTerminations({
            terminationsEmployees: convertedData,
          })
        );
      },
    });
  };

  const handlePrintDataFormPrint = () => {
    if (dataformRef.current) {
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
          handlePrintTerminationForms();
        } else {
          // Handle cancel logic if needed
        }
      });
    } else {
      console.error("Termination Ref is not set or is null.");
    }
  };

  const dataformRef = useRef();
  const handlePrintTerminationForms = useReactToPrint({
    content: () => dataformRef.current,
  });

  return (
    <>
      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        This is where the print will go
      </div>
      <section className="content">
        <div className="row">
          <Formik
            initialValues={{
              logo: "",
              fileInput: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
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
                        Printing Employee Termination  Forms
                      </h2>
                      <span className="text-muted">
                        Please make sure that you upload the csv files
                        containing all the names and don't forget the data form
                        type and any necessary information as per template
                      </span>
                      <h4>
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          NB:
                        </span>{" "}
                        Please make sure the file that you are uploading is a
                        CSV file
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-12">
                        <div className="form-floating">
                          <Field
                            as="select"
                            name="logo"
                            className="form-select"
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
                          <label htmlFor="logo">SELECT A LOGO</label>
                          <ErrorMessage
                            name="logo"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-floating">
                          <input
                            id="fileInput"
                            name="fileInput"
                            type="file"
                            className="form-control"
                            onChange={(event) => {
                              setFieldValue(
                                "fileInput",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <label htmlFor="fileInput">CSV File</label>

                          <ErrorMessage
                            name="fileInput"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        disabled={isPrinting}
                        style={{
                          borderRadius: "10px",
                        }}
                        type="submit"
                        className="btn btn-primary text-uppercase"
                      >
                        LOAD EMPLOYEES {"  "}
                        <i className="fa fa-print"></i>
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

export default EmployeeTerminationForm;
