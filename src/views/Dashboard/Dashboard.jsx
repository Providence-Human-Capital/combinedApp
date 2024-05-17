import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()


  useEffect(() => {
    if(user?.role === "health"){
      navigate("/health/dashboard")
    }
  })
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
