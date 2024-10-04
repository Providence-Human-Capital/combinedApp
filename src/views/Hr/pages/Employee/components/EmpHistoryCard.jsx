import React, { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import Loading from "../../../../../components/Loading.jsx/Loading";
import { API } from "../../../../../../config";
import { FaTrash } from "react-icons/fa"; // Import delete icon
import Swal from "sweetalert2";

const EmpHistoryCard = ({ employeeId }) => {
  const currentStep = localStorage.getItem("currentStep");

  const fetchEmploymentHistory = async () => {
    const { data } = await axios.get(
      `${API}/api/employees/${employeeId}/employment-history`
    );
    return data.data;
  };

  const { data, error, isLoading, refetch } = useQuery(
    "employmentHistory",
    fetchEmploymentHistory
  );

  const deleteMutation = useMutation(
    (employmentHistoryId) =>
      axios.delete(
        `${API}/api/employees/${employmentHistoryId}/employment-history`
      ),
    {
      onSuccess: () => {
        refetch(); // Refetch the data after deletion
      },
    }
  );

  // Handle delete action
  // Import SweetAlert2

  const handleDelete = (employmentHistoryId) => {
    // Show confirmation dialog using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, delete the employment history record
        deleteMutation.mutate(employmentHistoryId);

        // Show success message after deletion
        Swal.fire("Deleted!", "The record has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    refetch();
  }, [currentStep, refetch]);

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
          <p className="text-danger">Error loading data</p>
        </div>
      </div>
    );

  if (!data || data.length === 0) {
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
          <p className="text-muted">No Previous Employment History</p>
        </div>
      </div>
    );
  }

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
                  marginBottom: "10px",
                  color: "#6c757d",
                }}
              >
                Date of Engagement: {new Date(item.created_at).toLocaleString()}
              </div>
              {/* Delete Icon */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item.id)} // Call the delete handler
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmpHistoryCard;
