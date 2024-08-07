import React from "react";
import { useQuery } from "react-query";
import ApexCharts from "react-apexcharts";
import useStaffingEmployeesCount from "../../Hr/hooks/useStaffingEmployeesCount";
import BreadCrumb from "../../../components/BreadCrumb";
import Loading from "../../../components/Loading.jsx/Loading";

const StaffingEmployeesChart = () => {
  const { data, error, isLoading } = useStaffingEmployeesCount();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const companyNames = data.map((company) => company.name);
  const employeeCounts = data.map((company) => company.staffing_employees_count);

  const chartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: companyNames,
      title: {
        text: "Company Names",
      },
    },
    yaxis: {
      title: {
        text: "Employee Count",
      },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: Number.MAX_VALUE,
              color: "#114538", // Green color
            },
          ],
        },
      },
    },
  };

  const chartSeries = [
    {
      name: "Employees Count",
      data: employeeCounts,
    },
  ];

  return (
    <>
      <div className="box">
        {/* {JSON.stringify(data)} */}
        <div className="box-header no-border">
          <div className="row">
            <h4
              className="box-title"
              style={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              EMPLOYEES COUNT PER STAFFING COMPANY
            </h4>
          </div>
        </div>
        <div className="box-body pt-0">
          <ApexCharts
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={470}
          />
        </div>
      </div>
    </>
  );
};

export default StaffingEmployeesChart;
