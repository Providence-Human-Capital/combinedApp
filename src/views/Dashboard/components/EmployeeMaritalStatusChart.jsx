import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import useStaffingCompanies from "../../Hr/hooks/useStaffingCompanies";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";

const fetchMaritalStatusDistribution = async (companyId) => {
  const { data } = await axios.get(
    `${API}/api/employee-marital-distribution/${companyId}`
  );
  return data;
};

const EmployeeMaritalStatusChart = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [maritalStatusData, setMaritalStatusData] = useState([]);
  const {
    data: companies,
    error: companiesError,
    isLoading: companiesLoading,
  } = useStaffingCompanies();

  useEffect(() => {
    if (companies && companies.length > 0) {
      const defaultCompanyId = companies[6].id;
      setSelectedCompany(defaultCompanyId);
      fetchMaritalStatusDistribution(defaultCompanyId)
        .then((data) => {
          const filteredData = data.filter(item => item.marital_status !== null);
          setMaritalStatusData(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching marital status distribution data:", error);
          setMaritalStatusData([]);
        });
    }
  }, [companies]);

  useEffect(() => {
    if (selectedCompany) {
      fetchMaritalStatusDistribution(selectedCompany)
        .then((data) => {
          const filteredData = data.filter(item => item.marital_status !== null);
          setMaritalStatusData(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching marital status distribution data:", error);
          setMaritalStatusData([]);
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
    labels: maritalStatusData.map((item) => item.marital_status),
  };

  const chartSeries = maritalStatusData.map((item) => item.count);

  return (
    <>
      <div className="box">
        <div className="box-header no-border">
          <div className="row">
            <div className="col-md-6">
              <h4
                className="box-title"
                style={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                EMPLOYEE MARITAL STATUS DISTRIBUTION
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
          {maritalStatusData.length > 0 ? (
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
    </>
  );
};

export default EmployeeMaritalStatusChart;
