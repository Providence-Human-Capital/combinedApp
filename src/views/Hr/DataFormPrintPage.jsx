import React, { forwardRef, useRef, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { hrActions } from "../../store/hr";
import EmployeeDataFormPrintOut from "./printouts/EmployeeDataFormPrintOut";
import generatePDF from "react-to-pdf";

const EmployeeDataFormPrint = forwardRef(({ type, employees }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "0",
      }}
    >
      {employees &&
        employees.map((emp, index) => (
          <div
            style={{
              marginTop: index >= 1 ? "0" : "3rem",
            }}
          >
            <EmployeeDataFormPrintOut
              employee={emp}
              type={type}
              index={index}
            />
          </div>
        ))}
    </div>
  );
});

const DataFormPrintPage = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);
  const dispatch = useDispatch();

  const newEmployees = useSelector((state) => state.hr.newEmployees) || [];

  const validationSchema = Yup.object().shape({
    data_form_type: Yup.string().required("Examiner Name is required"),
    fileInput: Yup.mixed().required("CSV FILE FOR DATA FORM IS REQUIRED"),
  });

  const handleSubmit = (values, {}) => {
    setIsPrinting(true);
    dispatch(hrActions.clearOnLoad());
    setExamData(values);
    Papa.parse(values.fileInput, {
      header: true,
      skipEmptyLines: false,
      complete: function (result) {
        const columnData = [];
        const namesData = [];

        result.data.map((d) => {
          columnData.push(Object.keys(d));
          namesData.push(Object.values(d));
        });
        const convertedData = namesData.map((dataItem) => {
          return {
            first_name: dataItem[0],
            last_name: dataItem[1],
            nationa_id: dataItem[2],
            date_of_birth: dataItem[3],
            gender: dataItem[4],
            nationality: dataItem[5],
            marital_status: dataItem[6],
            address: dataItem[7],
            phone_number: dataItem[8],
            email: dataItem[9],
            bank_name: dataItem[10],
            account_number: dataItem[11],
          };
        });
        setColumnArray(columnData[0]);
        setCsvData(convertedData);
        dispatch(
          hrActions.setNewEmployees({
            newEmployees: convertedData,
          })
        );
        console.log(convertedData);
      },
    });
  };

  const handlePrintDataFormPrint = () => {
    if (dataformRef.current) {
      Swal.fire({
        icon: "warning",
        title: "Confirmation",
        text: `Are you sure you are ready to print all ${csvData.length} data forms`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          // Trigger printing only if the ref is valid
          handlePrintDataForm();
        } else {
          // Handle cancel logic if needed
        }
      });
    } else {
      console.error("Termination Ref is not set or is null.");
    }
  };
  const dataformRef = useRef();
  const handlePrintDataForm = useReactToPrint({
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
        <EmployeeDataFormPrint
          ref={dataformRef}
          employees={newEmployees}
          type={examData}
        />
      </div>
      <BreadCrumb
        title={"Employee Data Form"}
        activeTab={"Print Employee Data Form"}
      />
      <section className="content">
        <div className="row">
          <Formik
            initialValues={{
              data_form_type: "",
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
                        Printing Employee Data Forms{" "}
                      </h2>
                      <span className="text-muted">
                        Please make sure that you upload the csv files
                        containing all the names and don't forget the data form
                        type and any neccessary information as per template
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
                        Please make sure the file that you are uploading is a
                        CSV file{" "}
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="data_form_type"
                            name="data_form_type"
                          >
                            <option value=""></option>
                            <option
                              value="PROVIDENCE HUMAN CAPITAL"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              PROVIDENCE HUMAN CAPITAL
                            </option>
                            <option
                              value="STAFFING SOLUTIONS"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              STAFFING SOLUTIONS
                            </option>
                            <option
                              value="CAPRI"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              CAPRI
                            </option>
                          </Field>
                          <label htmlFor="data_form_type">
                            EMPLOYEE DATA FORM TYPE
                          </label>
                          <ErrorMessage
                            name="data_form_type"
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
                          onClick={handlePrintDataFormPrint}
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
          <div className="card">
            <div className="card-header no-border">
              <h4
                className="card-title"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Data Awaiting Printing
              </h4>
            </div>
            <div className="card-body pt-0">
              <div className="row mt-25">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="bb-2">FIRST NAME</th>
                        <th className="bb-2">LAST NAME</th>
                        <th className="bb-2">NATIONAL ID</th>
                        <th className="bb-2">DATE OF BIRTH</th>
                        <th className="bb-2">GENDER</th>
                        <th className="bb-2">NATIONALITY</th>
                        <th className="bb-2">MARITAL STATUS</th>
                        <th className="bb-2">HOME ADDRESS</th>
                        <th className="bb-2">PHONE NUMBER</th>
                        <th className="bb-2">EMAIL ADDRESS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newEmployees &&
                        newEmployees.map((emp, index) => (
                          <tr key={index}>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.nationa_id}</td>
                            <td>{emp.date_of_birth}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.nationality}</td>
                            <td>{emp.marital_status}</td>
                            <td>{emp.address}</td>
                            <td>{emp.phone_number}</td>
                            <td>{emp.email}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataFormPrintPage;
