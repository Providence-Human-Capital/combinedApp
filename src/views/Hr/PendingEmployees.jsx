import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Error from "../../components/Error/Error";
import { fetchNewEmployees } from "../../services/api";
import { API } from "../../../config";
import Loading from "../../components/Loading.jsx/Loading";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";

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

const areaOfSpecialization = [
  "GENERAL WORK",
  "ADMIN AND OFFICE",
  "AGRICULTURE, FARMING",
  "APPRENTICESHIP",
  "ATTACHMENT & INTERNSHIP",
  "BANKING",
  "CARPENTRY, DESIGN & TEXTILE",
  "NURSING",
  "CONSTRUCTION",
  "CONSULTANCY, RESEARCH",
  "DRIVING & LOGISTICS",
  "EDUCATION & TEACHING",
  "ENGINEERING",
  "ENVIRONMENTAL, FORESTRY",
  "HEALTHCARE",
  "PHARMACY",
  "ICT & COMPUTERS",
  "INSURANCE",
  "LEGAL & COMPLIANCE",
  "LIBRARY & RECORD MANAGEMENT",
  "MANUFACTURING",
  "MEDIA",
  "PUBLIC RELATIONS",
  "GRAPHIC DESIGN",
  "MINING",
  "NGO & SOCIAL SERVICES",
  "PROCUREMENT, PURCHASING & SUPPLY CHAIN MANAGEMENT",
  "REAL ESTATE",
  "RETAIL",
  "SALE & MARKETING",
  "SECURITY",
  "SPORTS & RECREATION",
  "STORES & WAREHOUSE",
  "STRATEGIC MANAGEMENT",
  "STUDENT LOANS",
  "TENDERS",
  "TOURISM",
  "HOSPITALITY",
  "NURSE AID",
  "PAINTING",
  "SOFTWARE DEVELOPER",
  "CYBER SECURITY",
  "ARCHITECTURE",
  "ART & DESIGN",
  "AVIATION",
  "BIOTECHNOLOGY",
  "CHEMICAL ENGINEERING",
  "CIVIL ENGINEERING",
  "CUSTOMER SERVICE",
  "DATA ANALYSIS",
  "DATA SCIENCE",
  "ELECTRICAL ENGINEERING",
  "ELECTRONICS",
  "EMERGENCY SERVICES",
  "ENERGY SECTOR",
  "EVENT MANAGEMENT",
  "FASHION & BEAUTY",
  "FINANCE",
  "FOOD & BEVERAGE",
  "GAMING",
  "GEOLOGY",
  "HEALTH & SAFETY",
  "HUMAN RESOURCES",
  "INTERIOR DESIGN",
  "JOURNALISM",
  "LANGUAGE & LINGUISTICS",
  "MANAGEMENT CONSULTING",
  "MARINE BIOLOGY",
  "MATERIALS SCIENCE",
  "MECHANICAL ENGINEERING",
  "MEDICAL RESEARCH",
  "MUSIC & PERFORMING ARTS",
  "OCEANOGRAPHY",
  "OPERATIONS MANAGEMENT",
  "PHOTOGRAPHY",
  "PHYSICAL THERAPY",
  "POLITICAL SCIENCE",
  "PROJECT MANAGEMENT",
  "PSYCHOLOGY",
  "QUALITY ASSURANCE",
  "QUANTITY SURVEYING",
  "RENEWABLE ENERGY",
  "RESEARCH & DEVELOPMENT",
  "SCIENCE & TECHNOLOGY",
  "SOCIAL MEDIA MANAGEMENT",
  "SOCIOLOGY",
  "TELECOMMUNICATIONS",
  "TRANSPORTATION",
  "URBAN PLANNING",
  "VETERINARY SCIENCE",
  "VIDEO PRODUCTION",
  "WATER MANAGEMENT",
  "WEB DEVELOPMENT",
  "WRITING & EDITING",
  "ZOOLOGY",
];

const fetchFilteredEmployees = async (filters) => {
  try {
    const response = await axios.post(`${API}/api/employee-records`, filters);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch filtered employees");
  }
};

