import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";

const fetchApplicantsAgeDistribution = async () => {
  const { data } = await axios.get(`${API}/api/applicants-age-dis`);
  return data;
};

const ApplicantsAgeDistribution = () => {
  const { data, error, isLoading } = useQuery(
    "applicantsAgeDistribution",
    fetchApplicantsAgeDistribution
  );
  const [ageDistribution, setAgeDistribution] = useState({});

  useEffect(() => {
    if (data) {
      setAgeDistribution(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="box">
        <div className="box-body pt-4">
          <Loading />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="box">
        <div className="box-body pt-4">
          <p className="text-danger">Error loading data</p>
        </div>
      </div>
    );

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
  );
};

export default ApplicantsAgeDistribution;
