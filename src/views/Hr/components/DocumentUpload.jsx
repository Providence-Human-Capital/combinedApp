import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Swal from "sweetalert2";

const fileTypes = [
  "National ID",
  "Educational Qualifications",
  "Passport",
  "Medical Certificates",
  "Birth Certificate",
  "Driver's Licenses",
  "Miscellaneous Documents",
  "Police Clearance",
  "Finger Prints",
  "Affidavit",
  "Job Description",
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
    onDrop: (acceptedFiles) => handleFileChange(index, acceptedFiles),
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

const DocumentUpload = forwardRef(({ employeeId, onFilesChange }, ref) => {
  const [fileUploads, setFileUploads] = useState([{ type: "", file: null }]);

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(fileUploads);
    }
  }, [fileUploads, onFilesChange]);

  const handleAddFileType = () => {
    setFileUploads([...fileUploads, { type: "", file: null }]);
  };

  const handleFileTypeChange = (index, type) => {
    const newFileUploads = [...fileUploads];
    newFileUploads[index].type = type;
    setFileUploads(newFileUploads);
  };

  const handleFileChange = (index, acceptedFiles) => {
    const file = acceptedFiles[0];

    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);

    if (file.size > 2 * 1024 * 1024) { // 2MB size limit
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `File size should not exceed 2MB, Your file is too large (${fileSizeInMB}MB)`,
        timer: 5000,
        confirmButtonColor: "#e60000",
      });
      return;
    }
    const newFileUploads = [...fileUploads];
    newFileUploads[index].file = file;
    setFileUploads(newFileUploads);
  };

  const handleRemoveFile = (index) => {
    const newFileUploads = [...fileUploads];
    newFileUploads.splice(index, 1);
    setFileUploads(newFileUploads);
  };

  const availableFileTypes = fileTypes.filter(
    (type) => !fileUploads.some((upload) => upload.type === type)
  );

  return (
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
          ADD ANOTHER DOCUMENT TYPE
        </button>
      )}
    </div>
  );
});

export default DocumentUpload;
