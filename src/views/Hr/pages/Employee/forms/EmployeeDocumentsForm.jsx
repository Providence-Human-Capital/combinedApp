import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { API } from "../../../../../../config";
import Loading from "../../../../../components/Loading.jsx/Loading";

const fileTypes = [
  "National ID",
  "Educational Qualifications",
  "Medical Certificates",
  "Birth Certificate",
  "Driver's Licenses",
  "Miscellaneous Documents",
  "Police Clearance",
  "Finger Prints",
  "Affidavit",
];

const FileUploadField = ({
  index,
  fileUpload,
  handleFileTypeChange,
  handleFileChange,
  handleRemoveFile,
  availableFileTypes,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => handleFileChange(index, acceptedFiles[0]), // Accepting only the first file
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    disabled: !fileUpload.type,
  });

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="space"></div>
      <div className="form-floating">
        {!fileUpload.type && (
          <>
            <select
              value={fileUpload.type}
              onChange={(e) => handleFileTypeChange(index, e.target.value)}
              style={{ marginBottom: "10px" }}
              className="form-select"
            >
              <option value="">SELECT FILE TYPE</option>
              {availableFileTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label
              htmlFor="ref_name"
              style={{
                color: "#2C4894",
                fontWeight: "bold",
              }}
            >
              SELECT THE DOCUMENT TYPE YOU WANT TO UPLOAD
            </label>
          </>
        )}
      </div>

      {fileUpload.type && (
        <div
          {...getRootProps()}
          style={{
            border: "1px dashed gray",
            padding: "20px",
            textAlign: "center",
            backgroundColor: fileUpload.file ? "#ACE1AF" : "transparent",
          }}
        >
          <input {...getInputProps()} />
          {fileUpload.file ? (
            <p
              style={{
                fontWeight: "bolder",
                color: "#0E9645",
              }}
            >
              {fileUpload.type} has been selected
            </p>
          ) : isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag 'n' drop <strong>{fileUpload.type}</strong> files here, or
              click to select <strong>{fileUpload.type}</strong> files
            </p>
          )}
        </div>
      )}
      {fileUpload.file && (
        <p
          style={{
            fontWeight: "bolder",
            color: "#0E9645",
          }}
        >
          Selected file: {fileUpload.file.name}
        </p>
      )}
      <button
        onClick={() => handleRemoveFile(index)}
        style={{
          position: "relative",
          top: "-124px",
          right: "-20px",
          float: "right",
          backgroundColor: "red",
          color: "white",
          padding: "10px 10px",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          marginTop: "10px",
          height: "40px",
          width: "40px",
        }}
      >
        <i
          className="ti-close"
          style={{
            fontWeight: "bold",
          }}
        ></i>
      </button>
    </div>
  );
};

const EmployeeDocumentsForm = ({ employeeId, triggerUpload }) => {
  const [fileUploads, setFileUploads] = useState([{ type: "", file: null }]);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileTypeChange = (index, type) => {
    const newFileUploads = [...fileUploads];
    newFileUploads[index].type = type;
    setFileUploads(newFileUploads);
  };

  const handleFileChange = (index, file) => {
    const newFileUploads = [...fileUploads];
    newFileUploads[index].file = file;
    setFileUploads(newFileUploads);
  };

  const handleRemoveFile = (index) => {
    const newFileUploads = fileUploads.filter((_, i) => i !== index);
    setFileUploads(newFileUploads);
  };

  const handleAddFileType = () => {
    setFileUploads([...fileUploads, { type: "", file: null }]);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    if (fileUploads.some((fu) => !fu.type || !fu.file)) {
      alert("Please select a file type and upload a file for each entry!");
      return;
    }

    const formData = new FormData();
    formData.append("employee_id", employeeId);

    fileUploads.forEach((upload, index) => {
      formData.append(`documents[${index}][type]`, upload.type);
      formData.append(`documents[${index}][file]`, upload.file);
    });

    try {
      const response = await axios.post(
        `${API}/api/employees/${employeeId}/documents-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // alert("Files uploaded successfully!");
        setSuccess("Files uploaded successfully!");
        setIsLoading(false);
        if (triggerUpload) triggerUpload();
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      console.log(error);
      setIsLoading(false);
      setError("Error uploading files:", error);
      //   alert("Failed to upload files.");
    }
  };

  const availableFileTypes = fileTypes.filter(
    (type) => !fileUploads.some((upload) => upload.type === type)
  );

  return (
    <div className="box">
      {success && (
        <div
          className="alert alert-primary alert-dismissible"
          style={{
            margin: "2rem",
          }}
        >
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
          <h4>
            <i className="icon fa fa-check"></i> SUCCESS!
          </h4>
          Successfully added Employee Documents
        </div>
      )}

      {error && (
        <div
          className="alert alert-danger alert-dismissible"
          style={{
            margin: "2rem",
          }}
        >
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
          <h4>
            <i className="icon fa fa-ban"></i> ERROR!
          </h4>
          Error whilst adding Employee
        </div>
      )}
      <div className="box-header no-border">
        <h3
          className="box-title"
          style={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          EMPLOYEE DOCUMENTS UPLOAD
        </h3>
        <label
          style={{
            color: "#2C4894",
            marginBottom: "10px",
          }}
        >
          {" "}
          <strong>NB:</strong> Accepted document types{" "}
          <strong
            style={{
              color: "#0E9645",
            }}
          >
            National ID, Educational Qualifications, Drivers License, Affidavit,
            Birth Certificates, Medical Certificate
          </strong>{" "}
          and they must all be <strong>PDF</strong> files
        </label>
      </div>
      <div className="box-body">
        <div className="container">
          <div className="row">
            {fileUploads.map((fileUpload, index) => (
              <FileUploadField
                key={index}
                index={index}
                fileUpload={fileUpload}
                handleFileTypeChange={handleFileTypeChange}
                handleFileChange={handleFileChange}
                handleRemoveFile={handleRemoveFile}
                availableFileTypes={availableFileTypes}
              />
            ))}
            {availableFileTypes.length > 0 && (
              <button
                type="button"
                onClick={handleAddFileType}
                style={{
                  backgroundColor: "#2C4894",
                  color: "white",
                  padding: "10px 20px",
                  width: "fit-content",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  margin: "10px 10px",
                }}
              >
                <i
                  className="ti-plus"
                  style={{
                    marginRight: "10px",
                  }}
                ></i>{" "}
                ADD ANOTHER DOCUMENT TYPE
              </button>
            )}
          </div>
          <div className="row mt-4">
            {isLoading ? (
              <>
                <Loading />
              </>
            ) : (
              <button
                type="button"
                onClick={handleUpload}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px 20px",
                  width: "fit-content",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <i
                  className="ti-check"
                  style={{
                    marginRight: "10px",
                  }}
                ></i>{" "}
                Upload Documents
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocumentsForm;
