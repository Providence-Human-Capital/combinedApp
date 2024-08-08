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
import EmployeeReferralType from "./components/EmployeeReferralType";
import ApplicantsGender from "./components/ApplicantsGender";
import ApplicantsAgeDistribution from "./components/ApplicantsAgeDistribution";
import ApplicantEducation from "./components/ApplicantEducation";
import ApplicantsMonthly from "./components/ApplicantsMonthly";

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
        <div class="box-body">
          <ul class="nav nav-pills mb-20">
            <li class=" nav-item">
              {" "}
              <a
                href="#navpills-1"
                class="nav-link active"
                data-bs-toggle="tab"
                aria-expanded="false"
                style={{
                  textTransform: "uppercase",
                }}
              >
                JOB APPLICATION DATABASE
              </a>{" "}
            </li>
            <li class="nav-item">
              {" "}
              <a
                href="#navpills-2"
                class="nav-link"
                data-bs-toggle="tab"
                aria-expanded="false"
                style={{
                  textTransform: "uppercase",
                }}
              >
                Staffing Solutions Database
              </a>{" "}
            </li>
            <li class="nav-item">
              {" "}
              <a
                href="#navpills-3"
                class="nav-link"
                data-bs-toggle="tab"
                aria-expanded="false"
                style={{
                  textTransform: "uppercase",
                }}
              >
                Providence Human Capital
              </a>{" "}
            </li>
          </ul>

          <div class="tab-content">
            <div id="navpills-1" class="tab-pane active">
              <div class="row">
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
                  <ApplicantsAgeDistribution />
                  <div className="row">
                    <ApplicantsMonthly />
                    <div className="col-xl-12 col-12">
                      <ApplicantEducation />
                    </div>
                    <div className="col-xl-6 col-12"></div>
                  </div>
                </div>
                <div className="col-xl-4 col-12">
                  <EmployeeReferralType />
                  <ApplicantsGender />
                  <AreaOfExpertiseAnalysis />
                </div>
              </div>
            </div>
            <div id="navpills-2" class="tab-pane">
              <div class="row">
                <div className="col-xl-8 col-12">
                  <StaffingEmployeesChart />
                  {/* <EmployeeAgeDistribution /> */}
                </div>
                <div className="col-xl-4 col-12">
                  <EmployeeGenderChart />
                  <EmployeeMaritalStatusChart />
                </div>
              </div>
            </div>
            <div id="navpills-3" class="tab-pane">
              <div class="row">
                <div className="col-xl-8 col-12">
                  Providence Human Capital Analysis
                </div>
                <div className="col-xl-4 col-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

{
  /* <section className="content">
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
          svgLink={"https://providence-human-capital.github.io/images/code.png"}
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

       
      </div>
      <WeeklyEmployeeCountChart />
      <StaffingEmployeesChart />
      <EmployeeAgeDistribution />
    </div>
    <div className="col-xl-4 col-12">
      <EmployeeReferralType />
      <ApplicantsGender />

      <EmployeeGenderChart />
      <EmployeeMaritalStatusChart />
      <AreaOfExpertiseAnalysis />
    </div>
  </div>
  <div className="row">
    <div className="col-md-12"></div>
  </div>
</section>; */
}
