import React from "react";
import "./EmployeeDataForm.css";

const EmployeeDataFormPrintOut = ({ employee, type, index }) => {
  const renderGenderBox = (text, marked) => (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        margin: "2px",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          width: "20px",
          height: "20px",
          display: "inline-block",
          textAlign: "center",
          margin: "1px",
          backgroundColor: marked ? "lightfray" : "white",
        }}
      >
        {marked && (
          <span
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {" "}
            ✔️
          </span>
        )}
      </div>
      <span
        style={{
          fontWeight: "bold",
          marginLeft: "20px",
        }}
      >
        {" "}
        {text}
      </span>
    </div>
  );

  const renderMaritalStatus = (text, marked) => (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        margin: "2px",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          width: "20px",
          height: "20px",
          display: "inline-block",
          textAlign: "center",
          margin: "1px",
          backgroundColor: marked ? "lightfray" : "white",
        }}
      >
        {marked && (
          <span
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {" "}
            ✔️
          </span>
        )}
      </div>
      <span
        style={{
          fontWeight: "bold",
          marginLeft: "20px",
        }}
      >
        {" "}
        {text}
      </span>
    </div>
  );

  return (
    <div
      className="data-form-container"
      style={{
        paddingTop: index >= 1 ? "5rem" : "0",
      }}
    >
      <div className="data-form-logo">
        <div>
          {type.data_form_type === "PROVIDENCE HUMAN CAPITAL" && (
            <img
              src="/assets/images/providence2.png"
              alt="logo"
              style={{
                height: "4rem",
                float: "left",
              }}
            />
          )}
          {type.data_form_type === "STAFFING SOLUTIONS" && (
            <img
              src="/assets/images/ss.png"
              alt="logo"
              style={{
                height: "5rem",
                float: "left",
              }}
            />
          )}
          {type.data_form_type === "CAPRI" && (
            <img
              src="/assets/images/capri.png"
              alt="logo"
              style={{
                height: "6rem",
                float: "left",
              }}
            />
          )}
        </div>
      </div>
      <div className="data-header-section" style={{ clear: "both" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            marginBottom: "5px",
          }}
        >
          {type.data_form_type}
        </p>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            textDecoration: "underline",
            marginBottom: "5px",
            textTransform: "uppercase",
          }}
        >
          NEW EMPLOYEE DATA FORM
        </p>
      </div>
      <div className="sub-section">
        <p
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          IDENTIFICATION DETAILS
        </p>
      </div>
      <div className="data-form-info-section">
        <p
          style={{
            paddingBottom: "1px",
          }}
        >
          {" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {type.data_form_type} New Employee Data Form <br />
          </span>{" "}
          Employee to complete first sections.{" "}
        </p>
        <hr
          style={{
            marginTop: "-10px",
            marginBottom: "2px",
            color: "black",
          }}
        />

        <div
          className="info-container"
          style={{
            marginTop: "10px",
          }}
        >
          <p
            style={{
              display: "flex",
              marginBottom: "7px",
            }}
          >
            SURNAME{" "}
            <span
              className="underline"
              style={{ flex: 0.8, marginLeft: "5px" }}
            >
              {employee &&  employee.last_name}
            </span>{" "}
            FULL NAME (s){" "}
            <span
              className="underline"
              style={{ flex: 1.2, marginLeft: "5px" }}
            >
              {employee && employee.first_name}
            </span>
          </p>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              DATE OF BIRTH{" "}
              <span
                className="underline"
                style={{ flex: 0.8, marginLeft: "5px" }}
              >
                {employee && employee.date_of_birth}
              </span>{" "}
              NATIONAL ID{" "}
              <span
                className="underline"
                style={{ flex: 1.2, marginLeft: "5px" }}
              >
                {employee && employee.national_id}
              </span>
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              NATIONALITY{" "}
              <span
                className="underline"
                style={{ flex: 0.5, marginLeft: "5px" }}
              >
                {employee && employee.nationality}
              </span>
            </p>
          </div>
          <div className="sex-box" style={{ clear: "both", marginTop: "10px" }}>
            <div className="" style={{ display: "flex" }}>
              <div style={{ flex: 0.1 }}>
                <p>SEX</p>
              </div>
              <div style={{ flex: 0.3 }}>
                {renderGenderBox(
                  "MALE",
                  employee && employee.gender === "Male" || employee && employee.gender === "MALE"
                )}
              </div>
              <div style={{ flex: 0.3 }}>
                {renderGenderBox(
                  "FEMALE",
                  employee && employee.gender === "Female" || employee && employee.gender === "FEMALE"
                )}
              </div>
            </div>
          </div>
          <div
            className="marital-status-box"
            style={{
              marginTop: "10px",
            }}
          >
            <div className="" style={{ display: "flex" }}>
              <div style={{ flex: 0.3 }}>
                <p>MARITAL STATUS</p>
              </div>
              <div style={{ flex: 0.3 }}>
                {renderMaritalStatus(
                  "SINGLE",
                  employee && employee.marital_status === "Single" ||
                  employee &&  employee.marital_status === "SINGLE"
                )}
              </div>
              <div style={{ flex: 0.3 }}>
                {renderMaritalStatus(
                  "MARRIED",
                  employee && employee.marital_status === "Married" ||
                  employee &&  employee.marital_status === "MARRIED"
                )}
              </div>
              <div style={{ flex: 0.3 }}>
                {renderMaritalStatus(
                  "DIVORCED",
                  employee && employee.marital_status === "Divorced" ||
                   employee &&  employee.marital_status === "DIVORCED"
                )}
              </div>
              <div style={{ flex: 0.3 }}>
                {renderMaritalStatus(
                  "WIDOWED",

                 employee && employee.marital_status === "Widowed" ||
                  employee &&  employee.marital_status === "WIDOWED"
                )}
              </div>
            </div>
          </div>
          <div
            className=""
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              RESIDENTIAL ADDRESS{" "}
              <span
                className="underline"
                style={{ flex: 1, marginLeft: "5px" }}
              ></span>
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              PHONE NUMBER{" "}
              <span
                className="underline"
                style={{ flex: 0.8, marginLeft: "5px" }}
              >
                {employee && employee.phone_number}
              </span>{" "}
              EMAIL ADDRESS{" "}
              <span
                className="underline2"
                style={{ flex: 1.2, marginLeft: "5px" }}
              >
                {employee && employee.email}
              </span>
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              BANK INFORMATION
            </p>
          </div>
          <div
            className=""
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              BANK NAME{" "}
              <span
                className="underline"
                style={{ flex: 0.8, marginLeft: "5px" }}
              >
                {employee && employee.bank_name}
              </span>{" "}
              ACCOUNT NUMBER{" "}
              <span
                className="underline"
                style={{ flex: 1.2, marginLeft: "5px" }}
              >
                {employee && employee.account_number}
              </span>
            </p>
          </div>
        </div>
        <div
          className="official-use-section"
          style={{
            marginTop: "80px",
          }}
        >
          <div>
            <p
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              FOR OFFICIAL USE ONLY
            </p>
          </div>
          <div>
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              COMPANY NAME{" "}
              <span
                className="underline"
                style={{ flex: 0.8, marginLeft: "5px" }}
              ></span>{" "}
              DEPARTMENT{" "}
              <span
                className="underline"
                style={{ flex: 1.2, marginLeft: "5px" }}
              ></span>
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              OCCUPATION{" "}
              <span
                className="underline"
                style={{ flex: 1, marginLeft: "5px" }}
              ></span>{" "}
              START DATE{" "}
              <span
                className="underline"
                style={{ flex: 1.2, marginLeft: "5px" }}
              ></span>{" "}
              BASIC SALARY{" "}
              <span
                className="underline"
                style={{ flex: 0.8, marginLeft: "5px" }}
              ></span>
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              ALLOWANCES / OTHER BENEFITS{" "}
              <span
                className="underline"
                style={{ flex: 1, marginLeft: "5px" }}
              ></span>
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              TOTAL{" "}
              <span
                className="underline"
                style={{ flex: 0.5, marginLeft: "5px" }}
              ></span>{" "}
              NET AMOUNT{" "}
              <span
                className="underline"
                style={{ flex: 0.5, marginLeft: "5px" }}
              ></span>{" "}
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              AUTHORISER PRINT NAME{" "}
              <span
                className="underline"
                style={{ flex: 0.7, marginLeft: "5px" }}
              ></span>{" "}
              AUTHORISER SIGNATURE{" "}
              <span
                className="underline"
                style={{ flex: 0.3, marginLeft: "5px" }}
              ></span>{" "}
            </p>
          </div>
        </div>
        <div
          className="documents-section"
          style={{
            marginTop: "70px",
          }}
        >
          <div>
            <p
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              DOCUMENT(S) ATTACHMENTS
            </p>
          </div>
          <div
            className="table-section"
            style={{
              marginBottom: "10px",
            }}
          >
            <table className="form-table">
              <thead>
                <tr>
                  <th className="tth" style={{ fontWeight: "bold" }}>
                    Please attach copies of the following documents:
                  </th>
                  <th className="tth">YES</th>
                  <th className="tth">NO</th>
                  <th className="tth">N/A</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="ttd"> Copy of National ID</td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                </tr>
                <tr>
                  <td className="ttd"> Copy of Education Certificates</td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                </tr>
                <tr>
                  <td className="ttd"> Copy of CV</td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                </tr>
                <tr>
                  <td className="ttd">
                    {" "}
                    Copy of Birth Certificate(s) (Children) and Marriage
                    Certificate
                  </td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                </tr>
                <tr>
                  <td className="ttd"> Professional Certificate(s)</td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                </tr>
                <tr>
                  <td className="ttd"> Referral Affidavit</td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                  <td className="ttd"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDataFormPrintOut;
