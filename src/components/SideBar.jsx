import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  const user = useSelector((state) => state.auth.user);

  const isAdminOrPensions = user?.role === "admin" || user?.role === "pensions";
  const isAdminOrHealth = user?.role === "admin" || user?.role === "health";
  const isAdminOrHr = user?.role === "admin" || user?.role === "hr";
  const isAdminOrReception =
    user?.role === "admin" || user?.role === "reception";
  const isAdminOrNurse = user?.role === "admin" || user?.role === "nurse";

  const isStaffing = user?.role === "admin" || user?.role === "staffing";

  const styles = {
    pageHeight: {
      height: "100%",
    },

    color: {
      backgroundColor: "#58AD46",
      color: "#FFF",
    },

    textColor: {
      color: "#58AD46",
    },
  };
  return (
    <>
      <aside className="main-sidebar">
        <section className="sidebar position-relative">
          <div className="help-bt">
            <Link
              href="tel:+263782903276"
              className="d-flex align-items-center"
            >
              <div
                className="rounded10 h-40 w-40 l-h-40 text-center me-15"
                style={styles.color}
              >
                <i
                  className="ti-microphone"
                  style={{
                    fontSize: "20px",
                  }}
                ></i>
              </div>
              <h5 className="mb-0">
                Emergency
                <br />
                help
              </h5>
            </Link>
          </div>

          <div className="help-bt">
            <Link to={"/add/employee"} className="d-flex align-items-center">
              <div
                className="rounded10 h-50 w-50 l-h-50 text-center me-15"
                style={styles.color}
              >
                <i
                  className="fa fa-user"
                  aria-hidden="true"
                  style={{
                    fontSize: "20px",
                  }}
                ></i>
              </div>
              <h4
                className="mb-0"
                style={{
                  textTransform: "uppercase",
                  transition: "color 0.3s", // Adding transition for a smooth effect
                  ":hover": {
                    color: "green",
                  },
                }}
              >
                Add Applicant
              </h4>
            </Link>
          </div>

          <div className="multinav">
            <div className="multinav-scroll" style={styles.pageHeight}>
              <ul className="sidebar-menu" data-widget="tree">
                {isAdminOrHr && (
                  <>
                    <li id="aside-bar">
                      <NavLink to={"/dashboard"}>
                        <i
                          className="ti-pie-chart"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Dashboard</span>
                      </NavLink>
                    </li>
                    {/* <li id="aside-bar">
                      <NavLink to={"/visitors"}>
                        <i
                          className="ti-pencil-alt"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Visitors</span>
                      </NavLink>
                    </li> */}
                    {/* <li id="aside-bar">
                      <NavLink to={"/orders"}>
                        <i
                          className="ti-package"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Orders</span>
                      </NavLink>
                    </li> */}
                    {/* <li id="aside-bar">
                      <NavLink to={"/employees"}>
                        <i
                          className="ti-user"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Employees</span>
                      </NavLink>
                    </li> */}
                    {/* <li id="aside-bar">
                      <NavLink to={"/reports"}>
                        <i
                          className="ti-bar-chart"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Reports</span>
                      </NavLink>
                    </li> */}
                  </>
                )}
                {isAdminOrHr && (
                  <>
                    {/* hr role access */}
                    <div className="help-bt">
                      <Link
                        href="tel:+263782903276"
                        className="d-flex align-items-center"
                      >
                        <div
                          className="rounded10 h-40 w-40 l-h-40 text-center me-15"
                          style={styles.color}
                        >
                          <i
                            className="ti-heart"
                            style={{
                              fontSize: "20px",
                            }}
                          ></i>
                        </div>
                        <h5 className="mb-0">
                          Human Resources
                          <br />
                          (Staffing Solutions)
                        </h5>
                      </Link>
                    </div>
                    <li id="aside-bar">
                      <NavLink to={"/new/employees"}>
                        <i
                          className="ti-user"
                          style={{
                            fontSize: "20px",
                            color: "red",
                            fontWeight: "bold",
                          }}
                        ></i>
                        <span
                          style={{
                            textTransform: "uppercase",
                            color: "red",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          Applicants{" "}
                        </span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/trained/applicants"}>
                        <i
                          className="ti-check-box"
                          style={{
                            fontSize: "20px",
                            color: "#007a41",
                            fontWeight: "bold",
                          }}
                        ></i>
                        <span
                          style={{
                            textTransform: "uppercase",
                            color: "#007a41",
                            fontWeight: "bold",
                          }}
                        >
                          Verified Applicants
                        </span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/attachees"}>
                        <i
                          className="ti-notepad"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Attachment Students</span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/terminated/employees"}>
                        <i
                          className="ti-flag-alt-2"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Terminated Employees</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/phc/employees"}>
                        <i
                          className="ti-flag-alt-2"
                          style={{
                            fontSize: "20px",
                            color: "#007a41",
                            fontWeight: "bold",
                          }}
                        ></i>
                        <span
                          style={{
                            textTransform: "uppercase",
                            color: "#007a41",
                            fontWeight: "bold",
                          }}
                        >
                          PHC EMPLOYEES
                        </span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/deployed/applicants"}>
                        <i
                          className="ti-agenda"
                          style={{
                            fontSize: "20px",
                            color: "#007a41",
                            fontWeight: "bold",
                          }}
                        ></i>
                        <span
                          style={{
                            textTransform: "uppercase",
                            color: "#007a41",
                            fontWeight: "bold",
                          }}
                        >
                          Active Employees
                        </span>
                      </NavLink>
                    </li>

                    <div className="help-bt">
                      <Link
                        to={"/staffing/upload"}
                        className="d-flex align-items-center"
                      >
                        <div
                          className="rounded10 h-50 w-50 l-h-50 text-center me-15"
                          style={styles.color}
                        >
                          <i
                            class="fa fa-plus"
                            aria-hidden="true"
                            style={{
                              fontSize: "20px",
                            }}
                          ></i>
                        </div>
                        <h4
                          className="mb-0"
                          style={{
                            textTransform: "uppercase",
                            transition: "color 0.3s", // Adding transition for a smooth effect
                            ":hover": {
                              color: "green",
                            },
                          }}
                        >
                          STAFFING UPLOAD
                        </h4>
                      </Link>
                    </div>

                    <li id="aside-bar">
                      <NavLink to={"/staffing/employees"}>
                        <i
                          className="ti-user"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>SS (Deployed Employees)</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/hr/forms"}>
                        <i
                          className="ti-printer"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>HR Forms Print</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/companies"}>
                        <i
                          className="ti-files"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Companies</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/leave/management"}>
                        <i
                          className="ti-home"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Leave Management</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/hr/reports"}>
                        <i
                          className="ti-stats-up"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Reports Analysis</span>
                      </NavLink>
                    </li>

                    <li id="aside-bar">
                      <NavLink to={"/admin/ops"}>
                        <i
                          className="ti-flag"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Admin Operations</span>
                      </NavLink>
                    </li>

                    {/* end of hr role access */}
                  </>
                )}

                {/* {isAdminOrHealth && (
                  <>
                 
                    <div className="help-bt">
                      <Link
                        href="tel:+263782903276"
                        className="d-flex align-items-center"
                      >
                        <div
                          className="rounded10 h-40 w-40 l-h-40 text-center me-15"
                          style={styles.color}
                        >
                          <i
                            className="ti-microphone"
                            style={{
                              fontSize: "20px",
                            }}
                          ></i>
                        </div>
                        <h5 className="mb-0">
                          Health
                          <br />
                          (Statistics)
                        </h5>
                      </Link>
                    </div>

                    <li id="aside-bar">
                      <NavLink to={"/health/dashboard"}>
                        <i
                          className="ti-pie-chart"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Dashboard Overview</span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/clinic"}>
                        <i
                          className="ti-search"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Search Filter</span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/companies"}>
                        <i
                          className="ti-files"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Companies</span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/clinics"}>
                        <i
                          className="ti-support"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Health Facilities</span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/providence/drugs"}>
                        <i
                          className="ti-support"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Drug Management</span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/health/reports"}>
                        <i
                          className="ti-bar-chart-alt"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Health Reports</span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/medicals/certificates"}>
                        <i
                          className="ti-printer"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Medicals Certificates</span>
                      </NavLink>
                    </li>
                    <li id="aside-bar">
                      <NavLink to={"/health/staff"}>
                        <i
                          className="ti-receipt"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Health Staff</span>
                      </NavLink>
                    </li>

                   
                  </>
                )}  */}

                {/* {isAdminOrPensions && (
                  <>
                   
                    <div className="help-bt">
                      <Link
                        href="tel:+263782903276"
                        className="d-flex align-items-center"
                      >
                        <div
                          className="rounded10 h-40 w-40 l-h-40 text-center me-15"
                          style={styles.color}
                        >
                          <i
                            className="ti-microphone"
                            style={{
                              fontSize: "20px",
                            }}
                          ></i>
                        </div>
                        <h5 className="mb-0">
                          Employee Benefits
                          <br />
                          (Pensions / GLA)
                        </h5>
                      </Link>
                    </div>
                    <li id="aside-bar">
                      <NavLink to={"/terminations"}>
                        <i
                          className="ti-printer"
                          style={{
                            fontSize: "20px",
                          }}
                        ></i>
                        <span>Terminations Print</span>
                      </NavLink>
                    </li>
                   
                  </>
                )} */}
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
