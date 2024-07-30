import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./ApplicationSuccess.css";
import { useNavigate } from "react-router-dom";

const ApplicationSuccess = () => {
  const navigation = useNavigate();

  const handleNewApplication = () => {
    // Navigate to the application form route
    navigation("/apply");
  };

  return (
    <div className="container">
      <div className="success-container">
        <FaCheckCircle className="success-icon" />
        <h1>Application Submitted Successfully!</h1>
        <p>
          Thank you for your application. We will review your submission and get
          back to you.
        </p>

        <button
          className="new-application-button"
          onClick={handleNewApplication}
        >
          Submit Another Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
