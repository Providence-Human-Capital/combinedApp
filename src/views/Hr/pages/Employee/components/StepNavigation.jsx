import React, { Fragment } from "react";
import {
  faUser,
  faHistory,
  faBank,
  faAnchor,
  faFileArrowUp,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./StepNavigation.css";

const StepNavigation = ({ currentStep, setCurrentStep }) => {
  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  return (
    <>
      <section className="step-wizard">
        <ul className="step-wizard-list">
          <li
            className={`step-wizard-item ${
              currentStep === 1 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faUser}
                className={`progress-icon ${
                  currentStep === 1 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => handleStepClick(1)}
            >
              Add Next Of Kin
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 2 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faHistory}
                className={`progress-icon ${
                  currentStep === 2 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => handleStepClick(2)}
            >
              Employment History
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 3 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faBank}
                className={`progress-icon ${
                  currentStep === 3 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => handleStepClick(3)}
            >
              Bank Information
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 4 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faAnchor}
                className={`progress-icon ${
                  currentStep === 4 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => handleStepClick(4)}
            >
              Miscellaneous Information
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 5 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faFileArrowUp}
                className={`progress-icon ${
                  currentStep === 5 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => handleStepClick(5)}
            >
             Employee Documents
            </span>
          </li>
          <li
            className={`step-wizard-item ${
              currentStep === 6 ? "current-item" : ""
            }`}
          >
            <span className="progress-count">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className={`progress-icon ${
                  currentStep === 6 ? "current-icon" : ""
                }`}
              />
            </span>

            <span
              className="progress-label"
              style={{
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => handleStepClick(6)}
            >
             REFENCE INFORMATION
            </span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default StepNavigation;
