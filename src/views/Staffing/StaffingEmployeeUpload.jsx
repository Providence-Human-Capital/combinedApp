import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import axios from "axios";
import { parse, format } from "date-fns";
import BreadCrumb from "../../components/BreadCrumb";
import useStaffingCompanies from "../Hr/hooks/useStaffingCompanies";
import { API } from "../../../config";

const StaffingEmployeeUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [successfulUploads, setSuccessfulUploads] = useState(0);
  const [examData, setExamData] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const dispatch = useDispatch();

  const { data: companies, error, isLoading } = useStaffingCompanies();

  const validationSchema = Yup.object().shape({
    // company: Yup.string().required("Select The Staffing Solutions Company"),
    company: Yup.string().nullable(),
    fileInput: Yup.mixed().required("CSV FILE FOR DATA FORM IS REQUIRED"),
    status: Yup.string().required("Select Employees Employment Status"),

    date_format: Yup.string().required("Please Select a Date format"),
  });

  const handleSubmit = (values, {}) => {
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
          let formattedDate = "";

          if (dataItem[5]) {
            const [month, day, year] = dataItem[5].split("/");
            const paddedMonth = month.length === 1 ? `0${month}` : month;
            const paddedDay = day.length === 1 ? `0${day}` : day;
            if (values.date_format === "date_1") {
              formattedDate = `${year}-${paddedMonth}-${paddedDay}`;
            } else if (values.date_format === "date_2") {
              formattedDate = `${year}-${paddedDay}-${paddedMonth}`;
            }
          } // Rearrange to yyyy-MM-dd
          return {
            first_name: dataItem[1],
            company_id: values.company,
            last_name: dataItem[0],
            employee_code: dataItem[2],
            national_id: dataItem[4],
            date_of_birth: formattedDate,
            gender: dataItem[6] === "M" ? "MALE" : "FEMALE",
            marital_status: dataItem[7],
            nationality: dataItem[8],
            payment_point: dataItem[9],
            email: dataItem[10],
            phone_number: dataItem[11],
            address: `${dataItem[12]} ${dataItem[13]} ${dataItem[14]}`,
            occupation: dataItem[15],
            status: values.status,
          };
        });
        setColumnArray(columnData[0]);
        setCsvData(convertedData);
      },
    });
  };

  const handleEmployeeUpload = async () => {
    setIsUploading(true);
    console.log("CSV DATA", csvData);
    try {
      const response = await axios.post(
        `${API}/api/staffing/csv/upload`,
        csvData
      );
      setSuccessfulUploads(response.data.successfulUploads);
    } catch (error) {
      console.error("Failed to upload employees", error);
    } finally {
      setIsUploading(false);
    }
  };

  const reloadOnNewUpload = () => {
    location.reload();
  };

  return (
    <>
      <BreadCrumb
        title={"Staffing Employees Upload"}
        activeTab={"Staffing Solutions"}
      />
      <section className="content">
        <div className="row">
          <Formik
            initialValues={{
              company: "",
              fileInput: null,
              status: "",

              date_format: "date_1",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <div className="card p-4 mt-5">
                  <div className="row g-3">
                    <div className="col-12 mb-4">
                      <button
                        className="btn btn-secondary"
                        onClick={reloadOnNewUpload}
                      >
                        <i class="fa fa-refresh" aria-hidden="true"></i> {"  "}
                        RELOAD FOR NEW UPLOAD
                      </button>
                      <h2
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Uploading Staffing Solutions Employees
                      </h2>
                      <span className="text-muted">
                        Please make sure that you upload the csv files
                        containing all the names and don't forget the data form
                        type and any necessary information as per template
                      </span>
                      <h4>
                        <span style={{ fontWeight: "bold" }}>NB:</span> Please
                        make sure the file that you are uploading is a CSV file
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-3 ">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="date_format"
                            name="date_format"
                          >
                            <option value=""></option>
                            <option value="date_1">YYYY-MM-DD</option>
                            <option value="date_2">YYYY-DD-MM</option>
                          </Field>
                          <label htmlFor="date_format" style={{
                            fontWeight: "bold",
                          }}>
                            SELECT DATE FORMAT (YYYY-MM-DD/YYYY-DD-MM)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="space"></div>
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="company"
                            name="company"
                          >
                            <option value="">Select Company</option>
                            {isLoading ? (
                              <option>Loading...</option>
                            ) : error ? (
                              <option>Error loading companies</option>
                            ) : (
                              companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                  {company.name}
                                </option>
                              ))
                            )}
                          </Field>
                          <label htmlFor="company">SELECT COMPANY</label>
                          <ErrorMessage
                            name="company"
                            component="div"
                            style={{ color: "red" }}
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="form-floating">
                          <Field
                            as="select"
                            className="form-select"
                            id="status"
                            name="status"
                          >
                            <option value=""></option>
                            <option value="New">NEW</option>
                            <option
                              value="Deployed"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Deployed
                            </option>
                            <option
                              value="Pending"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              <span className="badge badge-primary">
                                Pending
                              </span>
                            </option>
                            <option
                              value="Pending"
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Terminated
                            </option>
                          </Field>
                          <label htmlFor="status">
                            SELECT THE STATUS OF UPLOAD
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-4 col-md-12">
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
                          <label htmlFor="fileInput">UPLOAD CSV FILE</label>
                          <ErrorMessage
                            name="fileInput"
                            component="div"
                            style={{ color: "red" }}
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting || isUploading}
                        >
                          <i class="fa fa-exchange" aria-hidden="true"></i>{" "}
                          Parse CSV
                        </button>
                        <button
                          type="button"
                          className="btn btn-success ml-3"
                          onClick={handleEmployeeUpload}
                          disabled={isUploading}
                        >
                          <i class="fa fa-cloud-upload" aria-hidden="true"></i>{" "}
                          {isUploading ? "Uploading..." : "Upload Employees"}
                        </button>
                      </div>
                    </div>
                    {successfulUploads > 0 && (
                      <div className="row mt-4">
                        <div className="col-12">
                          <div className="alert alert-success">
                            Successfully uploaded {successfulUploads} employees.
                          </div>
                        </div>
                      </div>
                    )}
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
                Employees Waiting For Upload
              </h4>
            </div>
            <div className="card-body pt-0">
              <div className="row mt-25">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="bb-2">#</th>
                        <th className="bb-2">FIRST NAME</th>
                        <th className="bb-2">LAST NAME</th>
                        <th className="bb-2">EMPLOYEE NUMBER</th>
                        <th className="bb-2">NATIONAL ID</th>
                        <th className="bb-2">DATE OF BIRTH</th>
                        <th className="bb-2">GENDER</th>
                        <th className="bb-2">NATIONALITY</th>
                        <th className="bb-2">MARITAL STATUS</th>
                        <th className="bb-2">HOME ADDRESS</th>
                        <th className="bb-2">PHONE NUMBER</th>
                        <th className="bb-2">POSITION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csvData &&
                        csvData.map((emp, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.employee_code}</td>
                            <td>{emp.national_id}</td>
                            <td>{emp.date_of_birth}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.nationality}</td>
                            <td>{emp.marital_status}</td>
                            <td>{emp.address}</td>
                            <td>{emp.phone_number}</td>
                            <td>
                              <span className="badge badge-info">
                                {emp.occupation}
                              </span>
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
      </section>
    </>
  );
};

export default StaffingEmployeeUpload;
