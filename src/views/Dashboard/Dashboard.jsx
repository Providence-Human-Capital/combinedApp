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
import WeeklyEmployeeCountChart from "./components/WeeklyEmployeeCountChart ";
import AreaOfExpertiseAnalysis from "./components/AreaOfExpertiseAnalysis";

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
                to={"/companies"}
                svgLink={
                  "https://providence-human-capital.github.io/images/office-building.png"
                }
                Label={"Total Staffing Companies"}
                Number={overviewData?.staffingCompaniesCount || 0}
              />
              <OverviewCard
                to={"/staffing/employees"}
                svgLink={
                  "https://providence-human-capital.github.io/images/code.png"
                }
                Label={"Deployed Staffing Employees"}
                Number={overviewData?.deployedEmployeesCount || 0}
              />
              <OverviewCard
                to={"/trained/applicants"}
                svgLink={
                  "https://providence-human-capital.github.io/images/clock.png"
                }
                Label={"Trained (Verified) Applicants"}
                Number={overviewData?.pendingEmployeesCount || 0}
              />

              <OverviewCard
                to={"/new/employees"}
                svgLink={
                  "https://providence-human-capital.github.io/images/new-employee.png"
                }
                Label={"Applicants"}
                Number={overviewData?.newEmployeesCount || 0}
              />

              {/* new-employee */}
            </div>
            <WeeklyEmployeeCountChart />
            <StaffingEmployeesChart />
            <EmployeeAgeDistribution />
          </div>
          <div className="col-xl-4 col-12">
            <EmployeeGenderChart />
            <EmployeeMaritalStatusChart />
            <AreaOfExpertiseAnalysis />
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
