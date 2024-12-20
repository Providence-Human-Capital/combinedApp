import React, { useState, useEffect, useRef, forwardRef } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import useEmployee from "../hooks/useEmployee";
import Loading from "../../../components/Loading.jsx/Loading";
import UploadEmployeeCV from "../components/UploadEmployeeCv";
import { API, IMAGE_URL } from "../../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import "./css/ImageContainer.css";

import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import styles from "./employee-css/styles.module.css";
import Qualifications from "../components/Qualifications";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import NextOfKinCard from "./Employee/components/NextOfKinCard";
import EmpHistoryCard from "./Employee/components/EmpHistoryCard";
import BankInfoCard from "./Employee/components/BankInfoCard";
import { useReactToPrint } from "react-to-print";
import ProfilePrintout from "../printouts/ProfilePrintout";

export const formatDate = (dateString, options) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};

export const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

const workerVersion = "3.12.0";

const Profile = forwardRef(({ employee, profileImg, employeeId }, ref) => {
  return (
    <div className="profile-printout" ref={ref}>
      <ProfilePrintout
        employee={employee}
        profileImg={profileImg}
        employeeId={employeeId}
      />
    </div>
  );
});

const ApplicantsDetailedPage = () => {
  const { applicantId } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const { data: employee, error, isLoading } = useEmployee(applicantId);
  const [selectedImage, setSelectedImage] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  const [editingDocId, setEditingDocId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const handleEditClick = (doc) => {
    setEditingDocId(doc.id);
    setNewDescription(doc.file_description || "");
  };

  const handleSaveDescription = async (docId, newDescription) => {
    try {
      // Log to see if newDescription has a value
      console.log("Updating description:", newDescription);

      // Make the PUT request to update the description
      const response = await fetch(
        `${API}/api/documents/${docId}/description`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file_description: newDescription }),
        }
      );

      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update file description"
        );
      }

      // Parse the JSON response
      const data = await response.json();

      // Log the response data for debugging
      console.log("Response data:", data);

      // Update the documents state with the new description
      // const updatedDocuments = documents.map((doc) =>
      //   doc.id === docId ? { ...doc, file_description: newDescription } : doc
      // );

      // setDocuments(updatedDocuments);
      setEditingDocId(null); // Exit editing mode
      Swal.fire("Success!", "File description updated.", "success");
    } catch (error) {
      console.error("Error updating description:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleDeleteClick = (docId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make the DELETE request to remove the document
          const response = await fetch(`${API}/api/documents/${docId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete the document");
          }

          // Update the documents state by removing the deleted document
          // const updatedDocuments = documents.filter((doc) => doc.id !== docId);
          // setDocuments(updatedDocuments);

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const companies = useSelector((state) => state.company.companies) || [];

  const printPersonsProfile = useRef();

  const handlePrintPersonsProfile = useReactToPrint({
    content: () => printPersonsProfile.current,
  });

  const uploadProfileImage = async ({ applicantId, formData }) => {
    const { data } = await axios.post(
      `${API}/api/employee/${applicantId}/profile/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(uploadProfileImage, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["employee", applicantId]);
    },
    onError: (error) => {
      alert(`Failed to upload image: ${error.message}`);
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    // Prepare form data
    const formData = new FormData();
    formData.append("image", file);

    // Call mutation
    mutation.mutate({ applicantId, formData });
  };
  const fetchEmployeeProfile = async (applicantId) => {
    try {
      // Perform API call or any other logic to fetch updated employee data
      const response = await fetch(
        `${API}/api/employee/${applicantId}/profile`
      );
      const data = await response.json();
      console.log("Employee Profile", data.data);
      setProfileImage(data.data);
      return data.data;
    } catch (error) {
      console.error("Error occurred while fetching employee data:", error);
      throw error;
    }
  };

  useEffect(() => {
    setEmployeeData(employee);

    fetchEmployeeProfile(applicantId);
  }, [employee]);

  const refetchEmployee = async () => {
    console.log("Refetching employee data...");
    try {
      // You can perform any necessary logic here before refetching data
      const updatedEmployee = await fetchEmployeeData(applicantId);
      console.log("Updated employee data:", updatedEmployee);
      setEmployeeData(updatedEmployee);
    } catch (error) {
      console.error("Error occurred while refetching employee data:", error);
    }
  };

  const handleEmployeeRefetch = () => {
    refetchEmployee();
  };

  const fetchEmployeeData = async (applicantId) => {
    try {
      // Perform API call or any other logic to fetch updated employee data
      const response = await fetch(`${API}/api/employee/${applicantId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error occurred while fetching employee data:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="content">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeployToWork = () => {
    const companyOptions = companies
      .map(
        (company) => `<option value="${company.id}">${company.name}</option>`
      )
      .join("");

    Swal.fire({
      title: `UPDATE THE EMPLOYMENT STATUS`,
      width: "700px",
      html: `
        <div class="form-floating">
          <select id="status-select" class="form-select">
            <option value="New">NEW</option>
            <option value="Pending">PENDING DEPLOYMENT</option>
            <option value="Attachment">ON ATTACHMENT</option>
            <option value="Active">DEPLOY</option>
            <option value="Terminated">TERMINATED</option>
          </select>
          <label for="status-select">STATUS</label>
        </div>
        <div id="company-select-container" style="display: none;">
          <div class="form-floating sep">
            <select id="company-select" class="form-select">
              ${companyOptions}
            </select>
            <label for="company-select">COMPANY SELECT</label>
          </div>
          <div class="form-floating mt-4">
            <input type="text" id="occupation" class="form-control" required>
            <label for="occupation">DEPLOYMENT POSITION</label>
          </div>
          <div class="form-floating mt-4">
            <input type="text" id="department" class="form-control" required>
            <label for="department">DEPARTMENT</label>
          </div>
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
          if (statusSelectElement.value === "Active") {
            companySelectContainer.style.display = "block";
          } else {
            companySelectContainer.style.display = "none";
          }
        });
      },
      preConfirm: () => {
        const statusSelectElement = document.getElementById("status-select");
        const selectedStatus = statusSelectElement.value;

        const occupationSelect = document.getElementById("occupation");
        const occupationDeploy = occupationSelect.value;

        const departmentSelect = document.getElementById("department");
        const departmentDeploy = departmentSelect.value;

        const companySelectElement = document.getElementById("company-select");
        const selectedCompany = companySelectElement
          ? companySelectElement.value
          : null;

        // Validation
        if (
          selectedStatus === "Active" &&
          (!selectedCompany || !occupationDeploy || !departmentDeploy)
        ) {
          Swal.showValidationMessage(
            "Please fill in all required fields for deployment."
          );
          return false;
        }

        return {
          selectedStatus,
          selectedCompany,
          occupationDeploy,
          departmentDeploy,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const {
          selectedStatus,
          selectedCompany,
          occupationDeploy,
          departmentDeploy,
        } = result.value;

        try {
          await axios.post(
            `${API}/api/employee/change/status/${applicantId}`,
            {
              status: selectedStatus,
              company_id: selectedCompany,
              department: departmentDeploy,
              occupation: occupationDeploy,
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

          refetchEmployee();
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `Failed to update the status. Error: ${error.message}`,
            icon: "error",
          });
        }
      }
    });
  };

  const handleViewProfileImage = () => {
    Swal.fire({
      width: "800px",
      showConfirmButton: false,
      imageUrl:
        `${IMAGE_URL}${profileImage?.image}` || "/assets/images/user.jpg",
      imageAlt: "Employee Profile Image",
      // Apply custom class to image
      customClass: {
        image: "custom-swal-image",
      },
    });

    // Add custom CSS for the image to fill the container
    Swal.update({
      html: `
        <style>
          .custom-swal-image {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Ensures the image covers the entire area */
            margin: "20px";
          }
          .swal2-image {
            width: 100% !important; /* Forces the image to take up 100% of the container */
            height: 100% !important;
            object-fit: cover; /* Ensures the image covers the entire area */
          }
        </style>
      `,
    });
  };

  return (
    <>
      <BreadCrumb
        title={"Deployed Employees"}
        activeTab={"Staffing Solutions"}
      />

      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        <Profile
          employee={employee}
          profileImg={profileImage}
          ref={printPersonsProfile}
          employeeId={employee.id}
        />
      </div>

      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20">
              <div>
                <>
                  <Link to={`/employee/update/${employee.id}`}>
                    <button
                      className="btn btn-secondary"
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      {" "}
                      <i
                        className="ti-pencil-alt2"
                        style={{
                          marginRight: "10px",
                        }}
                      ></i>{" "}
                      Edit Employee
                    </button>
                  </Link>

                  <button
                    className="btn btn-primary m-2"
                    onClick={handlePrintPersonsProfile}
                  >
                    <i
                      className="ti-files"
                      style={{
                        marginRight: "10px",
                      }}
                    ></i>{" "}
                    PRINT PROFILE
                  </button>
                </>

                {employee.file_path && (
                  <>
                    <a
                      className="btn btn-primary"
                      href={`${API}/api/storage/${employee.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View and Download CV PDF
                    </a>
                  </>
                )}
              </div>

              <div className="d-flex">
                <Link to={`/employee/info/${employee.id}`}>
                  <button
                    className="btn btn-secondary"
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    <i
                      className="ti-write"
                      style={{
                        marginRight: "10px",
                      }}
                    ></i>{" "}
                    UPDATE INFORMATION
                  </button>
                </Link>
                {employee.status !== "Active" && (
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDeployToWork()}
                    >
                      <i
                        className="ti-envelope"
                        style={{
                          marginRight: "10px",
                        }}
                      ></i>{" "}
                      DEPLOY TO WORK
                    </button>
                  </div>
                )}
                {employee.status === "Active" && (
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeployToWork()}
                    >
                      <i
                        className="ti-envelope"
                        style={{
                          marginRight: "10px",
                        }}
                      ></i>{" "}
                      TERMINATE EMPLOYEE
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="box bg-bubbles-white mt-4">
              <div
                className={`box-body text-end  ${styles["my-component"]}`}
                style={{
                  minHeight: "350px !important",
                }}
              >
                <img src="https://providence-human-capital.github.io/images/dash.jpg" />
              </div>
              <div className="box-body wed-up position-relative">
                <div className="d-md-flex align-items-center">
                  <div>
                    <div
                      className="image-container"
                      style={{
                        margin: "2rem",
                      }}
                    >
                      {/* <img
                      src="/assets/images/user.jpg"
                      className="bg-success-light rounded50 square-image"
                      alt="https://providence-human-capital.github.io/images/6308.jpg"
                      style={{
                        width: "200px",
                        borderRadius: "50%",
                      }}
                    /> */}
                      {/* <img
                        src={`${IMAGE_URL}${employee.profile_image?.image}` || "/assets/images/user.jpg"}
                        // src={selectedImage || "/assets/images/avatar/2.jpg"}
                        className="bg-success-light rounded50 square-image"
                        alt="/assets/images/user.jpg"
                        style={{
                          width: "300px",
                          height: "300px",
                          borderRadius: "50%",
                          border: "3px solid #58AB46"
                        }}
                      /> */}

                      {profileImage ? (
                        <img
                          src={`${IMAGE_URL}${profileImage?.image}`}
                          className="bg-success-light rounded50 square-image"
                          alt="/assets/images/user.jpg"
                          style={{
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            border: "3px solid #58AB46",
                          }}
                        />
                      ) : (
                        <img
                          src={selectedImage || "/assets/images/user.jpg"}
                          className="bg-success-light rounded50 square-image"
                          alt="/assets/images/user.jpg"
                          style={{
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            border: "3px solid #58AB46",
                          }}
                        />
                      )}

                      <label
                        htmlFor="image-upload"
                        className="upload-button"
                        style={{
                          width: "300px",
                          borderRadius: "50%",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="upload-icon"
                        />
                      </label>
                    </div>
                    <input
                      type="file"
                      id="image-upload"
                      className="image-upload-input hide-input"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <div className="text-center my-10">
                      <p className="mb-0">EMPLOYEMENT STATUS</p>
                      <h4 className="badge badge-pill badge-primary">
                        {employee.status}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-40">
                    <button
                      className="btn btn-primary mb-3"
                      onClick={() => handleViewProfileImage()}
                    >
                      <i
                        className="ti-eye"
                        style={{
                          marginRight: "10px",
                        }}
                      ></i>{" "}
                      VIEW PROFILE
                    </button>
                    <h4 className="fw-600 mb-5">
                      {employee.first_name} {employee.last_name}
                    </h4>
                    <h5 className="fw-500 mb-5">{employee.national_id}</h5>
                    <p>
                      Date of Application {"  "}
                      <i className="fa fa-clock-o"></i>{" "}
                      {formatDate(employee.created_at, options)}
                    </p>

                    <h5>
                      NATIONALITY:{" "}
                      <span className="badge badge-secondary">
                        {" "}
                        {employee.nationality}
                      </span>
                    </h5>
                  </div>
                </div>

                <div className="p-3">
                  <h5 className="fw-bold mb-3">
                    Gender:
                    <span className="fw-light ms-2">{employee.gender}</span>
                  </h5>
                  <h5 className="fw-bold mb-3">
                    Date Of Birth:
                    <span className="fw-light ms-2">
                      <span className="badge bg-primary">
                        {employee.date_of_birth}
                      </span>
                    </span>
                  </h5>
                  <h5 className="fw-bold mb-3">
                    Marital Status:
                    <span className="fw-light ms-2">
                      <span className="badge bg-warning text-dark">
                        {employee.marital_status}
                      </span>
                    </span>
                  </h5>
                  <div className="mb-3">
                    <h5 className="fw-bold mb-1">HOME ADDRESS</h5>
                    <p className="text-uppercase fw-bold mb-0">
                      {employee.address}
                    </p>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">
                      PHONE NUMBER
                      <span className="fw-light ms-2">
                        <span className="badge bg-info text-dark">
                          {employee.phone_number}
                        </span>
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {employee.documents && (
              <div className="box">
                <div className="box-header no-border">
                  <h4
                    className="box-title"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    {employee.status === "New" ||
                    employee.status === "Pending" ? (
                      <span>Applicant</span>
                    ) : (
                      <span>Employee</span>
                    )}{" "}
                    Documentation
                  </h4>
                </div>

                <div className="box-body">
                  <div className="row">
                    {employee.documents.length > 0 && (
                      <>
                        {employee.documents.map((doc) => (
                          <div className="col-md-4" key={doc.id}>
                            <div
                              className="card"
                              style={{
                                backgroundColor: "#96FABC",
                              }}
                            >
                              <div className="card-body">
                                <h5
                                  className="card-title"
                                  style={{
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {doc?.type}
                                </h5>
                                <a
                                  href={`${API}/api/storage/${doc?.file_path}`}
                                  className="btn btn-primary"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i
                                    className="ti-eye"
                                    style={{
                                      marginRight: "10px",
                                    }}
                                  ></i>
                                  View {doc?.type}
                                </a>

                                <div
                                  style={{
                                    marginTop: "10px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>
                                    <p>
                                      <span
                                        style={{
                                          textTransform: "uppercase",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        File Description:
                                      </span>
                                      {editingDocId === doc.id ? (
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={newDescription}
                                          onChange={(e) =>
                                            setNewDescription(e.target.value)
                                          }
                                          style={{
                                            marginLeft: "10px",
                                          }}
                                        />
                                      ) : (
                                        <span style={{ marginLeft: "10px" }}>
                                          {doc?.file_description}
                                        </span>
                                      )}
                                    </p>
                                  </div>

                                  <div style={{ display: "flex", gap: "10px" }}>
                                    {editingDocId === doc.id ? (
                                      <FontAwesomeIcon
                                        icon={faSave}
                                        style={{
                                          cursor: "pointer",
                                          color: "green",
                                        }}
                                        onClick={() =>
                                          handleSaveDescription(
                                            doc.id,
                                            newDescription
                                          )
                                        } // Fix: Pass newDescription as well
                                      />
                                    ) : (
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{
                                          cursor: "pointer",
                                          color: "blue",
                                          fontSize: "20px",
                                          margin: "10px"
                                        }}
                                        onClick={() => handleEditClick(doc)}
                                      />
                                    )}

                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                        fontSize: "20px",
                                         margin: "10px"
                                      }}
                                      onClick={() => handleDeleteClick(doc.id)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="col-xl-4 col-12"
            style={{
              overflowY: "scroll",
              height: "120vh",
              overflowX: "hidden",
            }}
          >
            <div className="box">
              <UploadEmployeeCV
                employeeId={applicantId}
                onUploadSuccess={handleEmployeeRefetch}
              />
            </div>
            <div class="container mt-5">
              <h2
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Reference Information
              </h2>
              <div
                class="card"
                style={{
                  textTransform: "uppercase",
                  backgroundColor: "#96FABC",
                }}
              >
                <div class="card-body">
                  <h5 class="card-title">Reference Details</h5>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>From Company:</strong>
                    </div>
                    <div class="col-sm-8">{employee.from_company}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>TRANSFERING TO</strong>
                    </div>
                    <div class="col-sm-8">{employee.from_position}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>Reference Type:</strong>
                    </div>
                    <div
                      class="col-sm-8"
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      {employee.ref_type ? (
                        <span className="badge badge-primary">
                          {employee.ref_type}
                        </span>
                      ) : (
                        <span className="badge badge-primary">SELF</span>
                      )}
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>REFERRER FULL NAME:</strong>
                    </div>
                    <div class="col-sm-8">{employee.ref_name}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>REFERRER Contact:</strong>
                    </div>
                    <div class="col-sm-8">{employee.ref_contact}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>REFERRER PLACE OF EMPLOYMENT:</strong>
                    </div>
                    <div class="col-sm-8">{employee.ref_emp}</div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-sm-4">
                      <strong>REFERRER Relation:</strong>
                    </div>
                    <div class="col-sm-8">{employee.ref_relation}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="box-header no-border">
                <h4
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  QUALIFICATIONS & WORK EXPERIENCE
                </h4>
              </div>
              <div className="box-body">
                <div className="container">
                  <div className="row mb-4">
                    <div className="col-12">
                      <h4
                        className="mb-3"
                        style={{ color: "#0E9645", fontWeight: "bold" }}
                      >
                        QUALIFICATIONS (EDUCATION LEVEL)
                      </h4>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <h5>{employee?.education_level}</h5>
                          {/* <p className="mb-0">University of XYZ</p>
                          <small className="text-muted">2014 - 2018</small> */}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-12">
                      <h4
                        className="mb-3"
                        style={{ color: "#0E9645", fontWeight: "bold" }}
                      >
                        WORK EXPERIENCE
                      </h4>
                      <div
                        className="card mb-3"
                        style={{ backgroundColor: "#f0fdf3" }}
                      >
                        <div className="card-body">
                          <p className="card-text">
                            {employee?.work_experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Qualifications employee={employee} />

                  {/* applicantId */}
                </div>
              </div>
            </div>
            <NextOfKinCard employeeId={applicantId} />
            <EmpHistoryCard employeeId={applicantId} />
            <BankInfoCard employeeId={applicantId} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplicantsDetailedPage;
