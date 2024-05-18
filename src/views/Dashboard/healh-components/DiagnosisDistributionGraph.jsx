import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const DiagnosisDistributionGraph = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedClinic, setSelectedClinic] = useState(1);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("ALLERGIES");
  const [years, setYears] = useState([]);
  const [data, setData] = useState([]);
  const clinics = useSelector((state) => state.clinic.clinics);
  const [clinicName, setClinicName] = useState(null);
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

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2023; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  useEffect(() => {
    if (selectedYear || selectedClinic || selectedDiagnosis) {
      fetchAttendanceData(selectedYear, selectedClinic, selectedDiagnosis);
    }
  }, [selectedYear, selectedClinic, selectedDiagnosis]);

  const fetchAttendanceData = async (year, clinicId, diagnosis) => {
    try {
      const response = await axios.get(
        `${API}/api/clinic-diagnosis-distribution/${year}/${clinicId}/${diagnosis}`
      );
      if (response.data) {
        const formattedData = formatData(response.data);
        setData(formattedData);
        console.log("Stats Data ", response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setData([]);
    }
  };

  const formatData = (rawData) => {
    const months = Array(12).fill(0).map((_, i) => i + 1);
    const diagnoses = Object.keys(rawData);
    const series = diagnoses.map((diagnosis) => {
      const dataPoints = months.map((month) => {
        const monthData = rawData[diagnosis].find((item) => item.month === month);
        return monthData ? monthData.count : 0;
      });
      return { name: diagnosis, data: dataPoints };
    });
    return series;
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
    const clinic = clinics.find((clinic) => clinic.id === parseInt(clinicId));
    console.log("Selected Clinic", clinic);
    setClinicName(clinic ? clinic.name : "All Clinics");
  };

  const handleDiagnosisChange = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
  };

  const chartOptions = {
    chart: {
      id: "diagnosis-distribution-chart",
      type: "area",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      title: {
        text: "Months",
      },
    },
    yaxis: {
      title: {
        text: "Number of Diagnoses",
      },
    },
   
    colors: ['#007A41'],
    fill: {
      type: 'solid',
      opacity: 0.6,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
  };

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-4">
            <h4 className="box-title" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {clinicName} DIAGNOSIS DISTRIBUTION
            </h4>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <label>YEAR</label>
                <select
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="form-select"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
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
        <Chart options={chartOptions} series={data} type="area" height={450} />
      </div>
    </div>
  );
};

export default DiagnosisDistributionGraph;
