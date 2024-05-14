import React from "react";
import OverviewCard from "./healh-components/OverviewCard";
import { useQuery } from "react-query";
import { API } from "../../../config";

const HealthDashboard = () => {
  const { data, isLoading, isError } = useQuery("healthOverview", async () => {
    const response = await fetch(`${API}/api/stats/count`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  if (isLoading) {
    return <div>Loading...</div>;
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
          </div>
          <div className="col-xl-4 col-12"></div>
        </div>
      </section>
    </>
  );
};

export default HealthDashboard;
