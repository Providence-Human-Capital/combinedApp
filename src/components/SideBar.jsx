import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  const user = useSelector((state) => state.auth.user);

  const isAdminOrPensions = user.role === "admin" || user.role === "pensions";
  const isAdminOrHealth = user.role === "admin" || user.role === "health";
  const isAdminOrHr = user.role === "admin" || user.role === "hr";
  const isAdminOrReception = user.role === "admin" || user.role === "reception";
  const isAdminOrNurse = user.role === "admin" || user.role === "nurse";
  

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
                          }}
                        ></i>
                        <span>SS (New Applicants)</span>
                      </NavLink>
                    </li>
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

                    {/* end of hr role access */}
                  </>
                )}

                {isAdminOrHealth && (
                  <>
                    {/* health role access */}
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

                    {/* end of health role access */}
                  </>
                )}

                {isAdminOrPensions && (
                  <>
                    {/* pension role access */}
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
                    {/* end of pension role access */}
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
