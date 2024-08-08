import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../../../../config";
import Loading from "../../../../../components/Loading.jsx/Loading";
import { FaUser, FaPhone, FaHome, FaHeart } from "react-icons/fa";
import {
  faUser,
  faHistory,
  faBank,
  faHome,
  faPhone,
  faHeart,
  faAnchor,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NextOfKinCard = ({ employeeId, refetchTrigger }) => {
  const fetchNextOfKin = async () => {
    const { data } = await axios.get(
      `${API}/api/employees/${employeeId}/next-of-kin`
    );
    console.log("NEXT OF KIN INFORMATION", data.data);
    return data.data;
  };

  const { data, error, isLoading } = useQuery("nextOfKin", fetchNextOfKin);

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
          <p className="text-danger">Error loading data</p>
        </div>
      </div>
    );

  return (
    <div className="box mb-4 shadow-sm border-0">
      <div
        className="box-header"
        style={{
          backgroundColor: "#007a41",
          color: "white",
          textTransform: "uppercase",
          letterSpacing: "0.05rem",
          fontSize: "1.1rem",
          fontWeight: "bold",
          borderBottom: "none",
          borderRadius: "0.75rem 0.75rem 0 40px",
        }}
      >
        Next of Kin Details
      </div>

      {data &&
        data.map((emp, index) => (
          <div
            key={index}
            className="box-body border-bottom "
            style={{
              padding: "20px",
              backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
            }}
          >
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <FontAwesomeIcon icon={faUser} className={`progress-icon`} />
              </div>
              <div
                className="col font-weight-bold text-muted"
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                First Name:
              </div>
              <div className="col text-right">{emp.first_name}</div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <FontAwesomeIcon icon={faUser} className={`progress-icon`} />
              </div>
              <div
                className="col font-weight-bold text-muted"
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Last Name:
              </div>
              <div className="col text-right">{emp.last_name}</div>
            </div>
            {emp.physical_address && (
              <div className="row mb-3 align-items-center">
                <div className="col-auto">
                  <FontAwesomeIcon icon={faHome} className={`progress-icon`} />
                </div>
                <div
                  className="col font-weight-bold text-muted"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Address:
                </div>
                <div className="col text-right">{emp.physical_address}</div>
              </div>
            )}
            {emp.phone_number && (
              <div className="row mb-3 align-items-center">
                <div className="col-auto">
                  <FontAwesomeIcon icon={faPhone} className={`progress-icon`} />
                </div>
                <div
                  className="col font-weight-bold text-muted"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Phone Number:
                </div>
                <div className="col text-right">{emp.phone_number}</div>
              </div>
            )}
            {emp.relation && (
              <div className="row mb-3 align-items-center">
                <div className="col-auto">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`progress-icon `}
                  />
                </div>
                <div
                  className="col font-weight-bold text-muted"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Relation:
                </div>
                <div className="col text-right">{emp.relation}</div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default NextOfKinCard;
