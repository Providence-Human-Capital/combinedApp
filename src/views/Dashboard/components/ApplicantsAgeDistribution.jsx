import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import { API } from "../../../../config";

const fetchApplicantsAgeDistribution = async () => {
  const { data } = await axios.get(`${API}/api/applicants-age-dis`);
  return data;
};

const ApplicantsAgeDistribution = () => {
  const [ageDistribution, setAgeDistribution] = useState([]);

  useEffect(() => {
    fetchApplicantsAgeDistribution()
      .then((data) => setAgeDistribution(data))
      .catch((err) => console.error("Failed to set age distribution", err));
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: Infinity,
              color: "#114538",
            },
          ],
        },
      },
    },
    xaxis: {
      categories: Object.keys(ageDistribution),
    },
  };

  const chartSeries = [
    {
      name: "Applicants",
      data: Object.values(ageDistribution),
    },
  ];

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
                AGE DISTRIBUTION OF APPLICANTS
              </h4>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
        <div className="box-body pt-0">
          <ApexCharts
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={450}
          />
        </div>
      </div>
    </>
  );
};

export default ApplicantsAgeDistribution;
