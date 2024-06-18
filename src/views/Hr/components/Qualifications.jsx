import React from "react";

const Qualifications = ({ employee }) => {
  const areaOfExpertise = employee?.area_of_expertise;

  if (!areaOfExpertise) {
    return (
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-3" style={{ color: "#0E9645", fontWeight: "bold" }}>
            AREAS OF EXPERTISE
          </h4>
          <td>
            <span className="badge badge-primary">
              NO AREAS OF SPECIALIZATION AVAILABLE
            </span>
          </td>
        </div>
      </div>
    );
  }

  const areaOfExpertiseArray = areaOfExpertise.split(", ");

  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-3" style={{ color: "#0E9645", fontWeight: "bold" }}>
            AREAS OF EXPERTISE
          </h4>
          {areaOfExpertiseArray.map((area, index) => (
            <span
              className="badge badge-info"
              key={index}
              style={{ margin: "10px", fontSize: "18px", backgroundColor: "#58ab46", fontWeight: "400" }}
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Qualifications;
