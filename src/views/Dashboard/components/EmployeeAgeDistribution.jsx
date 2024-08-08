import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import { API } from "../../../../config";
import useStaffingCompanies from "../../Hr/hooks/useStaffingCompanies";

const fetchEmployeeAgeDistribution = async (companyId) => {
  const { data } = await axios.get(`${API}/api/employee-age-distribution/${companyId}`);
  return data;
};

const EmployeeAgeDistribution = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [ageDistribution, setAgeDistribution] = useState([]);
  const {
    data: companies = [], // Default to an empty array
    error: companiesError,
    isLoading: companiesLoading,
  } = useStaffingCompanies();

  useEffect(() => {
    if (companies.length > 0) {
      const defaultCompanyId = companies[0].id; // Use the first company as default
      setSelectedCompany(defaultCompanyId);
      fetchEmployeeAgeDistribution(defaultCompanyId)
        .then((data) => setAgeDistribution(data))
        .catch((error) => console.error("Error fetching age distribution:", error));
    }
  }, [companies]);

  useEffect(() => {
    if (selectedCompany) {
      fetchEmployeeAgeDistribution(selectedCompany)
        .then((data) => setAgeDistribution(data))
        .catch((error) => console.error("Error fetching age distribution:", error));
    }
  }, [selectedCompany]);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const chartOptions = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: 0,
            to: Infinity,
            color: '#58ab46'
          }]
        }
      }
    },
    xaxis: {
      categories: Object.keys(ageDistribution)
    }
  };

  const chartSeries = [
    {
      name: "Employees",
      data: Object.values(ageDistribution)
    }
  ];

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-6">
            <h4 className="box-title" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              EMPLOYEE AGE DISTRIBUTION
            </h4>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="company"
                    name="company"
                    value={selectedCompany}
                    onChange={handleCompanyChange}
                  >
                    <option value="">Select Company</option>
                    {companiesLoading ? (
                      <option>Loading...</option>
                    ) : companiesError ? (
                      <option>Error loading companies</option>
                    ) : (
                      companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))
                    )}
                  </select>
                  <label htmlFor="company">SELECT COMPANY</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-body pt-0">
        {selectedCompany && ageDistribution && Object.keys(ageDistribution).length > 0 ? (
          <ApexCharts options={chartOptions} series={chartSeries} type="bar" height={350} />
        ) : (
          <p>Select a company to see the age distribution.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeAgeDistribution;
