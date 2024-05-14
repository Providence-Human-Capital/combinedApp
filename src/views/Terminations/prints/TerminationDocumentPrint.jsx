import React from "react";
import "./css/Termination.css";

const TerminationDocumentPrint = ({ company, client, index }) => {
  const renderBox = (text, marked) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        {" "}
        {text}
      </span>
      <div
        style={{
          border: "1px solid black",
          width: "40px",
          height: "20px",
          display: "inline-block",
          textAlign: "center",
          margin: "5px",
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
            X
          </span>
        )}
      </div>
    </div>
  );
  return (
    <>
      <div
        className=""
        style={{
          paddingTop: index >= 1 ? "10px" : "0",
          marginTop: index >= 1 ? "15rem" : "0",
        }}
      >
        <div
          className="tform-container"
          style={{
            marginBottom: "3rem",
          }}
        >
          <div className="tlogo-section" style={{}}>
            <div style={{}}>
              <img
                src="/assets/images/MINERVABC.png"
                alt="logo"
                style={{
                  height: "4rem",
                  float: "left",
                }}
              />
            </div>
          </div>
          <div className="header-section" style={{ clear: "both" }}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                marginBottom: "5px",
              }}
            >
              BENEFITS DIVISION
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
              {company.company} PENSION TERMINATION FORM
            </p>
          </div>
          <div className="sub-heading-section">
            <p
              style={{
                textTransform: "uppercase",
              }}
            >
              TO BE COMPLETED BY AN AUTHORISED OFFICIAL OF THE COMPANY AND SENT
              TO THE SECRETARIES, Minerva, P.O.BOX BW 646 BORROWDALE, HARARE
            </p>
            <p
              style={{
                textDecoration: "underline",
              }}
            >
              PART 1 - THIS PART MUST ALWAYS BE COMPLETED
            </p>
          </div>
          <div className="employee-info">
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              EMPLOYER{" "}
              <span
                className="underline-span"
                style={{ flex: 1.2, marginLeft: "5px" }}
              >
                {client.employer}
              </span>{" "}
              EMPLOYEE NO{" "}
              <span
                className="underline-span"
                style={{ flex: 0.4, marginLeft: "5px" }}
              >
                {client.employee_no}
              </span>{" "}
              PENSION REF NO.{" "}
              <span
                className="underline-span"
                style={{ flex: 0.4, marginLeft: "5px" }}
              >
                {client.pension_ref}
              </span>
            </p>
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              SURNAME{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginLeft: "5px" }}
              >
                {client.surname}
              </span>{" "}
              FIRST NAMES{" "}
              <span
                className="underline-span"
                style={{ flex: 1.5, marginLeft: "5px" }}
              >
                {client.first_name}
              </span>{" "}
              SEX{" "}
              <span
                className="underline-span"
                style={{ flex: 0.5, marginLeft: "5px" }}
              >
                {client.sex}
              </span>
            </p>
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              DATE OF BIRTH{" "}
              <span
                className="underline-span"
                style={{ flex: 0.8, marginLeft: "5px" }}
              >
                {client.date_of_birth}
              </span>{" "}
              MARITAL STATUS{" "}
              <span
                className="underline-span"
                style={{ flex: 0.8, marginLeft: "5px" }}
              >
                {client.marital_status}
              </span>{" "}
              ID NO{" "}
              <span
                className="underline-span"
                style={{ flex: 1.4, marginLeft: "5px" }}
              >
                {client.national_id}
              </span>
            </p>
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              DATE JOINED FUND{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginLeft: "5px" }}
              >
                {client.date_joined_fund}
              </span>{" "}
            </p>
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              TERMINATION DATE{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginLeft: "5px" }}
              >
                {client.termination_date}
              </span>{" "}
            </p>
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              MOBILE{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginLeft: "5px" }}
              >
                {client.mobile}
              </span>{" "}
              EMAIL{" "}
              <span
                className="underline-span"
                style={{ flex: 1, textTransform: "initial", marginLeft: "5px" }}
              >
                {client.email}
              </span>{" "}
            </p>
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              {" "}
              CONTACT ADDRESS{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginLeft: "5px" }}
              >
                {client.address},{"  "} {client.address1 && client.address1},{" "}
                {client.address2 && client.address2}
              </span>{" "}
            </p>
            <p
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              {" "}
              OTHER CONTACT PERSON (NAME){" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginLeft: "5px" }}
              >
                {client.other_contact && client.other_contact}
              </span>{" "}
              (PHONE NUMBER){" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginLeft: "5px" }}
              >
                {client.other_contact_phone && client.other_contact_phone}
              </span>{" "}
            </p>
          </div>
          <div className="leaving-reason" style={{ paddingBottom: "5px" }}>
            <p>REASON FOR LEAVING SERVICE ( MARK X IN APPROPRIATE BOX)</p>
            <div
              style={{
                display: "flex",
                marginBottom: "7px",
              }}
            >
              <span
                style={{
                  flex: 1,
                }}
              >
                {" "}
                {renderBox(
                  "RETIREMENT",
                  client.leaving_reason === "RETIREMENT"
                )}
              </span>
              <span
                style={{
                  flex: 1,
                }}
              >
                {" "}
                {renderBox(
                  "RETRENCHMENT",
                  client.leaving_reason === "RETRENCHMENT"
                )}
              </span>
              <span
                style={{
                  flex: 1,
                }}
              >
                {" "}
                {renderBox(
                  "ILL HEALTH RETIREMENT",
                  client.leaving_reason === "ILL HEALTH RETIREMENT"
                )}
              </span>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <span
                style={{
                  flex: 1,
                }}
              >
                {" "}
                {renderBox(
                  "RESIGNATION",
                  client.leaving_reason === "RESIGNATION"
                )}
              </span>
              <span
                style={{
                  flex: 1,
                }}
              >
                {" "}
                {renderBox("DEATH", client.leaving_reason === "DEATH")}
              </span>
              <span
                style={{
                  flex: 1,
                }}
              >
                {" "}
              </span>
            </div>
          </div>
          <div className="part-11">
            <p
              className=""
              style={{
                textDecoration: "underline",
              }}
            >
              PART II - PAYMENT DETAILS
            </p>
            <p
              style={{
                marginLeft: "2rem",
                display: "flex",
                marginBottom: "7px",
              }}
            >
              Bank details: BENEFICIARY NAME{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginBottom: "7px", marginLeft: "5px" }}
              >
                {client.first_name}
                {"  "}
                {client.surname}
              </span>
            </p>
            <p
              style={{
                marginLeft: "5rem",
                display: "flex",
                marginBottom: "7px",
              }}
            >
              BANK NAME{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginBottom: "7px", marginLeft: "3px" }}
              >
                {client.bank_name}
              </span>
            </p>
            <p
              style={{
                marginLeft: "5rem",
                display: "flex",
                marginBottom: "7px",
              }}
            >
              BANK BRANCH{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginBottom: "7px", marginLeft: "3px" }}
              >
                {client.branch_code}
              </span>
            </p>
            <p style={{ marginLeft: "5rem", display: "flex" }}>
              ACCOUNT No.{" "}
              <span
                className="underline-span"
                style={{ flex: 1, marginBottom: "7px", marginLeft: "3px" }}
              >
                {client.account_number}
              </span>
            </p>
          </div>
          <div className="part-III">
            <p
              className=""
              style={{
                textDecoration: "underline",
              }}
            >
              PART III - MEMBERS OPTIONS
            </p>
            <p
              style={{
                marginBottom: "7px",
              }}
            >
              A){" "}
              <span
                style={{
                  textDecoration: "underline",
                }}
              >
                TO BE COMPLETED ON RESIGNATION - MARK "X" IN BOXES FOR CHOSEN
                OPTIONS
              </span>
            </p>
            <p
              style={{
                marginBottom: "7px",
                position: "relative",
              }}
            >
              1) To receive own contributions with interest in Cash(Subject to
              Tax)
              <span
                style={{
                  position: "absolute",
                  right: "0",
                  width: "20px",
                  height: "20px",
                  border: "1px solid black",
                  boxSizing: "border-box",
                }}
              ></span>
            </p>
            <p
              style={{
                marginBottom: "7px",
                position: "relative",
              }}
            >
              {" "}
              2) To transfer Full Benefit to another Registered Pension or
              Retirement Annuity Fund.
            </p>
            <p
              style={{
                marginLeft: "5rem",
                display: "flex",
                marginBottom: "7px",
                position: "relative",
              }}
            >
              If so , name of Fund and Underwriter{" "}
              <span className="underline-span" style={{ flex: 0.7 }}></span>{" "}
              <span
                style={{
                  position: "absolute",
                  right: "0",
                  width: "20px",
                  height: "20px",
                  border: "1px solid black",
                  boxSizing: "border-box",
                }}
              ></span>
            </p>
            <p
              style={{
                marginBottom: "7px",
                position: "relative",
              }}
            >
              {" "}
              3) To transfer additionnal award (if applicable to Registered
              Pension or Retirement <br /> Annuity). If so name of the Fund and
              Underwriter-{" "}
              <span
                style={{
                  position: "absolute",
                  right: "0",
                  width: "20px",
                  height: "20px",
                  border: "1px solid black",
                  boxSizing: "border-box",
                }}
              ></span>
            </p>
            <p
              style={{
                marginBottom: "7px",
              }}
            >
              4) To Transfer Full Benefits to COPVOL *{" "}
              <span className="underline-span" style={{ flex: 0.7 }}></span>
            </p>
            <p
              style={{
                marginBottom: "7px",
              }}
            >
              To transfer additional award (if applicable) into COPVOL
            </p>
            <p style={{ marginLeft: "7rem" }}>
              *COPVOL IS A Minerva ADMINISTERED VOLUNTARY CONTRIBUTION PENSION
              FUND <span style={{ float: "right" }}>P.T.O</span>
            </p>
          </div>
        </div>

        <div className="next-page" style={{
            marginLeft: "4rem",
            marginRight: "4rem",
        }}>
          <p>
            B){" "}
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              TO BE COMPLETED ON RETIREMENT/RETRENCHMENT
            </span>
          </p>
          <p
            style={{
              position: "relative",
            }}
          >
            {" "}
            <span
              style={{
                position: "absolute",
                left: "0",
                width: "20px",
                height: "20px",
                border: "1px solid black",
                boxSizing: "border-box",
              }}
            ></span>{" "}
            <span
              style={{
                marginLeft: "30px",
              }}
            >
              {" "}
              To commute a maximum of one-third of the pension for cash
            </span>
          </p>
          <p
            style={{
              position: "relative",
              display: "flex",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "0",
                width: "20px",
                height: "20px",
                border: "1px solid black",
                boxSizing: "border-box",
              }}
            ></span>{" "}
            <span
              style={{
                marginLeft: "30px",
              }}
            >
              The pension will continue in full/reduce to{" "}
              <span
                className="underline-span"
                style={{ flex: 0.6, marginBottom: "7px" }}
              ></span>{" "}
              % on members death whilst dependant is alive{" "}
            </span>
          </p>

          <p
            style={{
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "0",
                width: "20px",
                height: "20px",
                border: "1px solid black",
                boxSizing: "border-box",
              }}
            ></span>{" "}
            <span
              style={{
                marginLeft: "30px",
              }}
            >
              {" "}
              To receive pension in full with no commutation{" "}
            </span>
          </p>

          <p
            style={{
              marginLeft: "30px",
            }}
          >
            Attach the following documents:
          </p>
          <p>
            1. Certified copies of National Registration
            Certificate/Passport/Birth Certificate/Driver's Licence
          </p>

          <p>
            C)
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              {" "}
              TO BE COMPLETED ON DEATH{" "}
            </span>{" "}
          </p>
          <p>
            Details of Spouse/s, Dependants, Beneficiaries to whom pension lump
            sum and excess death benefits are payable.
          </p>
          <p
            style={{
              display: "flex",
            }}
          >
            <span
              style={{
                textDecoration: "underline",
                flex: 1,
              }}
            >
              NAME
            </span>{" "}
            <span style={{ textDecoration: "underline", flex: 1 }}>
              DATE OF BIRTH
            </span>{" "}
            <span style={{ textDecoration: "underline", flex: 1 }}>
              RELATIONSHIP
            </span>{" "}
            <span style={{ textDecoration: "underline", flex: 1 }}>
              % BENEFITS
            </span>{" "}
          </p>
          <p style={{ display: "flex" }}>
            {" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>
          </p>
          <p style={{ display: "flex" }}>
            {" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>
          </p>
          <p style={{ display: "flex" }}>
            {" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>
          </p>
          <p style={{ display: "flex" }}>
            {" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>
          </p>
          <p style={{ display: "flex" }}>
            {" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>
          </p>
          <p style={{ display: "flex" }}>
            {" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>
          </p>
          <p
            style={{
              display: "flex",
            }}
          >
            Name and Address of Guardian{" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>{" "}
          </p>
          <p
            style={{
              display: "flex",
            }}
          >
            Where dependants are below the{" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>{" "}
          </p>
          <p
            style={{
              display: "flex",
            }}
          >
            Age of 18 years (Name){" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>{" "}
          </p>
          <p
            style={{
              display: "flex",
              marginLeft: "5rem",
            }}
          >
            Address{" "}
            <span
              className="underline-span"
              style={{ flex: 1, marginBottom: "7px" }}
            ></span>
          </p>
          <p>Attach the following documents:</p>

          <p
            style={{
              marginBottom: "7px",
            }}
          >
            1. Original Cerificate of Death.
          </p>
          <p
            style={{
              marginBottom: "7px",
            }}
          >
            2. Certified copies and Birth Certificates of Dependant children
            (under the age of 18 or 23 where applicable).
          </p>
          <p style={{}}>
            3. Certified copies of proof of marriage (where applicable)
          </p>
          <div
            className=""
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                flex: 0.7,
              }}
            >
              {" "}
              <p
                style={{
                  display: "flex",
                  marginBottom: "7px",
                }}
              >
                MEMBER'S SIGNATURE{" "}
                <span className="underline-span" style={{ flex: 1 }}></span>{" "}
              </p>
              <p
                style={{
                  marginLeft: "15rem",
                  marginBottom: "7px",
                }}
              >
                (WHERE APPLICABLE)
              </p>
              <p
                style={{
                  display: "flex",
                  marginBottom: "7px",
                }}
              >
                SIGNED
                <span
                  className="underline-span"
                  style={{ flex: 1 }}
                ></span>{" "}
              </p>
              <p
                style={{
                  marginLeft: "13rem",
                  marginBottom: "7px",
                }}
              >
                (COMPANY AUTHORISED SIGNATORY)
              </p>
              <p
                style={{
                  display: "flex",
                }}
              >
                CAPACITY{" "}
                <span className="underline-span" style={{ flex: 1 }}></span>{" "}
              </p>
              <p
                style={{
                  display: "flex",
                  marginBottom: "7px",
                }}
              >
                DATE{" "}
                <span className="underline-span" style={{ flex: 0.5 }}></span>{" "}
              </p>
            </div>
            <div
              style={{
                flex: 0.3,
              }}
            >
              <span
                style={{
                  border: "2px solid black",
                  width: "110px",
                  height: "110px",
                  display: "flex",
                  textAlign: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "12px",
                  margin: "10px",
                }}
              >
                EMPLOYER OFFICIAL COMPANY STAMP
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TerminationDocumentPrint;
