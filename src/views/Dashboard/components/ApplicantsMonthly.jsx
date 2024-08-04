import React from "react";
import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../../config";

const fetchApplicantsMonthly = async () => {
  const { data } = await axios.get(`${API}/api/applicants/monthly`);
  return data;
};

const ApplicantsMonthly = () => {
  const { data, isLoading, error } = useQuery(
    "applicantsMonthly",
    fetchApplicantsMonthly
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const categories = data.map(
    (item) => `${item.year}-${String(item.month).padStart(2, "0")}`
  );
  const counts = data.map((item) => item.count);

  const chartData = {
    series: [{ name: "Applications", data: counts }],
    options: {
      chart: {
        id: "applications-chart",
      },
      xaxis: {
        categories,
      },
    },
  };

  return (
    <>
      <div className="box">
        <div className="box-header no-border">
          <div className="row">
            <div className="col-md-6">
              <h4
                className="box-title"
                style={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                MONTHLY DISTRIBUTION
              </h4>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
        <div className="box-body pt-0">
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </>
  );
};

export default ApplicantsMonthly;
