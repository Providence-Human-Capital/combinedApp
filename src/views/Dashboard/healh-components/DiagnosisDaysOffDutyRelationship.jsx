import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../../config";
import Chart from "react-apexcharts";
import axios from "axios";

const DiagnosisDaysOffDutyRelationship = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const companies = useSelector((state) => state.company.companies) || [];
  const clinics = useSelector((state) => state.clinic.clinics) || [];
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [selectedClinic, setSelectedClinic] = useState(1);
  const [years, setYears] = useState([]);

  const [diagnosisData, setDiagnosisData] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2023; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
    const clinic = clinics.find((clinic) => clinic.id === parseInt(clinicId));
    setClinicName(clinic ? clinic.name : "All Clinics");
  };

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear, selectedCompany, selectedClinic]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API}/api/diagnosis-days-off-duty-relationship/${selectedYear}/${selectedCompany}/${selectedClinic}`
      );
      setDiagnosisData(response.data);
      console.log("hfvkhvfhkfv0", response.data)
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: diagnosisData.map((item) => item.diagnosis),
    },
    yaxis: {
      title: {
        text: "Average Days Off Duty",
      },
    },
    title: {
      text: "Diagnosis vs. Average Days Off Duty",
      align: "left",
    },
    colors: ["#008FFB"],
    
  };

  const series = [
    {
      name: "Average Days Off Duty",
      data: diagnosisData.map((item) => item.avg_days_off_duty),
    },
  ];

  return (
    <>
      <div className="box">
        <div className="box-header no-border">
          <div className="row">
            <div className="col-md-4">
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
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <select
                    className="form-select"
                    onChange={(e) => handleClinicChange(e.target.value)}
                    value={selectedClinic || ""}
                  >
                    <option value="" disabled>
                      Select Clinic
                    </option>
                    {clinics &&
                      clinics.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    value={selectedCompany || ""}
                    onChange={(e) => handleCompanyChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select Company</option>
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
          {diagnosisData.length > 0 ? (
            <Chart options={options} series={series} type="bar" height={450} />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DiagnosisDaysOffDutyRelationship;
