import { useDispatch } from "react-redux";
import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import ClinicTable from "./components/ClinicTable";
import { Link } from "react-router-dom";

const Clinics = () => {
  const dispatch = useDispatch();
  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "auto",
    },
  };
  return (
    <>
      <BreadCrumb title={"Clinics"} activeTab={"Clinics"} />
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <Link to={`/clinic/add`}>
                      <button className="btn btn-secondary">ADD CLINIC</button>
                    </Link>
                  </div>

                  <button className="btn btn-primary">EXPORT EXCEL</button>
                </div>
                <div
                  className="table-responsive rounded card-table"
                  style={styles.containerStyles}
                >
                  <ClinicTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Clinics;
