import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Chart from "react-apexcharts";
import { API } from "../../../../config";

const DiagnosisFrequencyChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [diagnosisData, setDiagnosisData] = useState([]);
  const companies = useSelector((state) => state.company.companies) || [];
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

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      if (selectedCompany) {
        try {
          const response = await axios.get(
            `${API}/api/diagnosis-frequency/${selectedYear}/${selectedCompany}`
          );
          setDiagnosisData(response.data);
        } catch (error) {
          console.error("Error fetching diagnosis data", error);
        }
      }
    };

    fetchDiagnosisData();
  }, [selectedYear, selectedCompany]);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    colors: ['#007A41'],
    title: {
      text: `Diagnosis Frequency in ${selectedYear}`,
      align: 'left',
    },
    xaxis: {
      categories: diagnosisData.map(item => item.diagnosis),
      title: {
        text: 'Diagnosis',
      },
     
    },
    yaxis: {
      title: {
        text: 'Frequency',
      },
      
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
  };

  const series = [
    {
      name: 'Frequency',
      data: diagnosisData.map(item => item.frequency),
    },
  ];

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-4">
            <h4
              className="box-title"
              style={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              DIAGNOSIS FREQUENCY
            </h4>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <label>Year:</label>
                <select
                  value={selectedYear || ""}
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
              <div className="col-md-6">
                <label>Company:</label>
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
          <Chart options={chartOptions} series={series} type="bar" height={1100} />
        ) : (
          <p>Select a year and company to see the diagnosis frequency data.</p>
        )}
      </div>
    </div>
  );
};

export default DiagnosisFrequencyChart;