const PendingEmployees = () => {
  const [filters, setFilters] = useState({
    gender: "",
    marital_status: "",
    education_level: "",
    area_of_expertise: "",
    name: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;

  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "auto",
    },
  };

  const {
    data: newEmployees,
    error: newEmployeesError,
    isLoading: newEmployeesLoading,
  } = useQuery("newEmployees", fetchNewEmployees);

  const {
    data: filteredEmployees,
    error: filteredError,
    isLoading: filteredLoading,
    refetch: refetchFilteredData,
  } = useQuery(
    ["filteredEmployees", filters],
    () => fetchFilteredEmployees(filters),
    {
      enabled: false,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refetchFilteredData();
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentEmployees = filteredEmployees
    ? filteredEmployees.slice(currentPage * employeesPerPage, (currentPage + 1) * employeesPerPage)
    : newEmployees
    ? newEmployees.slice(currentPage * employeesPerPage, (currentPage + 1) * employeesPerPage)
    : [];

  if (newEmployeesLoading) return <Loading />;
  if (newEmployeesError) return <Error message={newEmployeesError.message} />;
  if (filteredError) return <Error message={filteredError.message} />;

  const flattenDeployedEmployeesForReport = (deployeedEmp) => {
    return deployeedEmp.map((emp) => {
      const flattenedData = {
        "FIRST NAME": emp.first_name,
        "LAST NAME": emp.last_name,
        "DATE OF BIRTH": emp.date_of_birth,
        GENDER: emp.gender,
        "NATIONAL ID": emp.national_id,
        NATIONALITY: emp.nationality,
        "MARITAL STATUS": emp.marital_status,
        ADDRESS: emp.address,
        "PHONE NUMBER": emp.phone_number,
        "AREAS OF EXPERTISES": emp.area_of_expertise,
        "EDUCATION LEVEL": emp.education_level,
        EMAIL: emp.email,
      };

      return flattenedData;
    });
  };

  const exportData = flattenDeployedEmployeesForReport(newEmployees);
  const handleExportToExcel = () => {
    exportToExcel(exportData, "JobApplications.xlsx");
  };


  return (
    <>
     <BreadCrumb title={"New Employees"} activeTab={"Employees"} />
      <section className="content">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  FILTER OUT EMPLOYEES INFORMATION
                </h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={filters.name}
                          onChange={handleChange}
                        />
                        <label htmlFor="name">
                          SEARCH BY FIRST NAME / LAST NAME
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-floating">
                        <select
                          name="gender"
                          className="form-select"
                          value={filters.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <label htmlFor="gender">Gender:</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          name="marital_status"
                          className="form-select"
                          value={filters.marital_status}
                          onChange={handleChange}
                        >
                          <option value="">SELECT MARITAL STATUS</option>
                          <option value="SINGLE">SINGLE</option>
                          <option value="MARRIED">MARRIED</option>
                          <option value="DIVORCED">DIVORCED</option>
                          <option value="WIDOWED">WIDOWED</option>
                        </select>
                        <label htmlFor="marital_status">Marital Status:</label>
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          name="education_level"
                          className="form-select"
                          value={filters.education_level}
                          onChange={handleChange}
                        >
                          <option value="">EDUCATION LEVEL</option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="ZJC">
                            Zimbabwe Junior Certificate (ZJC)
                          </option>
                          <option value="Ordinary Level">
                            Ordinary Level (O Level)
                          </option>
                          <option value="Advanced Level">
                            Advanced Level (A Level)
                          </option>
                          <option value="National Certificate">
                            National Certificate (NC)
                          </option>
                          <option value="National Diploma">
                            National Diploma (ND)
                          </option>
                          <option value="Higher National Diploma">
                            Higher National Diploma (HND)
                          </option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Diploma">Diploma</option>
                          <option value="Master's Degree">
                            Master's Degree
                          </option>
                          <option value="Doctoral Degree">PhD</option>
                          <option value="Professional Certifications">
                            Professional Certifications
                          </option>
                        </select>
                        <label htmlFor="education_level">
                          Education Level:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          name="area_of_expertise"
                          className="form-select"
                          value={filters.area_of_expertise}
                          onChange={handleChange}
                        >
                          <option value="">SELECT AREA OF EXPERTISE</option>
                          {areaOfSpecialization.map((aos) => (
                            <option key={aos} value={aos}>
                              {aos}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="area_of_expertise">
                          Area of Expertise:
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>
                  {filteredLoading ? (
                    <Loading />
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      Apply Filters
                   
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <Link to={`/add/employee`}>
                      <button className="btn btn-secondary">
                        ADD EMPLOYEE
                      </button>
                    </Link>
                    <Link to={`/employees/upload`}>
                      <button className="btn btn-primary">
                        UPLOAD THROUGH EXCEL
                      </button>
                    </Link>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleExportToExcel}
                  >
                    EXPORT EXCEL
                  </button>
                </div>
                <div
                  className="table-responsive rounded card-table"
                  style={styles.containerStyles}
                >
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="bb-2">FIRST NAME</th>
                        <th className="bb-2">LAST NAME</th>
                        <th className="bb-2">GENDER</th>
                        <th className="bb-2">NATIONAL ID</th>
                        <th className="bb-2">DATE OF BIRTH</th>
                        <th className="bb-2">NATIONALITY</th>
                        <th className="bb-2">MARITAL STATUS</th>
                        <th className="bb-2">ADDRESS</th>
                        <th className="bb-2">PHONE NUMBER</th>
                        <th className="bb-2">EMAIL</th>
                        <th className="bb-2">STATUS</th>
                        <th className="bb-2"></th>
                        <th className="bb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEmployees.map((employee) => (
                        <tr key={employee.id}>
                          <td style={{ cursor: "pointer" }}>
                            <Link
                              to={`/applicant/detail/${employee.id}`}
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {employee.first_name}
                            </Link>
                          </td>
                          <td style={{ cursor: "pointer" }}>
                            <Link
                              to={`/applicant/detail/${employee.id}`}
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {employee.last_name}
                            </Link>
                          </td>
                          <td>{employee.gender}</td>
                          <td>{employee.national_id}</td>
                          <td>{employee.date_of_birth}</td>
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
                            {employee.email}
                          </td>
                          <td>
                            <span className="badge badge-warning">
                              {employee.status}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/applicant/detail/${employee.id}`}
                              className="waves-effect waves-light btn btn-primary-light btn-circle"
                            >
                              <span className="icon-Settings-1 fs-18"></span>
                            </Link>
                            <Link
                              to={`/employee/update/${employee.id}`}
                              className="waves-effect waves-light btn btn-primary-light btn-circle mx-5"
                            >
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
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={
                    filteredEmployees
                      ? Math.ceil(filteredEmployees.length / employeesPerPage)
                      : Math.ceil(newEmployees.length / employeesPerPage)
                  }
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
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

export default PendingEmployees;