import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const AttendanceByClinic = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState([]);
  const clinics = useSelector((state) => state.clinic.clinics) || [];
  const [years, setYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2023; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`${API}/api/medical-visits-by-clinic/${selectedYear}`);
        setAttendanceData(response.data);
        console.log("Medical Visits By Clinic", response.data);
      } catch (error) {
        console.error("Error fetching attendance data", error);
      }
    };

    fetchAttendanceData();
  }, [selectedYear]);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Initialize data structure for each clinic and month
  const groupedData = {};
  months.forEach(month => {
    groupedData[month] = {};
    clinics.forEach(clinic => {
      groupedData[month][clinic.id] = 0;
    });
  });

  // Populate the groupedData with the actual visit counts
  attendanceData.forEach(item => {
    const month = months[item.month - 1]; // Adjust for zero-based index
    groupedData[month][item.clinic_id] = item.visit_count;
  });

  const series = clinics.map(clinic => ({
    name: clinic.name,
    data: months.map(month => groupedData[month][clinic.id] || 0)
  }));

  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: false,
    },
    title: {
      text: `Clinic Attendance in ${selectedYear}`
    },
    xaxis: {
      categories: months,
      title: {
        text: 'Month',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Visits'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top'
        }
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val,
      style: {
        fontSize: '15px',
        colors: ['#fff']
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
  };

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-8">
            <h4
              className="box-title"
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              CLINIC ATTENDANCE
            </h4>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <select
                  className="form-select"
                  onChange={(e) => handleYearChange(e.target.value)}
                  value={selectedYear}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-body pt-0">
        {attendanceData.length > 0 ? (
          <Chart options={chartOptions} series={series} type="bar" height={350} />
        ) : (
          <p>Select a year to see the attendance data.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceByClinic;
