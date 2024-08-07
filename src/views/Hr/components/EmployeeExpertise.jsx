import React from "react";
import "./Tooltip.css";

const EmployeeExpertise = ({ employee }) => {
  const areaOfExpertise = employee.area_of_expertise;

  if (!areaOfExpertise) {
    return (
      <td>
        <span className="badge badge-primary">N/A</span>
      </td>
    );
  }

  const areaOfExpertiseArray = areaOfExpertise.split(", ");

  console.log("Area of Expertise Array:", areaOfExpertiseArray); // Debugging line

  return (
    <td >
      <div className="tooltip">
        <span
          className="badge badge-info"
          style={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          {areaOfExpertiseArray[0]}
        </span>

        <span className="tooltiptext">
          {areaOfExpertiseArray.map((area, index) => (
            <div
              className="badge badge-primary"
              style={{
                margin: "2px",
              }}
              key={index}
            >
              {area}
            </div>
          ))}
        </span>
      </div>
    </td>
  );
};

export default EmployeeExpertise;
