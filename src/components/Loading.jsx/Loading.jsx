import React, { Fragment } from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <Fragment>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Fragment>
  );
};

export default Loading;
