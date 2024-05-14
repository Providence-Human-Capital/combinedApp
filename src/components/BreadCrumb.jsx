import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ title, activeTab }) => {
  return (
    <>
      <div className="content-header mb-4">
        <div className="d-flex align-items-center">
          <div className="me-auto">
            <h4
              className="page-title"
              style={{
                cursor: "pointer",
              }}
            >
              {title}
            </h4>
            <div className="d-inline-block align-items-center">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>
                      <i className="fa fa-folder-o"></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <strong>{activeTab}</strong>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
