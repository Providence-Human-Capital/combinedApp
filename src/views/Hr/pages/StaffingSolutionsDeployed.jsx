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
import useOccupations from "../hooks/useOccupations";
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
// deployed-records

const fetchDeployedEmployees = async () => {
  const response = await axios.get(`${API}/api/deployed-employees`);
  console.log("Deployed Employees", response.data.data);
  return response.data.data;
};

const fetchFilterDeployeedEmployees = async (filters) => {
  try {
    const response = await axios.post(`${API}/api/deployed-records`, filters);
    return response.data.data;
  } catch (error) {
    // throw new Error("Failed to fetch filtered employees");
    console.log(error);
  }
};

const StaffingSolutionsDeployed = () => {
  const {
    data: occupations,
    error: occupationsError,
    isLoading: occupationsLoading,
  } = useOccupations();

  const [filters, setFilters] = useState({
    gender: "",
    marital_status: "",
    education_level: "",
    area_of_expertise: "",
    name: "",
    company_id: "",
    occupation: "",
    min_age: "",
    max_age: "",
  });

  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "auto",
    },
  };

  const {
    data: deployedEmployees,
    error: deployeedEmployeesError,
    isLoading: deployedEmployeesLoading,
  } = useQuery("deployedEmployees", fetchDeployedEmployees);

  const {
    data: filteredEmployees,
    error: filteredError,
    isLoading: filteredLoading,
    refetch: refetchFilteredData,
  } = useQuery(
    ["filteredEmployees", filters],
    () => fetchFilterDeployeedEmployees(filters),
    {
      enabled: false,
    }
  );

  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * employeesPerPage;
  // const currentEmployees = deployedEmployees
  //   ? deployedEmployees.slice(offset, offset + employeesPerPage)
  //   : [];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compute age_range and update filters
    const updatedFilters = {
      ...filters,
      age_range: filters.min_age + "-" + filters.max_age,
    };
    setFilters(updatedFilters);
    refetchFilteredData();
  };

  const currentEmployees = filteredEmployees
    ? filteredEmployees.slice(
        currentPage * employeesPerPage,
        (currentPage + 1) * employeesPerPage
      )
    : deployedEmployees
    ? deployedEmployees.slice(
        currentPage * employeesPerPage,
        (currentPage + 1) * employeesPerPage
      )
    : [];

  if (deployedEmployeesLoading) return <Loading />;
  if (deployeedEmployeesError)
    return <Error message={deployeedEmployeesError.message} />;
  if (filteredError) return <Error message={filteredError.message} />;

  if (deployedEmployeesLoading)
    return (
      <>
        <div className="content">
          <div className="row">
            <Loading />
          </div>
        </div>
      </>
    );
  // if (error) return <Error message={error.message} />;

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

  const exportData = flattenDeployedEmployeesForReport(currentEmployees);
  const handleExportToExcel = () => {
    exportToExcel(exportData, "DeployedEmployees.xlsx");
  };

  return (
    <>
      <BreadCrumb
        title={"Deployed Employees"}
        activeTab={"Staffing Solutions"}
      />
      <section className="content">
        <div className="row">
          <div className="col-md-12">
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
                          onChange={handleFilterChange}
                        />
                        <label htmlFor="name">
                          SEARCH BY FIRST NAME / LAST NAME
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="company_id"
                          className="form-control"
                          value={filters.company_id}
                          onChange={handleFilterChange}
                        />
                        <label htmlFor="name">COMPANY</label>
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
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <label htmlFor="gender">Gender:</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          name="marital_status"
                          className="form-select"
                          value={filters.marital_status}
                          onChange={handleFilterChange}
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
                    <div className="col-md-4">
                      <div className="form-floating">
                        {/* <input
                          type="text"
                          name="occupation"
                          className="form-control"
                          value={filters.occupation}
                          onChange={handleFilterChange}
                        /> */}
                        <select
                          name="occupation"
                          className="form-select"
                          value={filters.occupation}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Occupation</option>
                          { occupationsLoading ? (
                            <option>Loading .....</option>
                          ): occupationsError ? (
                            <option>Error loading companies</option>
                          ): (
                            occupations.map((occ, index) => (
                              <option key={index} value={occ}>
                                {occ}
                              </option>
                            ))
                           
                          )}
                        </select>
                        <label htmlFor="occupation">OCCUPATION</label>
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          name="education_level"
                          className="form-select"
                          value={filters.education_level}
                          onChange={handleFilterChange}
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
                    <div className="col-md-4">
                      <div className="form-floating">
                        <select
                          name="area_of_expertise"
                          className="form-select"
                          value={filters.area_of_expertise}
                          onChange={handleFilterChange}
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
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="minAge"
                          name="min_age"
                          value={filters.min_age}
                          onChange={handleFilterChange}
                        />
                        <label htmlFor="minAge">MINIMUM AGE:</label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="maxAge"
                          name="max_age"
                          value={filters.max_age}
                          onChange={handleFilterChange}
                        />
                        <label htmlFor="maxAge">MAXIMUM AGE:</label>
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
                            <td>
                              <span className="badge badge-primary">
                                {employee.company?.name}
                              </span>
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
                              <span className="badge badge-dark">
                                {employee.occupation}
                              </span>
                            </td>
                            <td>
                              <span className="badge badge-success">
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
                                to={`/`}
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
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  // pageCount={Math.ceil(
                  //   deployedEmployees.length / employeesPerPage
                  // )}
                  pageCount={
                    filteredEmployees
                      ? Math.ceil(filteredEmployees.length / employeesPerPage)
                      : Math.ceil(deployedEmployees.length / employeesPerPage)
                  }
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
