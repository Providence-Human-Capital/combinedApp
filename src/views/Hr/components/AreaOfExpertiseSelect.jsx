import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import ReactSelect from "react-select";
import { areaOfSpecialization } from "../../../services/api";



const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "56px",
    height: "auto",
    borderRadius: "0.25rem",
    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)" : null,
    borderColor: state.isFocused ? "#80bdff" : provided.borderColor,
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 8px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
    padding: "0px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "56px",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#2C4894",
    color: "white",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const AreaOfExpertiseSelect = () => {
  const { setFieldValue, touched, errors } = useFormikContext();
  const [selectHeight, setSelectHeight] = useState("56px");

  const handleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    const formattedValues = values.join(", ");
    setFieldValue("area_of_expertise", formattedValues);

    const newHeight = Math.max(56, 56 + values.length * 10) + "px";
    setSelectHeight(newHeight);
  };

  const options = areaOfSpecialization.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <div className="col-md-4 col-12 mb-4">
      <label
        htmlFor="occupation"
        style={{
          color: "#2C4894",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        AREA(S) OF EXPERTISE
      </label>
      <div className="form-floating">
        <ReactSelect
          options={options}
          classNamePrefix="react-select"
          onChange={handleChange}
          isClearable
          isMulti
          styles={{
            ...customStyles,
            control: (provided, state) => ({
              ...provided,
              minHeight: "56px",
              height: selectHeight,
              borderRadius: "0.25rem",
              boxShadow: state.isFocused
                ? "0 0 0 0.2rem rgba(0,123,255,.25)"
                : null,
              borderColor: state.isFocused ? "#80bdff" : provided.borderColor,
            }),
          }}
        />
        <ErrorMessage
          name="area_of_expertise"
          component="div"
          className="error-input"
        />
      </div>
    </div>
  );
};

export default AreaOfExpertiseSelect;
