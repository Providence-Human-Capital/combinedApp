import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import useStaffingCompanies from "../../Hr/hooks/useStaffingCompanies";
import Loading from "../../../components/Loading.jsx/Loading";
import { API } from "../../../../config";

const fetchGenderDistribution = async (companyId) => {
  const { data } = await axios.get(`${API}/api/employee-gender-distribution/${companyId}`);
  return data;
};

const EmployeeGenderChart = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [genderData, setGenderData] = useState(null); // State to store gender distribution data
  const {
    data: companies,
    error: companiesError,
    isLoading: companiesLoading,
  } = useStaffingCompanies();

  useEffect(() => {
    if (companies && companies.length > 0) {
      const defaultCompanyId = companies[6].id;
      setSelectedCompany(defaultCompanyId);
      fetchGenderDistribution(defaultCompanyId)
        .then((data) => setGenderData(data))
        .catch((error) => {
          console.error("Error fetching gender distribution data:", error);
          setGenderData(null);
        });
    }
  }, [companies]);

  useEffect(() => {
    if (selectedCompany) {
      fetchGenderDistribution(selectedCompany)
        .then((data) => {
          setGenderData(data);
        })
        .catch((error) => {
          console.error("Error fetching gender distribution data:", error);
          setGenderData(null);
        });
    }
  }, [selectedCompany]);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: genderData ? genderData.map((item) => item.gender) : [],
  };

  const chartSeries = genderData ? genderData.map((item) => item.count) : [];

  return (
    <div className="box">
      <div className="box-header no-border">
        <div className="row">
          <div className="col-md-6">
            <h4
              className="box-title"
              style={{ textTransform: "uppercase", fontWeight: "bold" }}
            >
              EMPLOYEE GENDER DISTRIBUTION
            </h4>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
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
                          <option>
                            <Loading />
                          </option>
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
        </div>
      </div>
      <div className="box-body pt-0">
        {genderData && genderData.length > 0 ? (
          <ApexCharts
            options={chartOptions}
            series={chartSeries}
            type="pie"
            height={350}
          />
        ) : (
          <p>No data available for the selected company.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeGenderChart;
