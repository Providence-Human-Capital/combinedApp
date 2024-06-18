import { API } from "../../config";

export const getAllVisitors = async () => {
  const visitorsResponse = await fetch(`${API}/api/visitors`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await visitorsResponse.json();
  console.log("All Visitors", visitorsResponse);

  const visitors = responseData;
  return visitors;
};

export const getAllEmployees = async () => {
  const employeesResponse = await fetch(`${API}/api/employees`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await employeesResponse.json();
  console.log("All Employees", responseData);

  const employees = responseData;
  return employees;
};

export const getStatsCounts = async () => {
  const statsResponse = await fetch(`${API}/api/counts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await statsResponse.json();
  console.log("All Stats", responseData);

  const stats = responseData;
  return stats;
};

export const getVisitisInLast7 = async () => {
  const visitsResponse = await fetch(`${API}/api/visits-count-last-7-days`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await visitsResponse.json();
  console.log("All Visits", responseData);

  const stats = responseData;
  return stats;
};

export const getVisitorsByGenderDistribution = async () => {
  const genderDistributionResponse = await fetch(
    `${API}/api/visitors-gender-counts`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await genderDistributionResponse.json();
  const genderStats = responseData;
  return genderStats;
};

// http://localhost:3000/api/meeting-purpose-data
export const getReasonForVisitStats = async () => {
  const responseRVS = await fetch(`${API}/api/meeting-purpose-data`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await responseRVS.json();
  const meetingPurpse = responseData;
  return meetingPurpse;
};

export const getAllCompanies = async () => {
  const companiesResponse = await fetch(`${API}/api/company`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await companiesResponse.json();
  const companies = responseData.data;
  return companies;
};

export const getAllHealthFacilities = async () => {
  const clinicsResponse = await fetch(`${API}/api/clinic`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await clinicsResponse.json();
  const clinics = responseData.data;
  return clinics;
};

export const getAllPatients = async () => {
  const patientsResponse = await fetch(`${API}/api/patient`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await patientsResponse.json();
  const patients = responseData.data;
  console.log("PATIENTS ", patients);
  return patients;
};

import axios from "axios";

export const fetchNewEmployees = async () => {
  const response = await axios.get(`${API}/api/new-employees`);
  console.log("New employees", response.data);
  return response.data.data;
};

export const fetchTerminatedEmployees = async () => {
  const response = await axios.get(`${API}/api/get/terminated-employees`);
  console.log("Terminated employees", response.data);
  return response.data.data;
};

export const fetchAttachmentEmployees = async () => {
  const response = await axios.get(`${API}/api/get/attachment-employees`);
  console.log("Attachment employees", response.data);
  return response.data.data;
};
