import React from "react";
import OverviewCard from "./healh-components/OverviewCard";
import { useQuery } from "react-query";
import { API } from "../../../config";
import Loading from "../../components/Loading.jsx/Loading";
import AttendanceGraphCard from "./healh-components/AttendanceGraphCard";
import DiagnosisDistributionGraph from "./healh-components/DiagnosisDistributionGraph";
import PatientGenderGraph from "./healh-components/PatientGenderGraph";
import AverageBloodPressureByGender from "./healh-components/AverageBloodPressureByGender";
import DiagnosisAgeDistribution from "./healh-components/DiagnosisAgeDistribution";
import AgeDistributionDiagnosisPyramid from "./healh-components/AgeDistributionDiagnosisPyramid";
import AttendanceByClinic from "./healh-components/AttendanceByClinic";
import DiagnosisFrequencyChart from "./healh-components/DiagnosisFrequencyChart";
import AttendanceByPatientType from "./healh-components/AttendanceByPatientType";
import DiagnosisDaysOffDutyRelationship from "./healh-components/DiagnosisDaysOffDutyRelationship";

const HealthDashboard = () => {
  const { data, isLoading, isError } = useQuery("healthOverview", async () => {
    const response = await fetch(`${API}/api/stats/count`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const { clinicCount, companyCount, medicalRecordCount, patientCount } = data;

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
                Label={"Total Patients"}
                Number={patientCount || 0}
              />
              <OverviewCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-1.svg"
                }
                Label={"Total Medical Records"}
                Number={medicalRecordCount || 0}
              />
              <OverviewCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-2.svg"
                }
                Label={"Total Companies"}
                Number={companyCount || 0}
              />
              <OverviewCard
                svgLink={
                  "https://rhythm-admin-template.multipurposethemes.com/images/svg-icon/medical/icon-4.svg"
                }
                Label={"Health Facilities"}
                Number={clinicCount || 0}
              />
            </div>
            <div className="row">
              <div className="col-md-12">
                <AttendanceByPatientType />
                <AttendanceGraphCard />
              </div>
              <div className="col-md-12">
                <DiagnosisDistributionGraph />
              </div>

              <div className="col-md-12">
                <AgeDistributionDiagnosisPyramid />
              </div>
              <div className="col-md-12">
                <AttendanceByClinic />
              </div>
              <div className="col-md-12">
                <DiagnosisFrequencyChart />
              </div>
              <div className="col-md-12">
                <DiagnosisDaysOffDutyRelationship />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-12">
            <PatientGenderGraph />
            <AverageBloodPressureByGender />
          </div>
        </div>
      </section>
    </>
  );
};

export default HealthDashboard;
