import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Loading from "../../../components/Loading.jsx/Loading";
import { API } from "../../../../config";
import Swal from "sweetalert2";

function MedicalRecordForm({ closeAddMedicalRecord }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPatient =
    useSelector((state) => state.patient.selectedPatient) || {};

  const diagnoses = [
    { value: "ASSULT", label: "ASSULT" },
    { value: "ASTHMA", label: "ASTHMA" },
    { value: "DENTAL", label: "DENTAL" },
    { value: "ABDOMINAL", label: "ABDOMINAL" },
    { value: "ABSCESS", label: "ABSCESS" },
    { value: "ALLERGIES", label: "ALLERGIES" },
    { value: "BACKACHE", label: "BACKACHE" },
    { value: "ARTHRITIS", label: "ARTHRITIS" },
    { value: "CELLULITIS", label: "CELLULITIS" },
    { value: "CHEST PAINS", label: "CHEST PAINS" },
    { value: "COVID POSITIVE", label: "COVID POSITIVE" },
    { value: "DIABETES", label: "DIABETES" },
    { value: "DIARRHOEA", label: "DIARRHOEA" },
    { value: "DRESSING", label: "DRESSING" },
    { value: "DYSMENORRHOEA", label: "DYSMENORRHOEA" },
    { value: "EAR/NOSE/THROAT", label: "EAR/NOSE/THROAT" },
    { value: "EPILEPSY", label: "EPILEPSY" },
    { value: "EPISTAXIS", label: "EPISTAXIS" },
    { value: "EXIT MEDICALS", label: "EXIT MEDICALS" },
    { value: "EYE", label: "EYE" },
    { value: "FIRST AID INJURY", label: "FIRST AID INJURY" },
    { value: "FRACTURES", label: "FRACTURES" },
    { value: "HEADACHE", label: "HEADACHE" },
    { value: "HIV RELATED", label: "HIV RELATED" },
    { value: "HYPERTENSION", label: "HYPERTENSION" },
    { value: "MENTAL ILLNESS", label: "MENTAL ILLNESS" },
    { value: "MUSCULO-SKELETAL PAINS", label: "MUSCULO-SKELETAL PAINS" },
    { value: "NEUROLOGICAL", label: "NEUROLOGICAL" },
    { value: "NEW INJURY ON DUTY", label: "NEW INJURY ON DUTY" },
    { value: "OLD INJURY ON DUTY", label: "OLD INJURY ON DUTY" },
    { value: "ORAL", label: "ORAL" },
    { value: "PILES", label: "PILES" },
    { value: "PRE-EMPLOYMENT MEDICALS", label: "PRE-EMPLOYMENT MEDICALS" },
    { value: "RESPIRATORY", label: "RESPIRATORY" },
    { value: "ROAD TRAFFIC ACCIDENT", label: "ROAD TRAFFIC ACCIDENT" },
    {
      value: "SEXUALLY TRANSMITTED INFECTIONS",
      label: "SEXUALLY TRANSMITTED INFECTIONS",
    },
    { value: "SKIN", label: "SKIN" },
    { value: "STRESS", label: "STRESS" },
    { value: "SOFT TISSUE INJURY", label: "SOFT TISSUE INJURY" },
    { value: "URINARY TRACT INFECTIONS", label: "URINARY TRACT INFECTIONS" },
  ];

  const chronicDiseases = [
    { value: "DIABETES", label: "DIABETES" },
    { value: "HYPERTENSION", label: "HYPERTENSION" },
    { value: "ASTHMA", label: "ASTHMA" },
    { value: "COPD", label: "COPD" },
    { value: "ARTHRITIS", label: "ARTHRITIS" },
    { value: "CAD", label: "CAD" },
    { value: "CKD", label: "CKD" },
    { value: "HEART FAILURE", label: "HEART FAILURE" },
    { value: "CHRONIC LIVER DISEASE", label: "CHRONIC LIVER DISEASE" },
    {
      value: "CHRONIC OBSTRUCTIVE SLEEP APNEA",
      label: "CHRONIC OBSTRUCTIVE SLEEP APNEA",
    },
    { value: "RHEUMATOID ARTHRITIS", label: "RHEUMATOID ARTHRITIS" },
    { value: "CROHN DISEASE", label: "CROHN DISEASE" },
    { value: "ULCERATIVE COLITIS", label: "ULCERATIVE COLITIS" },
    { value: "MULTIPLE SCLEROSIS", label: "MULTIPLE SCLEROSIS" },
    { value: "PARKINSON DISEASE", label: "PARKINSON DISEASE" },
    { value: "ALZHEIMER DISEASE", label: "ALZHEIMER DISEASE" },
    { value: "OSTEOPOROSIS", label: "OSTEOPOROSIS" },
    { value: "CHRONIC FATIGUE SYNDROME", label: "CHRONIC FATIGUE SYNDROME" },
    { value: "FIBROMYALGIA", label: "FIBROMYALGIA" },
    { value: "CHRONIC MIGRAINE", label: "CHRONIC MIGRAINE" },
  ];

  const clinics = useSelector((state) =>
    state.clinic.clinics.map((clinic) => ({
      value: clinic.id,
      label: `${clinic.name}`,
    }))
  );

  const initialValues = {
    date_of_visit: "",
    diagnosis: "",
    diagnosis_information: "",
    diastolic_bp: "",
    systolic_bp: "",
    bmi: "",
    on_chronic_medication: false,
    chronic_disease: "",
    days_off_duty: 0,
    tuberculosis_patient: false,
    injury_on_duty: false,
    hospital_referral: false,
    clinic_branch: "",
  };

  const validationSchema = yup.object().shape({

    clinic_branch: yup
      .string()
      .required("Select the clinic brach the patient attended"),
    date_of_visit: yup.date().required("The date of visit is required"),
    diagnosis: yup.string().required("Diagnosis is required"),
    diagnosis_information: yup.string(),
    diastolic_bp: yup.number().required("Diastolic blood pressure is required"),
    systolic_bp: yup.number().required("Systolic blood pressure is required"),
    bmi: yup.number().required("BMI is required"),
    on_chronic_medication: yup.boolean(),
    tuberculosis_patient: yup.boolean(),

    chronic_disease: yup.string(),
    days_off_duty: yup.number(),
    injury_on_duty: yup.boolean(),
    hospital_referral: yup.boolean(),
  });

  const onSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    values.clinic_id = values.clinic_branch;
    values.patient_id = selectedPatient?.id;
    console.log("Values", values);
    try {
      const response = await fetch(`${API}/api/medical/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "New Patient Successfully Registered",
          timer: 4000,
          confirmButtonColor: "#007a41",
        });
      }
      setIsLoading(false);
      closeAddMedicalRecord()
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          isSubmitting,
          handleSubmit,
          touched,
          errors,
          setFieldValue,
        }) => (
          <Form>
            <h6
              style={{
                textTransform: "uppercase",
                margin: 0,
              }}
              className="fw-400"
            >
              Add{" "}
              <span
                className=""
                style={{
                  fontWeight: "bold",
                }}
              >
                {selectedPatient.first_name} {selectedPatient.last_name}
              </span>{" "}
              Patient's Medical Record
            </h6>
            <div className="space"></div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-floating">
                  <Field
                    type="date"
                    className={`form-control ${
                      touched.date_of_visit && errors.date_of_visit
                        ? "error-input"
                        : ""
                    }`}
                    id="date_of_visit"
                    name="date_of_visit"
                  />
                  <label htmlFor="date_of_visit">DATE OF VISIT</label>
                  <ErrorMessage
                    name="date_of_visit"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="clinic_branch">CLINIC BRANCH ATTENDED</label>
                  <Select
                    options={clinics}
                    name="clinic_branch"
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        height: "55px",
                      }),
                    }}
                    onChange={(selectedOption) =>
                      setFieldValue("clinic_branch", selectedOption.value)
                    }
                    onBlur={() => setFieldTouched("clinic_branch", true)}
                  />
                  <ErrorMessage
                    name="clinic_branch"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="space"></div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="diagnosis">DIAGNOSIS</label>
                  <Select
                    options={diagnoses}
                    name="diagnosis"
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        height: "55px",
                      }),
                    }}
                    onChange={(selectedOption) =>
                      setFieldValue("diagnosis", selectedOption.value)
                    }
                    onBlur={() => setFieldTouched("diagnosis", true)}
                  />
                  <ErrorMessage
                    name="diagnosis"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-floating">
                  <Field
                    type="text"
                    className={`form-control ${
                      touched.diagnosis_information &&
                      errors.diagnosis_information
                        ? "error-input"
                        : ""
                    }`}
                    id="diagnosis_information"
                    name="diagnosis_information"
                  />
                  <label htmlFor="diagnosis_information">
                    DIAGNOSIS INFORMATION
                  </label>
                  <ErrorMessage
                    name="diagnosis_information"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="space"></div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-floating">
                  <Field
                    type="number"
                    className={`form-control ${
                      touched.diastolic_bp && errors.diastolic_bp
                        ? "error-input"
                        : ""
                    }`}
                    id="diastolic_bp"
                    name="diastolic_bp"
                  />
                  <label htmlFor="diastolic_bp">DIASTOLIC BP</label>
                  <ErrorMessage
                    name="diastolic_bp"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <Field
                    type="number"
                    className={`form-control ${
                      touched.systolic_bp && errors.systolic_bp
                        ? "error-input"
                        : ""
                    }`}
                    id="systolic_bp"
                    name="systolic_bp"
                  />
                  <label htmlFor="systolic_bp">SYSTOLIC BP</label>
                  <ErrorMessage
                    name="systolic_bp"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <Field
                    type="number"
                    className={`form-control ${
                      touched.bmi && errors.bmi ? "error-input" : ""
                    }`}
                    id="bmi"
                    name="bmi"
                  />
                  <label htmlFor="bmi">BODY MASS INDEX</label>
                  <ErrorMessage
                    name="bmi"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="space"></div>
            <div className="border-bottom"></div>
            <div className="space"></div>
            <div className="row">
              <div className="col-md-4 col-12">
                <div class="">
                  <div className="form-group">
                    <label
                      className="fw-400"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      ON CHRONIC MEDICATION
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="on_chronic_medication"
                          type="radio"
                          id="on_chronic_1"
                          value="true"
                          checked={values.on_chronic_medication === true}
                          onChange={() =>
                            setFieldValue("on_chronic_medication", true)
                          }
                        />
                        <label htmlFor="on_chronic_1">YES</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="on_chronic_medication"
                          type="radio"
                          id="on_chronic_2"
                          value="false"
                          checked={values.on_chronic_medication === false}
                          onChange={() =>
                            setFieldValue("on_chronic_medication", false)
                          }
                        />
                        <label htmlFor="on_chronic_2">NO</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  {/* <Field
                    as="select"
                    className={`form-select ${
                      touched.chronic_disease && errors.chronic_disease
                        ? "error-input"
                        : ""
                    }`}
                    id="chronic_disease"
                    name="chronic_disease"
                  >
                    <option value=""></option>
                    <option value="ASTHMA">ASTHMA</option>
                  </Field> */}

                  <label htmlFor="chronic_disease">CHRONIC DISEASE</label>
                  <Select
                    options={chronicDiseases}
                    name="chronic_disease"
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        height: "55px",
                      }),
                    }}
                    onChange={(selectedOption) =>
                      setFieldValue("chronic_disease", selectedOption.value)
                    }
                    onBlur={() => setFieldTouched("chronic_disease", true)}
                  />
                  <ErrorMessage
                    name="chronic_disease"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div class="">
                  <div className="form-group">
                    <label
                      className="fw-400"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      TUBERCULOSIS PATIENT
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="tuberculosis_patient"
                          type="radio"
                          id="tuber_1"
                          value="true"
                          checked={values.tuberculosis_patient === true}
                          onChange={() =>
                            setFieldValue("tuberculosis_patient", true)
                          }
                        />
                        <label htmlFor="tuber_1">YES</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="tuberculosis_patient"
                          type="radio"
                          id="tuber_2"
                          value="false"
                          checked={values.tuberculosis_patient === false}
                          onChange={() =>
                            setFieldValue("tuberculosis_patient", false)
                          }
                        />
                        <label htmlFor="tuber_2">NO</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-bottom"></div>
            <div className="space"></div>
            <div className="row">
              <div className="col-md-3 col-12">
                <div class="">
                  <div className="form-group">
                    <label
                      className="fw-400"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      INJURY ON DUTY
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="injury_on_duty"
                          type="radio"
                          id="iod_1"
                          value="true"
                          checked={values.injury_on_duty === true}
                          onChange={() => setFieldValue("injury_on_duty", true)}
                        />
                        <label htmlFor="iod_1">YES</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="injury_on_duty"
                          type="radio"
                          id="iod_2"
                          value="false"
                          checked={values.injury_on_duty === false}
                          onChange={() =>
                            setFieldValue("injury_on_duty", false)
                          }
                        />
                        <label htmlFor="iod_2">NO</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-12">
                <div class="">
                  <div className="form-group">
                    <label
                      className="fw-400"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      HOSPITAL REFERAL
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="hospital_referral"
                          type="radio"
                          id="hr_1"
                          value="true"
                          checked={values.hospital_referral === true}
                          onChange={() =>
                            setFieldValue("hospital_referral", true)
                          }
                        />
                        <label htmlFor="hr_1">YES</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="hospital_referral"
                          type="radio"
                          id="hr_2"
                          value="false"
                          checked={values.hospital_referral === false}
                          onChange={() =>
                            setFieldValue("hospital_referral", false)
                          }
                        />
                        <label htmlFor="hr_2">NO</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating">
                  <Field
                    type="number"
                    className={`form-control ${
                      touched.days_off_duty && errors.days_off_duty
                        ? "error-input"
                        : ""
                    }`}
                    id="days_off_duty"
                    name="days_off_duty"
                  />
                  <label htmlFor="days_off_duty">DAYS OFF DUTY</label>
                  <ErrorMessage
                    name="days_off_duty"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="border-bottom"></div>
            <div className="mt-4">
              {isLoading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-success m-2"
                  style={{
                    borderRadius: "7px",
                  }}
                  type="submit"
                >
                  ADD MEDICAL RECORD
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default MedicalRecordForm;
