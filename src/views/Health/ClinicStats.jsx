import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import ClinicCard from "./components/ClinicCard";
// /add/stats/
const ClinicStats = () => {
  const styles = {
    containerStyles: {
      minHeight: "90vh",
      overflow: "hidden",
    },
  };
  return (
    <>
      <BreadCrumb title={"CLINIC STATS"} activeTab={"CLINIC STATISTICS"} />
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <div className="d-flex">
                    <Link className="" to={"/add/stats/"}>
                      <button className="btn btn-primary">
                        ADD CLINIC STATS
                      </button>
                    </Link>

                    <button className="btn btn-secondary">EXPORT EXCEL</button>
                  </div>
                </div>
                <div className="table-responsive rounded card-table"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClinicStats;
