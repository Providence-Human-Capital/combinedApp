import React from "react";
import "./css/Beneficiary.css";

const BeneficiaryDocumentPrint = ({ client, bankData }) => {
  return (
    <>
      <div className="form-container">
        <div className="logo-container">
          <img
            src="/public/assets/images/MINERVABC.png"
            alt="logo"
            style={{
              height: "5rem",
              float: "right",
            }}
          />
        </div>
        <div className="address-container">
          <p
            style={{
              textTransform: "uppercase",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            MINERVA RISK ADVISORS
          </p>
          <p
            style={{
              marginBottom: "5px",
            }}
          >
            Employee Benefits Consulting
          </p>
          <p
            style={{
              marginBottom: "5px",
            }}
          >
            1 Kenilworth Road
          </p>
          <p
            style={{
              marginBottom: "5px",
            }}
          >
            Newlands
          </p>
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            HARARE
          </p>
        </div>

        <div
          className="middle-section"
          style={{
            paddingTop: "2rem",
          }}
        >
          <p
            className="dear-sir"
            style={{
              marginBottom: "5px",
            }}
          >
            Dear Sir/Madam
          </p>
          <p
            className="mopfr"
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            METHOD OF PAYMENT FOR REFUND
          </p>
          <p>I acknowledge and understand</p>
          <p>a) No paymemt will be made to a third party's account.</p>
          <p>b)I confirm my banking details are as follows;</p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            NAME OF PENSION FUND{" "}
            <span className="underline-span" style={{ flex: 1 }}>
              {"   "}{bankData.pension_fund}
            </span>
          </p>
          <p>
            DATE OF BIRTH{" "}
            <span className="underline-span" style={{ width: "200px" }}>
              {"   "} {bankData.date_of_birth}
            </span>{" "}
            NATIONAL ID NO{" "}
            <span className="underline-span" style={{ width: "280px" }}>
              {"   "}{bankData.national_id}
            </span>
          </p>
          <p>Kindly transfer my refund to the following Bank account:</p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Name of Bank:{" "}
            <span className="underline-span" style={{ flex: 1 }}>
              {bankData.name_of_bank}
            </span>
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Account Name:{" "}
            <span className="underline-span" style={{ flex: 1 }}>
              {bankData.account_name}
            </span>
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Branch Name:{" "}
            <span className="underline-span" style={{ flex: 1 }}>
              {bankData.branch_name}
            </span>
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Account Number:{" "}
            <span className="underline-span" style={{ flex: 1 }}>
              {bankData.account_number}
            </span>
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Email:{" "}
            <span
              className="underline-span"
              style={{ flex: 1, textTransform: "initial" }}
            >
              {bankData.email}
            </span>
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Phone Numbers:{" "}
            <span className="underline-span" style={{ flex: 1 }}>
              {bankData.phone_number1}{" "}
              {bankData.phone_number2 !== ""
                ? "/ " + bankData.phone_number2
                : ""}
            </span>
          </p>
        </div>
        <div className="signature-container">
          <p>
            {" "}
            <span
              className="underline"
              style={{
                width: "500px",
              }}
            ></span>{" "}
          </p>
          <p
            style={{
              fontWeight: "bold",
            }}
          >
            DATE & SIGNATURE
          </p>
        </div>
      </div>
    </>
  );
};

export default BeneficiaryDocumentPrint;
