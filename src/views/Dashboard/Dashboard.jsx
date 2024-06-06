import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OverviewCard from "./healh-components/OverviewCard";
import StaffingEmployeesChart from "./components/StaffingEmployeesChart";
import EmployeeGenderChart from "./components/EmployeeGenderChart";
import EmployeeMaritalStatusChart from "./components/EmployeeMaritalStatusChart";
import axios from "axios";
import { useQuery } from "react-query";
import { API } from "../../../config";
import EmployeeAgeDistribution from "./components/EmployeeAgeDistribution";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const {
    data: overviewData,
    isLoading,
    isError,
  } = useQuery("overviewData", async () => {
    const response = await axios.get(`${API}/api/overview`);
    return response.data;
  });

  useEffect(() => {
    if (user?.role === "health") {
      navigate("/health/dashboard");
    }
  });
  return (
    <>
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="row">
              <OverviewCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-3.svg"
                }
                Label={"Total Staffing Companies"}
                Number={overviewData?.staffingCompaniesCount || 0}
              />
              <OverviewCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-3.svg"
                }
                Label={"Deployed Staffing Employees"}
                Number={overviewData?.deployedEmployeesCount || 0}
              />
              <OverviewCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-3.svg"
                }
                Label={"Pending Deployment"}
                Number={overviewData?.pendingEmployeesCount || 0}
              />
              <OverviewCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-3.svg"
                }
                Label={"New Applicants"}
                Number={overviewData?.newEmployeesCount || 0}
              />
            </div>
            <StaffingEmployeesChart />
            <EmployeeAgeDistribution />
          </div>
          <div className="col-xl-4 col-12">
            <EmployeeGenderChart />
            <EmployeeMaritalStatusChart />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12"></div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
