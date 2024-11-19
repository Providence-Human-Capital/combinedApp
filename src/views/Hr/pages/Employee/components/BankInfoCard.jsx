import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../../../../../components/Loading.jsx/Loading";
import { API } from "../../../../../../config";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BankInfoCard = ({ employeeId, refetchTrigger }) => {
  const fetchBankInformation = async () => {
    const { data } = await axios.get(
      `${API}/api/employees/${employeeId}/bank-information`
    );

    console.log("Bank Information", data);
    return data.data;
  };
  const { data, error, isLoading, refetch } = useQuery(
    "bankInformation",
    fetchBankInformation
  );


  useEffect(() => {
    // alert('Triggered Employee Refetching Please wait...');
    refetch();

  }, [refetchTrigger, refetch]);


  if (isLoading)
    return (
      <div className="box">
        <div className="box-body">
          <Loading />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="box">
        <div className="box-body">
          <p className="text-danger"> Error loading data</p>
        </div>
      </div>
    );

  return (
    <div className="box">
      <div className="box-header no-border">
        <h3
          className="box-title"
          style={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          Bank Information
        </h3>
      </div>
      <div className="box-body">
        {data.length > 0 ? (
          data.map((bankInfo, index) => (
            <div key={index} className="card mb-3">
              <div
                className="card-header  text-white"
                style={{
                  backgroundColor: "#007a41",
                  borderRadius: "0.75rem 0.75rem 40px 0px",
                }}
              >
                <h5
                  className="card-title"
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className={`progress-icon`}
                  />{" "}
                  {"     "}Bank Account Details
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold text-muted">
                      ZIG Bank Name:
                    </span>
                    <span>{bankInfo.zig_bank_name || "N/A"}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold text-muted">
                      ZIG Branch:
                    </span>
                    <span>{bankInfo.zig_branch || "N/A"}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold text-muted">
                      ZIG Account Number:
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "#007a41",
                      }}
                    >
                      {bankInfo.zig_account_number || "N/A"}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold text-muted">
                      USD Bank Name:
                    </span>
                    <span>{bankInfo.usd_bank_name || "N/A"}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold text-muted">
                      USD Branch:
                    </span>
                    <span>{bankInfo.usd_branch || "N/A"}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold text-muted">
                      USD Account Number:
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "#007a41",
                      }}
                    >
                      {bankInfo.usd_account_number || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No bank information available.</p>
        )}
      </div>
    </div>
  );
};

export default BankInfoCard;
