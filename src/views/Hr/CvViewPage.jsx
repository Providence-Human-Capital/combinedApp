import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

const CvViewPage = () => {

  const location = useLocation();

  return (
    <section className="content">
      <div className="row">
        <div class="col-12">
          <div class="box">
            <div class="box-header with-border">
              <h4
                class="box-title"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Click a Tab to Choose The Type Of Form you want to print
              </h4>
            </div>
            <div class="box-body">
              <ul class="nav nav-pills mb-20">
                <li class=" nav-item">
                  {" "}
                  <Link to={"new/employee"}  className={`nav-link ${location.pathname === '/hr/forms/new/employee' ? 'active' : ''}`}>
                    NEW EMPLOYEE DATA FORM
                  </Link>{" "}
                </li>
                <li class="nav-item">
                  {" "}
                  <Link to={"termination"} className={`nav-link ${location.pathname === '/hr/forms/termination' ? 'active' : ''}`}>
                    EMPLOYEE TERMINATION FORM
                  </Link>{" "}
                </li>
                <li class="nav-item">
                  {" "}
                  <Link to={"beneficiary"} className={`nav-link ${location.pathname === '/hr/forms/beneficiary' ? 'active' : ''}`}>
                    BENEFICIARY FORM
                  </Link>{" "}
                </li>
              </ul>
              <div className="outlet-box">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CvViewPage;
