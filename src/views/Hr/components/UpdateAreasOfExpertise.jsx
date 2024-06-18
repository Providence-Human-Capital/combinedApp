import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import ReactSelect from "react-select";
import axios from "axios";
import { API } from "../../../../config";
import Loading from "../../../components/Loading.jsx/Loading";
import { useNavigate } from "react-router-dom";
import useEmployee from "../hooks/useEmployee";

const areaOfSpecialization = [
  "GENERAL WORK",
  "ADMIN AND OFFICE",
  "AGRICULTURE, FARMING",
  "APPRENTICESHIP",
  "ATTACHMENT & INTERNSHIP",
  "BANKING",
  "CARPENTRY, DESIGN & TEXTILE",
  "NURSING",
  "CONSTRUCTION",
  "CONSULTANCY, RESEARCH",
  "DRIVING & LOGISTICS",
  "EDUCATION & TEACHING",
  "ENGINEERING",
  "ENVIRONMENTAL, FORESTRY",
  "HEALTHCARE",
  "PHARMACY",
  "ICT & COMPUTERS",
  "INSURANCE",
  "LEGAL & COMPLIANCE",
  "LIBRARY & RECORD MANAGEMENT",
  "MANUFACTURING",
  "MEDIA",
  "PUBLIC RELATIONS",
  "GRAPHIC DESIGN",
  "MINING",
  "NGO & SOCIAL SERVICES",
  "PROCUREMENT, PURCHASING & SUPPLY CHAIN MANAGEMENT",
  "REAL ESTATE",
  "RETAIL",
  "SALE & MARKETING",
  "SECURITY",
  "SPORTS & RECREATION",
  "STORES & WAREHOUSE",
  "STRATEGIC MANAGEMENT",
  "STUDENT LOANS",
  "TENDERS",
  "TOURISM",
  "HOSPITALITY",
  "NURSE AID",
  "PAINTING",
  "SOFTWARE DEVELOPER",
  "CYBER SECURITY",
  "ARCHITECTURE",
  "ART & DESIGN",
  "AVIATION",
  "BIOTECHNOLOGY",
  "CHEMICAL ENGINEERING",
  "CIVIL ENGINEERING",
  "CUSTOMER SERVICE",
  "DATA ANALYSIS",
  "DATA SCIENCE",
  "ELECTRICAL ENGINEERING",
  "ELECTRONICS",
  "EMERGENCY SERVICES",
  "ENERGY SECTOR",
  "EVENT MANAGEMENT",
  "FASHION & BEAUTY",
  "FINANCE",
  "FOOD & BEVERAGE",
  "GAMING",
  "GEOLOGY",
  "HEALTH & SAFETY",
  "HUMAN RESOURCES",
  "INTERIOR DESIGN",
  "JOURNALISM",
  "LANGUAGE & LINGUISTICS",
  "MANAGEMENT CONSULTING",
  "MARINE BIOLOGY",
  "MATERIALS SCIENCE",
  "MECHANICAL ENGINEERING",
  "MEDICAL RESEARCH",
  "MUSIC & PERFORMING ARTS",
  "OCEANOGRAPHY",
  "OPERATIONS MANAGEMENT",
  "PHOTOGRAPHY",
  "PHYSICAL THERAPY",
  "POLITICAL SCIENCE",
  "PROJECT MANAGEMENT",
  "PSYCHOLOGY",
  "QUALITY ASSURANCE",
  "QUANTITY SURVEYING",
  "RENEWABLE ENERGY",
  "RESEARCH & DEVELOPMENT",
  "SCIENCE & TECHNOLOGY",
  "SOCIAL MEDIA MANAGEMENT",
  "SOCIOLOGY",
  "TELECOMMUNICATIONS",
  "TRANSPORTATION",
  "URBAN PLANNING",
  "VETERINARY SCIENCE",
  "VIDEO PRODUCTION",
  "WATER MANAGEMENT",
  "WEB DEVELOPMENT",
  "WRITING & EDITING",
  "ZOOLOGY",
  "SHOP ASSISTANT",
  "BAKING",
  "CATERING",
  "TILL OPERATOR",
  "ACCOUNTING",
  "BANKING",
  "BOOKKEEPER",
  "CASHIER",
  "COMPUTER OPERATOR",
  "AEROSPACE ENGINEERING",
  "ARTIFICIAL INTELLIGENCE",
  "ASTROPHYSICS",
  "BIOINFORMATICS",
  "BLOCKCHAIN TECHNOLOGY",
  "CHEF",
  "COMPUTATIONAL LINGUISTICS",
  "CYTOTECHNOLOGY",
  "DENTISTRY",
  "E-COMMERCE",
  "ECONOMICS",
  "FORENSIC SCIENCE",
  "GENETICS",
  "HISTORICAL RESEARCH",
  "MARINE ENGINEERING",
  "MICROBIOLOGY",
  "NANOTECHNOLOGY",
  "NEUROSCIENCE",
  "PHOTONICS",
  "ROBOTICS",
  "SUSTAINABILITY MANAGEMENT",
  "TRUCK DRIVER",
  "WAITER",
  "MERCHANDISER",
  "ACCOUNTANT",
  "LABELLING MACHINE OPERATOR",
  "VERTERINARY",
  "CLEANER",
  "SHEQ",
  "LIFEGUARD",
  "SORTER",
  "FITNESS TRAINER"
];

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

const UpdateAreasOfExpertise = ({ employeeId, specializations }) => {
 

  const navigate = useNavigate();
  const [selectHeight, setSelectHeight] = useState("56px");
  const [isUpdating, setIsUpdating] = useState(false);
  const [onChangeSuccess, setOnChangeSuccess] = useState(false);

  const handleChange = (selectedOptions, setFieldValue) => {
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

  // Convert the specializations string to array of objects for ReactSelect
  const initialSpecializations = specializations
    ? specializations.split(", ").map((spec) => ({ value: spec, label: spec }))
    : [];

  return (
    <Formik
      initialValues={{ area_of_expertise: specializations || "" }}
      onSubmit={(values, { setSubmitting }) => {
        setIsUpdating(true);
        axios
          .patch(`${API}/api/employee/${employeeId}/expertise`, values)
          .then((response) => {
            console.log("Data successfully sent to the server:", response.data);
            setOnChangeSuccess(true);
            navigate(`/employee/update/${employeeId}`);
          })
          .catch((error) => {
            console.error("Error sending data to the server:", error);
          })
          .finally(() => {
            setSubmitting(false);
            setIsUpdating(false);
          });
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div>
            <h4 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Update Areas of Expertise
            </h4>
            <div className="col-md-12 col-12 mb-4">
              <div className="form-floating" style={{ marginTop: "3rem" }}>
                <ReactSelect
                  options={options}
                  classNamePrefix="react-select"
                  onChange={(selectedOptions) =>
                    handleChange(selectedOptions, setFieldValue)
                  }
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
                      borderColor: state.isFocused
                        ? "#80bdff"
                        : provided.borderColor,
                    }),
                  }}
                  defaultValue={initialSpecializations}
                />
                <ErrorMessage
                  name="area_of_expertise"
                  component="div"
                  className="error-input"
                />
              </div>
            </div>
            {onChangeSuccess && (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Successfully updated Employee area of expertise
              </p>
            )}
            {isUpdating ? (
              <Loading />
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                UPDATE AREA OF EXPERTISES
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateAreasOfExpertise;
