import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const AttendanceGraphCard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedClinic, setSelectedClinic] = useState(1);
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);
  const clinics = useSelector((state) => state.clinic.clinics);
  const [clinicName, setClinicName] = useState(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2023; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  useEffect(() => {
    if (selectedYear || selectedClinic) {
      fetchAttendanceData(selectedYear, selectedClinic);
    }
  }, [selectedYear, selectedClinic]);

  const fetchAttendanceData = async (year, clinicId) => {
    try {
      const response = await axios.get(`${API}/api/clinic-stats/${year}/${clinicId}`);
      if (Array.isArray(response.data)) {
        setData(response.data);
        console.log("Stats Data ",response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setData([]);
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
    const clinic = clinics.find((clinic) => clinic.id === parseInt(clinicId))
    console.log("Selected Clinic",clinic)
    setClinicName(clinic.name)
  };

  const chartOptions = {
    chart: {
      id: "attendance-chart",
      type: "bar",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    colors: [
        "#007A41"
      ]
  };

  const chartSeries = [
    {
      name: "Attendance",
      data: data.map((item) => item.attendance_count || 0),
    },
  ];

  return (
    <>
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
                {clinicName} CLINIC ATTENDANCE
              </h4>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <select
                    className="form-select"
                    onChange={(e) => handleClinicChange(e.target.value)}
                    value={selectedClinic || ""}
                  >
                    <option value="" disabled>Select Clinic</option>
                    {clinics &&
                      clinics.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-body pt-0">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height="350"
          />
        </div>
      </div>
    </>
  );
};

export default AttendanceGraphCard;
