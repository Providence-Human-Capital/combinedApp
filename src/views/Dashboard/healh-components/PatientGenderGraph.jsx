import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const PatientGenderGraph = () => {
  const companies = useSelector((state) => state.company.companies) || [];
  const clinics = useSelector((state) => state.clinic.clinics) || [];
  const [selectedClinic, setSelectedClinic] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [clinicName, setClinicName] = useState("All Clinics");
  const [genderData, setGenderData] = useState([]);

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
    const clinic = clinics.find((clinic) => clinic.id === parseInt(clinicId));
    setClinicName(clinic ? clinic.name : "All Clinics");
  };

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
  };

  useEffect(() => {
    const fetchGenderDistribution = async () => {
      if (selectedCompany) {
        try {
          const response = await axios.get(
            `${API}/api/patient-gender-distribution/${selectedClinic || ""}/${selectedCompany}`
          );
          const data = response.data;
          console.log("Data Patienets Gender", response.data)
          setGenderData(data);
        } catch (error) {
          console.error("Error fetching gender distribution data", error);
        }
      }
    };

    fetchGenderDistribution();
  }, [selectedClinic, selectedCompany]);

  const chartOptions = {
    labels: genderData.map((item) => item.gender),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const chartSeries = genderData.map((item) => item.total);

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-4">
            <h4 className="box-title" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {clinicName} GENDER DISTRIBUTION
            </h4>
          </div>
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
        {selectedCompany && genderData.length > 0 ? (
          <Chart options={chartOptions} series={chartSeries} type="pie" width="500" />
        ) : (
          <p>Select a company to see the gender distribution.</p>
        )}
      </div>
    </div>
  );
};

export default PatientGenderGraph;
