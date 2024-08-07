import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../../../../../components/Loading.jsx/Loading";
import { API } from "../../../../../../config";

const EmpHistoryCard = ({ employeeId }) => {
  const fetchEmploymentHistory = async () => {
    const { data } = await axios.get(
      `${API}/api/employees/${employeeId}/employment-history`
    );

    console.log("eMPLOYEMENT HIS", data);
    return data.data;
  };
  const { data, error, isLoading } = useQuery(
    "employmentHistory",
    fetchEmploymentHistory
  );

  if (isLoading)
    return (
      <div className="box">
        <div className="box-body">
          <Loading />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="box">
        <div className="box-body">
          <p className="text-danger"> Error loading data</p>
        </div>
      </div>
    );

  return (
    <div className="box">
      <div className="box-header no-border">
        <h3
          className="box-title"
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            borderBottom: "2px solid #343a40",
            paddingBottom: "1px",
            marginBottom: "1px",
            color: "#343a40",
          }}
        >
          Employment History
        </h3>
      </div>
      <div className="box-body">
        {data.map((item, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {item.position_held}{" "}
                <span className="badge bg-secondary ms-2">
                  {item.duration_n} {item.duration_my}
                </span>
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {item.company_name} | Managed by: {item.manager_name}
              </h6>
              <p className="card-text">
                <strong>Reasons for Leaving:</strong> {item.reasons_for_leaving}
              </p>
              <p className="card-text">
                <strong>Additional Comments:</strong> {item.additional_comments}
              </p>
              <div
                style={{
                  borderTop: "1px solid #ddd",
                  paddingTop: "10px",
                  marginTop: "10px",
                  fontSize: "0.875rem",
                  color: "#6c757d",
                }}
              >
                Date of Engagement: {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmpHistoryCard;
