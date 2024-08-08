import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/BreadCrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import StepNavigation from "./components/StepNavigation";
import NextOfKinForm from "./forms/NextOfKinForm";
import PreviousEmploymentForm from "./forms/PreviousEmploymentForm";
import BankInformationForm from "./forms/BankInformationForm";
import MiscellaneousForm from "./forms/MiscellaneousForm";
import NextOfKinCard from "./components/NextOfKinCard";
import EmpHistoryCard from "./components/EmpHistoryCard";
import BankInfoCard from "./components/BankInfoCard";
import MiscCard from "./components/MiscCard";
import EmployeeDocumentsForm from "./forms/EmployeeDocumentsForm";

const UpdateEmpDetails = () => {
  const { employeeId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const triggerRefetch = () => {
    setRefetchTrigger((prev) => !prev); // Toggle refetch trigger
  };

  let employeeInfoForms;

  switch (currentStep) {
    case 1:
      employeeInfoForms = (
        <NextOfKinForm employeeId={employeeId} onSuccess={triggerRefetch} />
      );
      break;
    case 2:
      employeeInfoForms = <PreviousEmploymentForm employeeId={employeeId} />;
      break;
    case 3:
      employeeInfoForms = <BankInformationForm employeeId={employeeId} />;
      break;
    case 4:
      employeeInfoForms = <MiscellaneousForm employeeId={employeeId} />;
      break;
    case 5:
      employeeInfoForms = <EmployeeDocumentsForm employeeId={employeeId} />;
      break;
    default:
      employeeInfoForms = null;
  }

  useEffect(() => {
    const storedStep = localStorage.getItem("currentStep");
    if (storedStep) {
      setCurrentStep(parseInt(storedStep));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
  }, [currentStep]);

  return (
    <>
      <div className="d-flex align-items-center">
        <Link
          to={`/eapplicant/detail/${employeeId}`}
          style={{
            marginLeft: "40px",
          }}
        >
          <FontAwesomeIcon icon={faHome} />{" "}
        </Link>
        <BreadCrumb title={"UPDATE EMPLOYEE INFORMATION"} activeTab={"..."} />
      </div>
      <section className="content">
        <div className="row">
          <div className="col-xl-8 col-12">
            <StepNavigation
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {employeeInfoForms}
          </div>
          <div
            className="col-xl-4 col-12"
            style={{
              overflowY: "scroll",
              height: "120vh",
              overflowX: "hidden",
            }}
          >
            <NextOfKinCard
              employeeId={employeeId}
              refetchTrigger={refetchTrigger}
            />
            <EmpHistoryCard employeeId={employeeId} />
            <BankInfoCard employeeId={employeeId} />
            {/* <MiscCard employeeId={employeeId} /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateEmpDetails;
