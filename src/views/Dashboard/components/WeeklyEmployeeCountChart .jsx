import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";

const fetchWeeklyEmployeeData = async () => {
  const { data } = await axios.get(`${API}/api/weekly-employees`);
  return data;
};

const WeeklyEmployeeCountChart = () => {
  const { data, error, isLoading } = useQuery(
    "weeklyEmployees",
    fetchWeeklyEmployeeData
  );
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      const dates = data.map((item) =>
        dayjs(item.date).format("ddd DD MMM YYYY")
      );
      const counts = data.map((item) => item.count);

      setCategories(dates);
      setSeries([{ name: "New Employees", data: counts }]);
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
      id: "weekly-employee-count-chart",
      type: "area",
      height: 450,
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Dates",
      },
      labels: {
        rotate: -5,
        rotateAlways: true,
      },
    },
    yaxis: {
      title: {
        text: "Number of Employees",
      },
    },
    title: {
      text: "Weekly New Employees Count",
      align: "center",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
      },
    },
    tooltip: {
      enabled: true,
    },
    colors: ["#007A41"],
  };

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-6">
            <h4
              className="box-title"
              style={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              JOB APPLICATIONS ON A WEEKLY BASIS
            </h4>
          </div>
        </div>
      </div>
      <div className="box-body pt-0">
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height={450}
        />
      </div>
    </div>
  );
};

export default WeeklyEmployeeCountChart;
