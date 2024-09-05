import React from "react";
import "./ProfilePrintout.css";
import { API, IMAGE_URL } from "../../../../config";
import { useQuery } from "react-query";
import axios from "axios";

const ProfilePrintout = ({ employee, profileImg, employeeId }) => {
  const areaOfExpertise = employee?.area_of_expertise;

  const areaOfExpertiseArray = areaOfExpertise.split(", ");

  const fetchNextOfKin = async () => {
    const { data } = await axios.get(
      `${API}/api/employees/${employeeId}/next-of-kin`
    );
    console.log("NEXT OF KIN INFORMATION", data.data);
    return data.data;
  };

  const {
    data: next_of_kin,
    error,
    isLoading,
    refetch,
  } = useQuery("nextOfKinPrint", fetchNextOfKin);

  const fetchBankInformation = async () => {
    const { data } = await axios.get(
      `${API}/api/employees/${employeeId}/bank-information`
    );

    console.log("Bank Information", data);
    return data.data;
  };
  const {
    data: bankInfo,
    error: bankInfoError,
    isLoading: bankInforLoading,
  } = useQuery("bankInformationPrint", fetchBankInformation);

  const fetchEmploymentHistory = async () => {
    const { data } = await axios.get(
      `${API}/api/employees/${employeeId}/employment-history`
    );
    console.log("EMPLOYMENT HISTORY", data);
    return data.data;
  };

  const {
    data: emplHis,
    error: empHisError,
    isLoading: empLoading,
  } = useQuery("employmentHistoryPrint", fetchEmploymentHistory);

  return (
    <div className="cv-container">
      {/* Sidebar */}
      {/* {JSON.stringify(emplHis)} */}
      <div className="cv-sidebar">
        {/* Profile Image */}
        {profileImg?.image ? (
          <img
            src={`${IMAGE_URL}${profileImg?.image}`} // Replace with actual profile image URL
            alt="Profile"
          />
        ) : (
          <img src="/assets/images/user.jpg" alt="Profile" />
        )}
        {/* <img
          src={`${IMAGE_URL}${profileImg?.image}`} // Replace with actual profile image URL
          alt="Profile"
        /> */}

        <section className="objective-section">
          <h4>PERSONAL INFORMATION</h4>
          <ul>
            <li>
              D.O.B:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {employee.date_of_birth}
              </span>{" "}
            </li>
            <li>
              National ID:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {employee.national_id}
              </span>
            </li>
            <li>
              Marital Status:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {employee.marital_status}
              </span>
            </li>
            <li>
              Gender{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {employee.gender}
              </span>
            </li>
            <li>
              Nationality{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {employee.nationality}
              </span>
            </li>
          </ul>
        </section>

        <section className="contact-section">
          <h4>CONTACT</h4>
          <ul>
            <li>
              Phone Number:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {" "}
                {employee.phone_number}
              </span>{" "}
            </li>

            <li>Email: {employee?.email || "N/A"}</li>
            <li>{employee.address}</li>
          </ul>
        </section>

        <section className="education-section">
          <h4>EDUCATION</h4>
          <p>
            <strong>{employee?.education_level}</strong>
          </p>
        </section>

        <section className="skills-section">
          <h4>SKILLS</h4>
          <ul>
            {areaOfExpertiseArray.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Main Content */}
      <div className="cv-main">
        <header>
          <h5>
            {employee.first_name} {employee.last_name}
          </h5>
          <h3>{areaOfExpertiseArray[0]}</h3>
          <p>{employee?.work_experience}</p>
        </header>

        <section className="experience-section section">
          <h4>EXPERIENCE</h4>

          {emplHis &&
            emplHis.map((his, index) => (
              <>
                <div className="experience-item">
                  <p>
                    <strong>{his?.position_held}</strong> - {his?.duration_n}{" "} 
                    {his?.duration_my} - {his?.company_name}
                  </p>

                  <p>
                    <span style={{
                        fontWeight: "bold"
                    }}>Manager:</span>
                     {his?.manager_name}</p>
                  <p>Reason For Leaving: {his?.reasons_for_leaving}</p>
                  <ul>
                    <li>
                     {his?.additional_comments || "N/A"}
                    </li>
                  </ul>
                </div>
              </>
            ))}
        </section>

        {/* Reference Information */}
        {/* <section className="reference-section section">
          <h4>REFERENCE INFORMATION</h4>
          {employee?.ref_name ? (
            <ul>
              <li>
                <strong>Name:</strong> {employee.ref_name}
              </li>
              <li>
                <strong>Phone:</strong> {employee?.ref_contact}
              </li>
              <li>
                <strong>Place Of Employment:</strong>{" "}
                {employee?.ref_emp || "N/A"}
              </li>
              <li>
                <strong>Relationship:</strong> {employee?.ref_relation}
              </li>
            </ul>
          ) : (
            <p>No reference information available.</p>
          )}
        </section> */}

        {/* Bank Information */}
        <section className="bank-information section">
          <h4>BANK INFORMATION</h4>
          {bankInfo &&
            bankInfo.map((bank, index) => (
              <div className="bank-columns">
                {/* ZIG Bank Information */}
                <div className="bank-column">
                  <h5>ZIG Bank Information</h5>
                  <ul>
                    <li>
                      <strong>Bank Name:</strong> {bank?.zig_bank_name || "N/A"}
                    </li>
                    <li>
                      <strong>Account Number:</strong>{" "}
                      {bank?.zig_account_number || "N/A"}
                    </li>
                    <li>
                      <strong>Branch:</strong> {bank?.zig_branch || "N/A"}
                    </li>
                  </ul>
                </div>

                {/* USD Bank Information */}
                <div className="bank-column">
                  <h5>USD Bank Information</h5>
                  <ul>
                    <li>
                      <strong>Bank Name:</strong> {bank?.usd_bank_name || "N/A"}
                    </li>
                    <li>
                      <strong>Account Number:</strong>{" "}
                      {bank?.usd_account_number || "N/A"}
                    </li>
                    <li>
                      <strong>Branch:</strong> {bank?.usd_branch || "N/A"}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </section>

        {/* Next of Kin Information */}
        <section className="next-of-kin section">
          <h4>NEXT OF KIN INFORMATION</h4>
          {next_of_kin &&
            next_of_kin.map((nk, index) => (
              <ul>
                <li>
                  <strong>Name:</strong> {nk.first_name} {nk.last_name || "N/A"}
                </li>
                <li>
                  <strong>Address:</strong> {nk?.physical_address}
                </li>
                <li>
                  <strong>Phone Number:</strong> {nk?.phone_number}
                </li>
                <li>
                  <strong>Relationship:</strong> {nk?.relation}
                </li>
              </ul>
            ))}
          {/* {next_of_kin &&  ? (
            <ul>
              <li>
                <strong>Name:</strong> {employee.next_of_kin.name}
              </li>
              <li>
                <strong>Phone:</strong> {employee.next_of_kin.phone}
              </li>
              <li>
                <strong>Relationship:</strong> {employee.next_of_kin.relationship}
              </li>
            </ul>
          ) : (
            <p>No next of kin information available.</p>
          )} */}
        </section>
      </div>
    </div>
  );
};

export default ProfilePrintout;
