import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { API } from "../../../../config";

const UploadEmployeeCV = ({ employeeId,  onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State for success status

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError(null);

      await axios.post(`${API}/api/employee/${employeeId}/upload-cv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUploadSuccess();

      // Optionally, you can update the UI or show a success message
      setSuccess(true); // Set success status to true after successful upload
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ margin: "2rem", color: "#2C4894" }}>
      <h4 style={{ textTransform: "uppercase", fontWeight: "bold" }}>UPLOAD / UPDATE EMPLOYEE CV</h4>
      <div {...getRootProps()} style={{ border: "2px dashed #2C4894", padding: "2rem", textAlign: "center" }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop the file here, or click to select file</p>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>File uploaded successfully!</p>} {/* Render success message */}
      <div className="space"></div>
      <button className="btn btn-primary" onClick={() => {}} disabled={loading}>
        {loading ? "Uploading in Progress..." : "UPLOAD CV"}
      </button>
    </div>
  );
};

export default UploadEmployeeCV;
