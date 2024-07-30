import React from "react";
import { Link } from "react-router-dom";

const OverviewCard = ({ svgLink, Label, Number, to }) => {
  return (
    <>
      <div className="col-xl-3 col-md-6 col-6">
        <div className="box">
          <Link to={to}>
            <div className="box-body text-center">
              <div className="bg-primary-light rounded10 p-20 mx-auto w-100 h-100">
                <img src={svgLink} className="" alt="" />
              </div>
              <p
                className="text-fade mt-15 mb-5"
                style={{
                  fontWeight: "bold",
                }}
              >
                {Label}
              </p>
              <h2 className="mt-0">{Number}</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
