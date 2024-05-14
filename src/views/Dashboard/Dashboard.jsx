import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="row">

            </div>
          </div>
          <div className="col-xl-4 col-12">
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
