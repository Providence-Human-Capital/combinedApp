import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router-dom";

const PatientDetailedPage = () => {
    const { patientId } = useParams()
  return (
    <>
      <BreadCrumb title={"PATIENT"} activeTab={"PROFILE"} />
      <section className="content">
        <div className="row">
            Patient Profile {parseInt(patientId) + 1}
        </div>
      </section>
    </>
  );
};

export default PatientDetailedPage;
