import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import CompanyTable from "./components/CompanyTable";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import { Link } from "react-router-dom";

const Companies = () => {
  const dispatch = useDispatch();

  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "auto",
    },
  };

  return (
    <>
      <BreadCrumb title={"Companies"} activeTab={"Companies"} />
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <Link to={`/company/add`}>
                      <button className="btn btn-secondary">ADD COMPANY</button>
                    </Link>
                  </div>

                  <button className="btn btn-primary">EXPORT EXCEL</button>
                </div>
                <div
                  className="table-responsive rounded card-table"
                  style={styles.containerStyles}
                >
                  <CompanyTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Companies;
