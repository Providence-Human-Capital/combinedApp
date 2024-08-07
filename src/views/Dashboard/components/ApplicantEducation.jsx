import React from "react";
import { useQuery } from "react-query";
import Chart from "react-apexcharts";
import axios from "axios";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";

const fetchEducationDistribution = async () => {
  const { data } = await axios.get(`${API}/api/applicants-education-dis`);
  return data;
};

const ApplicantEducation = () => {
  const { data, isLoading, error } = useQuery(
    "educationLevelDistribution",
    fetchEducationDistribution
  );

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

  const chartData = {
    series: data.map((item) => item.count),
    labels: data.map((item) => item.level),
  };

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-8">
            <h4
              className="box-title"
              style={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              APPLICANTS EDUCATION DISTRIBUTION
            </h4>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      <div className="box-body pt-0">
        <Chart
          options={{
            chart: {
              type: "donut",
            },
            labels: chartData.labels,
          }}
          series={chartData.series}
          type="donut"
          height={800}
        />
      </div>
    </div>
  );
};

export default ApplicantEducation;
