import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import {
  fetchAttachmentEmployees,
  fetchTerminatedEmployees,
} from "../../../services/api";
import Loading from "../../../components/Loading.jsx/Loading";
import EmployeeExpertise from "../components/EmployeeExpertise";
import { API } from "../../../../config";
import useStaffingCompanies from "../hooks/useStaffingCompanies";

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
  "SHOP ASSISTANT",
  "BAKING",
  "CATERING",
  "TILL OPERATOR",
  "ACCOUNTING",
  "BANKING",
  "BOOKKEEPER",
  "CASHIER",
  "COMPUTER OPERATOR",
  "AEROSPACE ENGINEERING",
  "ARTIFICIAL INTELLIGENCE",
  "ASTROPHYSICS",
  "BIOINFORMATICS",
  "BLOCKCHAIN TECHNOLOGY",
  "CHEF",
  "COMPUTATIONAL LINGUISTICS",
  "CYTOTECHNOLOGY",
  "DENTISTRY",
  "E-COMMERCE",
  "ECONOMICS",
  "FORENSIC SCIENCE",
  "GENETICS",
  "HISTORICAL RESEARCH",
  "MARINE ENGINEERING",
  "MICROBIOLOGY",
  "NANOTECHNOLOGY",
  "NEUROSCIENCE",
  "PHOTONICS",
  "ROBOTICS",
  "SUSTAINABILITY MANAGEMENT",
  "TRUCK DRIVER",
  "WAITER",
  "MERCHANDISER",
  "ACCOUNTANT",
  "LABELLING MACHINE OPERATOR",
  "VERTERINARY",
  "CLEANER",
  "SHEQ",
  "LIFEGUARD",
  "SORTER",
  "FITNESS TRAINER"
];

