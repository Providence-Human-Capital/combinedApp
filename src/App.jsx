import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import {
  HashRouter,
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import HomeInit from "./HomeInit";
import Login from "./views/Auth/Login";
import Dashboard from "./views/Dashboard/Dashboard";

import Employees from "./views/Employees/Employees";
import Terminations from "./views/Terminations/Terminations";
import DataFormPrintPage from "./views/Hr/DataFormPrintPage";
import CvViewPage from "./views/Hr/CvViewPage";
import Reports from "./views/Reports/Reports";
import PrintBeneficiaryForm from "./views/Terminations/components/PrintBeneficiaryForm";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoutes from "./utils/PrivateRoutes";
import Companies from "./views/Companies/Companies";
import AddCompany from "./views/Companies/pages/AddCompany";
import EditCompany from "./views/Companies/pages/EditCompany";
import {
  getAllCompanies,
  getAllHealthFacilities,
  getAllPatients,
} from "./services/api";
import { companyActions } from "./store/company";

import { clinicActions } from "./store/clinic";
import { patientsActions } from "./store/patients";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import NewEmployeeDataForm from "./views/Hr/forms/NewEmployeeDataForm";
import PendingEmployees from "./views/Hr/PendingEmployees";
import EmployeeBeneficiaryForm from "./views/Hr/forms/EmployeeBeneficiaryForm";
import EmployeeTerminationForm from "./views/Hr/forms/EmployeeTerminationForm";
import AddStaffingEmployee from "./views/Hr/forms/AddStaffingEmployee";
import ApplicantsDetailedPage from "./views/Hr/pages/ApplicantsDetailedPage";
import StaffingSolutionsDeployed from "./views/Hr/pages/StaffingSolutionsDeployed";
import UploadEmployees from "./views/Hr/forms/UploadEmployees";
import EmployeeUpdate from "./views/Hr/forms/EmployeeUpdate";
import Attachments from "./views/Hr/pages/Attachments";
import TerminatedEmployees from "./views/Hr/pages/TerminatedEmployees";

import LeaveManagement from "./views/LeaveManagement/LeaveManagement";
import HrReports from "./views/HrReports/HrReports";
import TrainedEmployees from "./views/Hr/TrainedEmployees";
import ApplicationSuccess from "./views/Hr/success/ApplicationSuccess";
import DocumentUpload from "./views/Hr/components/DocumentUpload";
import AdminOps from "./views/Admin/AdminOps";
import StaffingEmployeeUpload from "./views/Staffing/StaffingEmployeeUpload";
import DeployedApplicants from "./views/Hr/pages/DeployedApplicants";
import UpdateEmpDetails from "./views/Hr/pages/Employee/UpdateEmpDetails";
import PHCEmployees from "./views/Hr/pages/PHCEmployees";
import StaffingUserDashboard from "./views/Hr/pages/UserManagement/views/StaffingUserDashboard";
import { useQueries } from 'react-query';


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <WrapperComponent />
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

const WrapperComponent = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const userRole = useSelector((state) => state.auth.user?.role);

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.zoom = 0.67;

    const fetchData = async () => {
      console.log("Fetching data");
      const companies = await getAllCompanies();
      dispatch(
        companyActions.setCompanies({
          companies: companies,
        })
      );
      const clinics = await getAllHealthFacilities();
      dispatch(
        clinicActions.setClinics({
          clinics: clinics,
        })
      );

      const patients = await getAllPatients();
      console.log(patients);
      dispatch(
        patientsActions.setPatients({
          patients: patients,
        })
      );
    };

    fetchData();
  }, []);


  const getDashboardRoute = () => {
    switch (userRole) {
      case "admin":
        return "/dashboard";
      case "staffing":
        return "/staffing/dashboard";
      default:
        return "/dashboard"; // Default route if no role matches
    }
  };

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={getDashboardRoute()} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/application/submmitted"
          element={<ApplicationSuccess />}
        />
        <Route path="/apply" element={<NewEmployeeDataForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/documents" element={<DocumentUpload />} />
        <Route path="*" element={<Navigate to={"/dashboard"} />} />

        <Route exact path="/" element={<HomeInit />}>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/staffing/dashboard" element={<StaffingUserDashboard />} />

            <Route exact path="/employees" element={<Employees />} />
            <Route exact path="/attachees" element={<Attachments />} />
            <Route exact path="/terminations" element={<Terminations />} />
            <Route
              exact
              path="/terminated/employees"
              element={<TerminatedEmployees />}
            />
            {/* <Route exact path="/data/forms" element={<DataFormPrintPage />} /> */}
            <Route path="/new/employees" element={<PendingEmployees />} />
            <Route path="/trained/applicants" element={<TrainedEmployees />} />
            <Route path="/hr/forms" element={<CvViewPage />}>
              <Route path="new/employee" element={<DataFormPrintPage />} />

              <Route path="beneficiary" element={<EmployeeBeneficiaryForm />} />
              <Route path="termination" element={<EmployeeTerminationForm />} />
            </Route>
            <Route path="/add/employee" element={<AddStaffingEmployee />} />
            <Route path="/employees/upload" element={<UploadEmployees />} />
            <Route
              path="/staffing/upload"
              element={<StaffingEmployeeUpload />}
            />
            <Route
              path="/applicant/detail/:applicantId"
              element={<ApplicantsDetailedPage />}
            />
            {/* <Route path="/employee/update/:employeeId" element={<UpdateEmployeeInformation />} /> */}
            <Route
              path="/employee/update/:employeeId"
              element={<EmployeeUpdate />}
            />
            <Route
              path="/staffing/employees"
              element={<StaffingSolutionsDeployed />}
            />

            <Route exact path="/reports" element={<Reports />} />

            <Route
              path="/print/beneficiary/document/:clientId"
              element={<PrintBeneficiaryForm />}
            />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/add" element={<AddCompany />} />
            <Route path="/company/edit/:companyId" element={<EditCompany />} />

            <Route path="/leave/management" element={<LeaveManagement />} />
            <Route path="/hr/reports" element={<HrReports />} />
            <Route path="/admin/ops" element={<AdminOps />} />

            <Route
              path="/deployed/applicants"
              element={<DeployedApplicants />}
            />

            <Route path="/phc/employees" element={<PHCEmployees />} />

            <Route
              path="/employee/info/:employeeId"
              element={<UpdateEmpDetails />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

export { WrapperComponent };
