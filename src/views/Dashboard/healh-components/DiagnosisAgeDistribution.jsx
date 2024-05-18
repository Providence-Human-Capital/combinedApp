import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const DiagnosisAgeDistribution = () => {
  const companies = useSelector((state) => state.company.companies) || [];
  const clinics = useSelector((state) => state.clinic.clinics) || [];
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

  const [clinicName, setClinicName] = useState("All Clinics");
  const [ageDistributionData, setAgeDistributionData] = useState([]);
  const diagnoses = [
    "ABSCESS",
    "ALLERGIES",
    "ARTHRITIS",
    "ASTHMA",
    "CELLULITIS",
    "CHEST PAINS",
    "COVID POSITIVE",
    "DIABETES",
    "DIARRHOEA",
    "DYSMENORRHOEA",
    "EAR/NOSE/THROAT",
    "EPILEPSY",
    "EPISTAXIS",
    "EYE",
    "FRACTURES",
    "HEADACHE",
    "HIV RELATED",
    "HYPERTENSION",
    "MENTAL ILLNESS",
    "OLD INJURY ON DUTY",
    "ORAL",
    "PILES",
    "PRE-EMPLOYMENT MEDICALS",
    "ROAD TRAFFIC ACCIDENT",
    "SEXUALLY TRANSMITTED INFECTIONS",
    "SKIN",
    "SOFT TISSUE INJURY",
    "URINARY TRACT INFECTIONS",
    "ABDOMINAL",
    "ASSULT",
    "BACKACHE",
    "DENTAL",
    "MUSCULO-SKELETAL PAINS",
    "NEUROLOGICAL",
    "NEW INJURY ON DUTY",
    "RESPIRATORY",
    "STRESS",
    "FIRST AID INJURY",
    "DRESSING",
    "EXIT MEDICALS",
  ];

  const handleDiagnosisChange = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
  };

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
    const clinic = clinics.find((clinic) => clinic.id === parseInt(clinicId));
    setClinicName(clinic ? clinic.name : "All Clinics");
  };

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
  };

  useEffect(() => {
    const fetchAgeDistributionData = async () => {
      if (selectedCompany && selectedDiagnosis) {
        try {
          const response = await axios.get(
            `${API}/api/diagnosis-age-distribution/${
              selectedClinic || ""
            }/${selectedCompany}/${selectedDiagnosis}`
          );
          const data = response.data;
          setAgeDistributionData(data);
        } catch (error) {
          console.error("Error fetching age distribution data", error);
        }
      }
    };

    fetchAgeDistributionData();
  }, [selectedCompany, selectedClinic, selectedDiagnosis]);

  const chartOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: `AGE DISTRIBUTION FOR ${selectedDiagnosis} DIAGNOSIS `,

      
    },
    
    xaxis: {
      title: {
        text: "Age Group (5-year intervals)",
      },
      categories: ageDistributionData.map(
        (item) => `${item.age_group}-${item.age_group + 4}`
      ),
    },
    colors: [
        "#007A41"
      ],
    yaxis: {
      title: {
        text: "Number of Patients",
      },
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
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
  };

  const chartSeries = [
    {
      name: "Number of Patients",
      data: ageDistributionData.map((item) => item.count),
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
                style={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {clinicName} AGE DISTRIBUTION FOR DIAGNOSIS
              </h4>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <label>Diagnosis:</label>
                  <select
                    value={selectedDiagnosis || ""}
                    onChange={(e) => handleDiagnosisChange(e.target.value)}
                    className="form-select"
                  >
                    <option value="">All Diagnoses</option>
                    {diagnoses.map((diagnosis) => (
                      <option key={diagnosis} value={diagnosis}>
                        {diagnosis}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-body pt-0">
          {selectedCompany && selectedDiagnosis && ageDistributionData.length > 0 ? (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          ) : (
            <p>
              Select a company and enter a diagnosis to see the age
              distribution.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DiagnosisAgeDistribution;
