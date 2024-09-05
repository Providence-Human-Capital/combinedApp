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

export const fetchTrainedEmployees = async () => {
  const response = await axios.get(`${API}/api/get/pending-employees`);
  console.log("New employees", response.data);
  return response.data.data;
};

export const fetchDeployedEmployees = async () => {
  const response = await axios.get(`${API}/api/deployed-employees`);
  console.log("Active Employees", response.data);
  return response.data.data;
};

export const fetchPHCEmployees = async (companyId) => {
  const response = await axios.get(`${API}/api/phc/employees/${companyId}`);
  console.log("PROVIDENCE HUMAN EMPLOYEES", response.data.data);
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

export const areaOfSpecialization = [
  "GENERAL WORK",
  "OTHER",
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
  "WAREHOUSE CLERK",
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
  "FITNESS TRAINER",
  "FORKLIFT OPERATOR",
  "PATTY BOY",
  "REFRIDGERATION",
  "AIR-CONDITIONING",
  "SORTER",
  "PACKER",
  "CROP SCIENCE",
  "WELDER",
  "WELDING",
  "CARPENTER",
  "TIPPER TRUCK",
  "PLANT ASSISTANT",
  "PRODUCTION CLERK",
  "CRIMINOLOGY & SOCIETY",
  "HOME CARE",
  "DOCUMENT FILING",
  "BIOLOGICAL SCIENCE",
  "COSMETOLOGY",
  "CUSTOMER CARE",
  "CATERER",
  "MACHINE OPERATOR",
  "PRODUCTION",
  "RECEPTIONIST",
  "ASSEMBLER",
  "LAW",
  "SAMPLER",
  "CALL CENTRE",
  "MUSIC",
  "COMPUTER SCIENCE",
  "THEOLOGY",
  "MANAGEMENT",
  "SHOP MANAGER",
  "STOCK CONTROL",
  "BUTCHERY",
  "LABOUR LAW",
  "FUMMIGATOR",
  "SALE REPRESENTATIVE",
  
];
