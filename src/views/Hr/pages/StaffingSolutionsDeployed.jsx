import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Error from "../../../components/Error/Error";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";
import * as XLSX from "xlsx";
import ReactPaginate from "react-paginate";

const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Define column widths
  const columnWidths = [];
  Object.keys(data[0]).forEach((key) => {
    columnWidths.push({ wch: 20 }); // You can adjust the width as needed
  });
  worksheet["!cols"] = columnWidths;

  const workbook = XLSX.utils.book_new();
  const headerStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background color
  };

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
};

const fetchDeployedEmployees = async () => {
  const response = await axios.get(`${API}/api/deployed-employees`);
  console.log("Deployed Employees", response.data.data);
  return response.data.data;
};

const StaffingSolutionsDeployed = () => {
  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "auto",
    },
  };

  const {
    data: deployedEmployees,
    error,
    isLoading,
  } = useQuery("deployedEmployees", fetchDeployedEmployees);

  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * employeesPerPage;
  const currentEmployees = deployedEmployees
    ? deployedEmployees.slice(offset, offset + employeesPerPage)
    : [];

  if (isLoading)
    return (
      <>
        <div className="content">
          <div className="row">
            <Loading />
          </div>
        </div>
      </>
    );
  if (error) return <Error message={error.message} />;

  const flattenDeployedEmployeesForReport = (deployeedEmp) => {
    return deployeedEmp.map((emp) => {
      const flattenedData = {
        "EMPLOYEE NUMBER": emp.employee_code,
        "FIRST NAME": emp.first_name,
        "LAST NAME": emp.last_name,
        "DATE OF BIRTH": emp.date_of_birth,
        GENDER: emp.gender,
        "NATIONAL ID": emp.national_id,
        NATIONALITY: emp.nationality,
        "MARITAL STATUS": emp.marital_status,
        OCCUPATION: emp.occupation,
        COMPANY: emp.company?.name,
        ADDRESS: emp.address,
        "PHONE NUMBER": emp.phone_number,
        "AREA OF EXPERTISE": emp.area_of_expertise,
        "EDUCATION LEVEL": emp.education_level,
        EMAIL: emp.email,
      };

      return flattenedData;
    });
  };

  const exportData = flattenDeployedEmployeesForReport(deployedEmployees);
  const handleExportToExcel = () => {
    exportToExcel(exportData, "DeployedEmployees.xlsx");
  };

  return (
    <>
      <BreadCrumb title={"Deployed Employees"} activeTab={"Staffing Solutions"} />
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <Link to={`/add/employee`}>
                      <button className="btn btn-secondary">ADD EMPLOYEE</button>
                    </Link>
                    <Link to={`/employees/upload`}>
                      <button className="btn btn-primary">UPLOAD THROUGH EXCEL</button>
                    </Link>
                  </div>
                  <button className="btn btn-primary" onClick={handleExportToExcel}>
                    EXPORT EXCEL
                  </button>
                </div>
                <div className="table-responsive rounded card-table" style={styles.containerStyles}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="bb-2">FIRST NAME</th>
                        <th className="bb-2">LAST NAME</th>
                        <th className="bb-2">GENDER</th>
                        <th className="bb-2">NATIONAL ID</th>
                        <th className="bb-2">COMPANY</th>
                        <th className="bb-2">NATIONALITY</th>
                        <th className="bb-2">MARITAL STATUS</th>
                        <th className="bb-2">ADDRESS</th>
                        <th className="bb-2">PHONE NUMBER</th>
                        <th className="bb-2">OCCUPATION</th>
                        <th className="bb-2">STATUS</th>
                        <th className="bb-2"></th>
                        <th className="bb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEmployees &&
                        currentEmployees.map((employee) => (
                          <tr key={employee.id}>
                            <td
                              style={{
                                maxWidth: "150px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                              }}
                            >
                              <Link to={`/applicant/detail/${employee.id}`} style={{ color: "black", fontWeight: "bold" }}>
                                {employee.first_name}
                              </Link>
                            </td>
                            <td style={{ cursor: "pointer" }}>
                              <Link to={`/applicant/detail/${employee.id}`} style={{ color: "black", fontWeight: "bold" }}>
                                {employee.last_name}
                              </Link>
                            </td>
                            <td>{employee.gender}</td>
                            <td>{employee.national_id}</td>
                            <td>
                              <span className="badge badge-primary">{employee.company?.name}</span>
                            </td>
                            <td>{employee.nationality}</td>
                            <td>{employee.marital_status}</td>
                            <td
                              style={{
                                maxWidth: "120px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {employee.address}
                            </td>
                            <td>{employee.phone_number}</td>
                            <td
                              style={{
                                maxWidth: "150px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span className="badge badge-dark">{employee.occupation}</span>
                            </td>
                            <td>
                              <span className="badge badge-success">{employee.status}</span>
                            </td>
                            <td>
                              <Link
                                to={`/applicant/detail/${employee.id}`}
                                className="waves-effect waves-light btn btn-primary-light btn-circle"
                              >
                                <span className="icon-Settings-1 fs-18"></span>
                              </Link>
                              <Link to={`/`} className="waves-effect waves-light btn btn-primary-light btn-circle mx-5">
                                <span className="icon-Write"></span>
                              </Link>
                              <button className="waves-effect waves-light btn btn-primary-light btn-circle">
                                <span className="icon-Trash1 fs-18"></span>
                              </button>
                            </td>
                            <td>
                              <button className="waves-effect waves-light btn btn-primary-light btn-circle mx-5">
                                <i className="ti-printer"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={Math.ceil(deployedEmployees.length / employeesPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaffingSolutionsDeployed;
