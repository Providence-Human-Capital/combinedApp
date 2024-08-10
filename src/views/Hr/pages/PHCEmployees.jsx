import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { API } from "../../../../config";
import { useQuery } from "react-query";
import { fetchPHCEmployees } from "../../../services/api";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading.jsx/Loading";

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

const PHCEmployees = () => {
  const user = useSelector((state) => state.auth.user);
  const [isFetching, setIsFetching] = useState(false);

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
    refetchEmpData();
  };

  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;

  const {
    data: phcEmployees,
    error: phcEmployeesError,
    isLoading: phcEmployeesLoading,
    refetch: refetchEmpData,
  } = useQuery("phcEmployees", () => fetchPHCEmployees(74));

  const {
    data: filterPhcEmployees,
    error: filterPhcEmployeesError,
    isLoading: filterPhcEmployeesLoading,
    refetch: filterPhcEmployeesRefetch,
  } = useQuery(
    ["filterPhcEmployees", filters],
    () => fetchFilterPhcEmployees(),
    {
      enabled: false,
    }
  );

  const fetchFilterPhcEmployees = async (filters) => {
    try {
      setIsFetching(true);
      const response = await axios.post(
        `${API}/api/phc/employees/${74}`,
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

  const handleDelete = async (id) => {
    if (user.role !== "admin") {
      Swal.fire({
        title: "Administrator Rights Required",
        text: "You are not allowed to perform this operation",
        icon: "info",
      });
      return;
    }

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

        if (response.status === 200) {
          console.log(response);
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
          refetchNewData();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the item.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the item.",
          icon: "error",
        });
      }
    }
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
    filterPhcEmployeesRefetch();
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentEmployees = filterPhcEmployees
    ? filterPhcEmployees.slice(
        currentPage * employeesPerPage,
        (currentPage + 1) * employeesPerPage
      )
    : phcEmployees
    ? phcEmployees.slice(
        currentPage * employeesPerPage,
        (currentPage + 1) * employeesPerPage
      )
    : [];

  if (phcEmployeesLoading) return <Loading />;
  if (phcEmployeesError) return <Error message={phcEmployeesError.message} />;
  if (filterPhcEmployeesError)
    return <Error message={filterPhcEmployeesError.message} />;

  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "auto",
    },
  };

  return (
    <>
      <BreadCrumb
        title={"PROVIDENCE HUMAN CAPITAL"}
        activeTab={"ACTIVE EMPLOYEES"}
      />

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
                  SEARCH EMPLOYEES
                </h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
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

          <div className="col-md-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex"></div>
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
                        <th className="bb-2">DEPARTMENT</th>
                        <th className="bb-2">DATE OF BIRTH</th>
                        <th className="bb-2">NATIONALITY</th>
                        <th className="bb-2">POSITION</th>
                        <th className="bb-2">MARITAL STATUS</th>
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
                          <td>
                            <span
                              className="badge badge-secondary"
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                              }}
                            >
                              {employee.department}
                            </span>
                          </td>
                          <td>{employee.date_of_birth}</td>
                          <td>{employee.nationality}</td>
                          <td>
                            <span
                              className="badge badge-primary"
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                              }}
                            >
                              {employee.occupation}
                            </span>
                          </td>
                          <td>{employee.marital_status}</td>
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
                              className="badge badge-warning"
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
                    filterPhcEmployees
                      ? Math.ceil(filterPhcEmployees.length / employeesPerPage)
                      : Math.ceil(phcEmployees.length / employeesPerPage)
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

export default PHCEmployees;