const Attachments = () => {
  const [isFetching, setIsFetching] = useState(false);

  const {
    data: companies,
    error: companiesError,
    isLoading: companiesLoading,
  } = useStaffingCompanies();


  const [filters, setFilters] = useState({
    gender: "",
    marital_status: "",
    education_level: "",
    area_of_expertise: "",
    name: "",
    min_age: "",
    max_age: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;

  const {
    data: attachmentEmployees,
    error: attachmentError,
    isLoading: attachmentLoading,
    refetch: refetchAttachees,
  } = useQuery("attachmentEmployees", fetchAttachmentEmployees);

  const {
    data: filteredEmployees,
    error: filteredError,
    isLoading: filteredLoading,
    refetch: refetchFilteredData,
  } = useQuery(
    ["filteredAttachmentEmployees", filters],
    () => fetchFilteredEmployees(filters),
    {
      enabled: false,
    }
  );

  const fetchFilteredEmployees = async (filters) => {
    try {
      setIsFetching(true);
      const response = await axios.post(
        `${API}/api/attachment-employees`,
        filters
      );
      if (response.status === 200) {
        setIsFetching(false);
        return response.data.data;
      }
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filters.min_age && filters.max_age) {
      const updatedFilters = {
        ...filters,
        age_range: `${filters.min_age}-${filters.max_age}`,
      };
      setFilters(updatedFilters);
    }
    refetchFilteredData();
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentEmployees = filteredEmployees
    ? filteredEmployees.slice(
        currentPage * employeesPerPage,
        (currentPage + 1) * employeesPerPage
      )
    : attachmentEmployees
    ? attachmentEmployees.slice(
        currentPage * employeesPerPage,
        (currentPage + 1) * employeesPerPage
      )
    : [];

  if (attachmentLoading) return <Loading />;
  if (attachmentError) return <Error message={attachmentError.message} />;
  if (filteredError) return <Error message={filteredError.message} />;

  const flattenDeployedEmployeesForReport = (deployeedEmp) => {
    return deployeedEmp.map((emp) => ({
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
    }));
  };

  const exportData = flattenDeployedEmployeesForReport(filteredEmployees || []);
  const handleExportToExcel = () => {
    exportToExcel(exportData, "FiltererdAttachmentEmployees.xlsx");
  };

  const exportData2 = flattenDeployedEmployeesForReport(attachmentEmployees);
  const handleExportAllToExcel = () => {
    exportToExcel(exportData2, "AllAttachmentEmployees.xlsx");
  };

  const updateCertificateStatus = async (employeeId) => {
    if (companiesLoading) {
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we fetch the companies.",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      return;
    }

    if (companiesError) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch companies. Please try again later.",
        icon: "error",
      });
      return;
    }

    const companyOptions = companies
      .map(
        (company) => `<option value="${company.id}">${company.name}</option>`
      )
      .join("");

    Swal.fire({
      title: "UPDATE THE EMPLOYEMENT STATUS OF EMPLOYEE",
      width: "700px",
      html: `
        <div class="form-floating">
          <select id="status-select" class="form-select">
            <option value="New">NEW</option>
            <option value="Pending">PENDING DEPLOYEMENT</option>
            <option value="Attachment">ON ATTACHMENT</option>
            <option value="Deployed">DEPLOY</option>
            <option value="Terminated">TERMINATED</option>
          </select>
          <label htmlFor="status-select">STATUS</label>
        </div>
        <div id="company-select-container" class="form-floating sep" style="display: none;">
          <select id="company-select" class="form-select">
            ${companyOptions}
          </select>
          <label htmlFor="company-select">COMPANY SELECT</label>
        </div>
        <p><strong>NB</strong>: Select A Company Where You Are Deploying To!</p>
      `,
      showCancelButton: true,
      confirmButtonText: "CHANGE STATUS",
      cancelButtonText: "CANCEL OPERATION",
      focusConfirm: false,
      didOpen: () => {
        const statusSelectElement = document.getElementById("status-select");
        const companySelectContainer = document.getElementById(
          "company-select-container"
        );

        statusSelectElement.addEventListener("change", () => {
          if (statusSelectElement.value === "Deployed") {
            companySelectContainer.style.display = "block";
          } else {
            companySelectContainer.style.display = "none";
          }
        });
      },
      preConfirm: () => {
        const statusSelectElement = document.getElementById("status-select");
        const selectedStatus = statusSelectElement.value;

        const companySelectElement = document.getElementById("company-select");
        const selectedCompany = companySelectElement
          ? companySelectElement.value
          : null;

        return { selectedStatus, selectedCompany };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { selectedStatus, selectedCompany } = result.value;

        try {
          await axios.post(
            `${API}/api/employee/change/status/${employeeId}`,
            {
              status: selectedStatus,
              company_id: selectedCompany,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          Swal.fire({
            title: "Status Updated",
            text: "The status has been updated successfully.",
            icon: "success",
          });

          setCurrentPage(0);
          if (
            filters.gender !== "" ||
            filters.marital_status !== "" ||
            filters.education_level !== "" ||
            filters.area_of_expertise !== "" ||
            filters.name !== "" ||
            filters.min_age !== "" ||
            filters.max_age !== "" ||
            filters.company_id !== "" ||
            filters.occupation !== ""
          ) {
            refetchFilteredData();
          } else {
            refetchAttachees();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to update the status. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleReset = () => {
    setFilters({
      gender: "",
      marital_status: "",
      education_level: "",
      area_of_expertise: "",
      name: "",
      min_age: "",
      max_age: "",
    });
    setCurrentPage(0);
    refetchAttachees();
  };

  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "auto",
    },
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API}/api/employee/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log(response);
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });

          if (
            filters.gender !== "" ||
            filters.marital_status !== "" ||
            filters.education_level !== "" ||
            filters.area_of_expertise !== "" ||
            filters.name !== "" ||
            filters.min_age !== "" ||
            filters.max_age !== "" ||
            filters.company_id !== "" ||
            filters.occupation !== ""
          ) {
            setCurrentPage(0);
            refetchFilteredData();
          } else {
            refetchAttachees();
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the item.",
            icon: "error",
          });
        }
      } catch (error) {
        console.log("This is the error", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the item.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <BreadCrumb title={"ATTACHMENT EMPLOYEES"} activeTab={"Interns"} />
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
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
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
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="minAge"
                          name="min_age"
                          value={filters.min_age}
                          onChange={handleChange}
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
                          onChange={handleChange}
                        />
                        <label htmlFor="maxAge">MAXIMUM AGE:</label>
                      </div>
                    </div>
                  </div>
                  <div className="space"></div>

                  {isFetching ? (
                    <Loading />
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      <i class="fa fa-filter" aria-hidden="true"></i> Apply
                      Filters
                    </button>
                  )}
                  {!isFetching && (
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={handleReset}
                    >
                      <i class="fa fa-refresh" aria-hidden="true"></i>
                      {"  "}
                      Reset Filter
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
                        <i class="fa fa-plus" aria-hidden="true"></i> ADD
                        EMPLOYEE
                      </button>
                    </Link>
                    <Link to={`/employees/upload`}>
                      <button className="btn btn-primary">
                        <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                        {"  "}
                        UPLOAD THROUGH EXCEL
                      </button>
                    </Link>
                  </div>
                  <div>
                    <button
                      className="btn btn-info"
                      onClick={handleExportAllToExcel}
                    >
                      <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                      {"  "}
                      EXPORT ALL TO EXCEL
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleExportToExcel}
                    >
                      <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                      {"  "}
                      EXPORT FILTER
                    </button>
                  </div>
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
                        <th className="bb-2">AREAS OF SPECIALIZATIONS</th>
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
                          <EmployeeExpertise employee={employee} />
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
                            <span
                              className="badge badge-dark"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                updateCertificateStatus(employee.id)
                              }
                            >
                              {employee.status}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/applicant/detail/${employee.id}`}
                              className="waves-effect waves-light btn btn-primary-light btn-circle"
                            >
                              <i class="fa fa-eye" aria-hidden="true"></i>
                            </Link>
                            <Link
                              to={`/employee/update/${employee.id}`}
                              className="waves-effect waves-light btn btn-primary-light btn-circle mx-5"
                            >
                              <i
                                class="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <button
                              className="waves-effect waves-light btn btn-danger-light btn-circle"
                              onClick={() => handleDelete(employee.id)}
                            >
                              <i class="fa fa-trash-o" aria-hidden="true"></i>
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
                      : Math.ceil(attachmentEmployees.length / employeesPerPage)
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

export default Attachments;
