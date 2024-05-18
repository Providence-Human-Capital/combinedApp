import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const AverageBloodPressureByGender = () => {
  const companies = useSelector((state) => state.company.companies) || [];
  const clinics = useSelector((state) => state.clinic.clinics) || [];
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [selectedClinic, setSelectedClinic] = useState(1);
  const [clinicName, setClinicName] = useState("All Clinics");
  const [bloodPressureData, setBloodPressureData] = useState([]);

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
    const clinic = clinics.find((clinic) => clinic.id === parseInt(clinicId));
    setClinicName(clinic ? clinic.name : "All Clinics");
  };

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
  };

  useEffect(() => {
    const fetchBloodPressureData = async () => {
      if (selectedCompany) {
        try {
          const response = await axios.get(
            `${API}/api/average-bp-gender/${
              selectedClinic || ""
            }/${selectedCompany}`
          );
          const data = response.data;
          setBloodPressureData(data);
        } catch (error) {
          console.error("Error fetching blood pressure data", error);
        }
      }
    };

    fetchBloodPressureData();
  }, [selectedCompany, selectedClinic]);

  const chartOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Average Blood Pressure by Gender",
    },
    xaxis: {
      categories: bloodPressureData.map((item) => item.gender),
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toFixed(2), // Format data labels to 2 decimal places
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
  };

  const chartSeries = [
    {
      name: "Systolic BP",
      data: bloodPressureData.map((item) =>
        parseFloat(item.avg_systolic_bp).toFixed(2)
      ),
    },
    {
      name: "Diastolic BP",
      data: bloodPressureData.map((item) =>
        parseFloat(item.avg_diastolic_bp).toFixed(2)
      ),
    },
  ];

  return (
    <>
      <div className="box">
        <div className="box-header no-border">
          <div className="row">
            <h4
              className="box-title"
              style={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              {clinicName} AVERAGE BLOOD PRESSURE BY GENDER
            </h4>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <label>Clinic:</label>
                  <select
                    value={selectedClinic || ""}
                    onChange={(e) => handleClinicChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="">All Clinics</option>
                    {clinics.map((clinic) => (
                      <option key={clinic.id} value={clinic.id}>
                        {clinic.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label>Company:</label>
                  <select
                    value={selectedCompany || ""}
                    onChange={(e) => handleCompanyChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="">All Companies</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-body pt-0">
          {selectedCompany && bloodPressureData.length > 0 ? (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          ) : (
            <p>Select a company to see the average blood pressure by gender.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AverageBloodPressureByGender;
