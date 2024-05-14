import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";

const HealthReports = () => {
  const [filters, setFilters] = useState({
    gender: "",
    startDate: "",
    endDate: "",
    diagnosis: "",
    companyName: "",
    clinicName: "",
  });

  const [isFetching, setIsFetching] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    "filteredMedicalRecords",
    async () => {
      setIsFetching(true); // Show loading spinner when making a request
      const response = await axios.post(`${API}/api/medical-records`, filters);
      setIsFetching(false); // Hide loading spinner after response
      return response.data.data;
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger refetch when form is submitted
    refetch();
  };

  return (
    <>
      <BreadCrumb title={"Reports"} activeTab={"Generate Reports"} />
      <section className="content">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <h4
                style={{
                  textTransform: "uppercase",
                }}
              >
                Filtered Medical Records
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={filters.startDate}
                        onChange={handleChange}
                      />
                      <label htmlFor="startDate">Start Date:</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={filters.endDate}
                        onChange={handleChange}
                      />
                      <label htmlFor="endDate">End Date:</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="gender"
                        className="form-control"
                        value={filters.gender}
                        onChange={handleChange}
                      />
                      <label htmlFor="gender">Gender:</label>
                    </div>
                  </div>
                </div>
                <div className="space"></div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="diagnosis"
                        className="form-control"
                        value={filters.diagnosis}
                        onChange={handleChange}
                      />
                      <label htmlFor="diagnosis">Diagnosis:</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="companyName"
                        className="form-control"
                        value={filters.companyName}
                        onChange={handleChange}
                      />
                      <label htmlFor="companyName">Company Name:</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="clinicName"
                        className="form-control"
                        value={filters.clinicName}
                        onChange={handleChange}
                      />
                      <label htmlFor="clinicName">Clinic Name:</label>
                    </div>
                  </div>
                </div>
                <div className="space"></div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>
          {isFetching && <Loading />}
          {isLoading && <Loading />}
          {isError && <div>Error fetching data</div>}

          <div className="box">
            <div className="box-body">
              <div className="d-md-flex align-items-center justify-content-between mb-20">
                <div className="d-flex"></div>

                <button className="btn btn-primary">EXPORT EXCEL</button>
              </div>
              <div className="table-responsive rounded card-table">
                <div className="table-responsive">
                  {data && (
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="bb-2">Date of Visit</th>

                          <th className="bb-2">Patient Name</th>
                          <th className="bb-2">Clinic Name</th>
                          <th className="bb-2">Gender</th>
                          <th className="bb-2">National ID</th>
                          <th className="bb-2">Company</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((record) => (
                          <tr key={record.id}>
                            <td>{record.date_of_visit}</td>

                            <td>
                              {record.patient.first_name}{" "}
                              {record.patient.last_name}
                            </td>
                            <td>{record.clinic.name}</td>
                            <td>{record.patient.gender}</td>
                            <td>{record.patient.national_id}</td>
                            <td>{record.patient?.company.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HealthReports;
