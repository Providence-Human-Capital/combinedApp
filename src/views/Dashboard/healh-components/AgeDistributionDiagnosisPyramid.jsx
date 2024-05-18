import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const AgeDistributionDiagnosisPyramid = () => {
  const companies = useSelector((state) => state.company.companies) || [];
  const clinics = useSelector((state) => state.clinic.clinics) || [];
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [selectedClinic, setSelectedClinic] = useState(1);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("DIARRHOEA");
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

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
    const clinic = clinics.find((clinic) => clinic.id === parseInt(clinicId));
    setClinicName(clinic ? clinic.name : "All Clinics");
  };

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
  };

  const handleDiagnosisChange = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
  };

  useEffect(() => {
    const fetchAgeDistributionData = async () => {
      if (selectedCompany && selectedDiagnosis) {
        try {
          const response = await axios.get(
            `${API}/api/diagnosis-age/${
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

  const groupedData = ageDistributionData.reduce((acc, item) => {
    const ageGroup = `${item.age_group}-${item.age_group + 4}`;
    if (!acc[ageGroup]) {
      acc[ageGroup] = { male: 0, female: 0 };
    }
    acc[ageGroup][item.gender.toLowerCase()] = item.count;
    return acc;
  }, {});

  const ageGroups = Object.keys(groupedData);
  const maleData = ageGroups.map((ageGroup) => groupedData[ageGroup].male);
  const femaleData = ageGroups.map((ageGroup) => groupedData[ageGroup].female);

  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: false,
    },
    title: {
      text: `Age Distribution for ${selectedDiagnosis}`
    },
    xaxis: {
      categories: ageGroups,
      title: {
        text: 'Age Group (5-year intervals)',
      },
    },
    colors: [
        "#007A41", "#58AD46"
      ],
    yaxis: {
      title: {
        text: 'Number of Patients'
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
        fontSize: '17px',
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

  const chartSeries = [
    {
      name: 'Male',
      data: maleData,
    },
    {
      name: 'Female',
      data: femaleData,
    }
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
              {clinicName} AGE DISTRIBUTION FOR DIAGNOSIS
            </h4>
          </div>
          <div className="row">
            <div className="col-md-12">
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
          {selectedCompany &&
          selectedDiagnosis &&
          ageDistributionData.length > 0 ? (
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

export default AgeDistributionDiagnosisPyramid;
