import React from "react";
import { useQuery } from "react-query";
import ApexCharts from "react-apexcharts";
import Loading from "../../../components/Loading.jsx/Loading";
import { API } from "../../../../config";

const fetchAreaOfExpertise = async () => {
  const response = await fetch(
    `${API}/api/areas/specializations`
  ); 
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("Areas of specialization", data);
  return data;
};

const AreaOfExpertiseAnalysis = () => {
  const { data, error, isLoading } = useQuery("areaOfExpertise", fetchAreaOfExpertise);

  if (isLoading) return <div><Loading /></div>;
  if (error) return <div>Error: {error.message}</div>;

  // Prepare data for the horizontal bar chart
  const chartData = {
    series: [{
      name: 'Frequency',
      data: Object.values(data)
    }],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true, // Set to true for horizontal bars
          barHeight: '20px', // Set the width of each bar
          colors: {
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
          },
          dataLabels: {
            position: 'top', // Show data labels on top of the bars
          },
        },
      },
      colors: ['#114538'], // Set bar color to green
      xaxis: {
        categories: Object.keys(data),
        title: {
          text: 'Frequency'
        },
      },
      yaxis: {
        title: {
          text: 'Area of Expertise'
        },
      },
      title: {
        text: '',
        align: 'center',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        },
      },
      dataLabels: {
        enabled: true, // Enable data labels for the chart
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}  OCCURRENCES`,
        },
      },
    },
  };

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-10">
            <h4
              className="box-title"
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Area of Expertise Frequency Distribution
            </h4>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="box-body pt-0">
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={2550}
        />
      </div>
    </div>
  );
};

export default AreaOfExpertiseAnalysis;
