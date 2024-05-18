import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const AttendanceByPatientType = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [selectedClinic, setSelectedClinic] = useState(1);
  const [attendanceData, setAttendanceData] = useState([]);
  const companies = useSelector((state) => state.company.companies) || [];
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

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
  };

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
  };

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (selectedCompany && selectedClinic) {
        try {
          const response = await axios.get(
            `${API}/api/attendance-patient-type/${selectedYear}/${selectedCompany}/${selectedClinic}`
          );
          setAttendanceData(response.data);
        } catch (error) {
          console.error("Error fetching attendance data", error);
        }
      }
    };

    fetchAttendanceData();
  }, [selectedYear, selectedCompany, selectedClinic]);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const groupedData = attendanceData.reduce((acc, item) => {
    if (!acc[item.patient_type]) {
      acc[item.patient_type] = Array(12).fill(0);
    }
    acc[item.patient_type][item.month - 1] = item.visit_count;
    return acc;
  }, {});

  const series = Object.keys(groupedData).map(patientType => ({
    name: patientType,
    type: 'bar', 
    data: groupedData[patientType]
  }));

  const chartOptions = {
    chart: {
      height: 350,
      type: 'bar',
      stacked: true
    },
    title: {
      text: `Patient Attendance by Type in ${selectedYear}`,
      align: 'left'
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: months,
    },
    yaxis: {
      title: {
        text: 'Number of Visits'
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        formatter: function (val) {
          return val
        }
      }
    }
  };

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-4">
            <h4
              className="box-title"
              style={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              PATIENT ATTENDANCE BY TYPE
            </h4>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <label>Year:</label>
                <select
                  className="form-select"
                  onChange={(e) => handleYearChange(e.target.value)}
                  value={selectedYear}
                //   style={{
                //     height: "50px",
                //     fontSize: "23px"
                //   }}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>Company:</label>
                <select
                  className="form-select"
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  value={selectedCompany}
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>Clinic:</label>
                <select
                  className="form-select"
                  onChange={(e) => handleClinicChange(e.target.value)}
                  value={selectedClinic}
                >
                  <option value="">Select Clinic</option>
                  {clinics.map((clinic) => (
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
        {attendanceData.length > 0 ? (
          <Chart options={chartOptions} series={series} type="bar" height={450} />
        ) : (
          <p>Select a year, company, and clinic to see the attendance data.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceByPatientType;
