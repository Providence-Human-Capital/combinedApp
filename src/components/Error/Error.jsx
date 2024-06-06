import React from "react";

const Error = ({ message }) => {
  return (
    <div className="error">
      <p>Error: {message}</p>
    </div>
  );
};

export default Error;
