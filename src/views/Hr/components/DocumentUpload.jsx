import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

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

  //   useImperativeHandle(ref, () => ({
  //     handleUpload,
  //   }));

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
    const newFileUploads = [...fileUploads];
    newFileUploads[index].file = acceptedFiles[0];
    setFileUploads(newFileUploads);
  };

  const handleRemoveFile = (index) => {
    const newFileUploads = [...fileUploads];
    newFileUploads.splice(index, 1);
    setFileUploads(newFileUploads);
  };

  //   const handleUpload = async () => {
  //     if (fileUploads.some((fu) => !fu.type || !fu.file)) {
  //       alert("Please select a file type and upload a file for each entry!");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("employee_id", employeeId);

  //     fileUploads.forEach((upload, index) => {
  //       formData.append(`files[${index}][type]`, upload.type);
  //       formData.append(`files[${index}][file]`, upload.file);
  //     });

  //     // try {
  //     //   const response = await axios.post("/api/documents", formData, {
  //     //     headers: {
  //     //       "Content-Type": "multipart/form-data",
  //     //     },
  //     //   });

  //     //   if (response.status === 200) {
  //     //     alert("Files uploaded successfully!");
  //     //     if (triggerUpload) triggerUpload();
  //     //   }
  //     // } catch (error) {
  //     //   console.error("Error uploading files:", error);
  //     //   alert("Failed to upload files.");
  //     // }
  //     console.log('file upload starting................')
  //   };

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
