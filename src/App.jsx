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
import Visitors from "./views/Visitor/Visitors";
import Orders from "./views/Orders/Orders";
import Employees from "./views/Employees/Employees";
import Terminations from "./views/Terminations/Terminations";
import DataFormPrintPage from "./views/Hr/DataFormPrintPage";
import CvViewPage from "./views/Hr/CvViewPage";
import Reports from "./views/Reports/Reports";
import PrintBeneficiaryForm from "./views/Terminations/components/PrintBeneficiaryForm";
import { useDispatch, useSelector } from "react-redux";
import ClinicStats from "./views/Health/ClinicStats";
import AddStatsForm from "./views/Health/Crud/AddStatsForm";
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
import Clinics from "./views/Clinics/Clinics";
import AddClinic from "./views/Clinics/pages/AddClinic";
import EditClinic from "./views/Clinics/pages/EditClinic";
import { clinicActions } from "./store/clinic";
import { patientsActions } from "./store/patients";
import { QueryClient, QueryClientProvider } from "react-query";
import HealthDashboard from "./views/Dashboard/HealthDashboard";
import { ReactQueryDevtools } from "react-query/devtools";
import HealthReports from "./views/Health/Crud/HealthReports";
import PatientDetailedPage from "./views/Health/PatientDetailedPage";
import MedicalsCertificates from "./views/Health/Medicals/MedicalsCertificates";
import NewEmployeeDataForm from "./views/Hr/forms/NewEmployeeDataForm";
import PendingEmployees from "./views/Hr/PendingEmployees";
import EmployeeBeneficiaryForm from "./views/Hr/forms/EmployeeBeneficiaryForm";
import EmployeeTerminationForm from "./views/Hr/forms/EmployeeTerminationForm";
import HealthStaff from "./views/HealthStaff/HealthStaff";
import AddStaffingEmployee from "./views/Hr/forms/AddStaffingEmployee";
import ApplicantsDetailedPage from "./views/Hr/pages/ApplicantsDetailedPage";
import StaffingSolutionsDeployed from "./views/Hr/pages/StaffingSolutionsDeployed";
import UploadEmployees from "./views/Hr/forms/UploadEmployees";
import UpdateEmployeeInformation from "./views/Hr/forms/UpdateEmployeeInformation";
import EmployeeUpdate from "./views/Hr/forms/EmployeeUpdate";
import Attachments from "./views/Hr/pages/Attachments";
import TerminatedEmployees from "./views/Hr/pages/TerminatedEmployees";
import Drugs from "./views/Drugs/Drugs";
import OrderForm from "./views/Drugs/forms/OrderForm";
import LeaveManagement from "./views/LeaveManagement/LeaveManagement";
import HrReports from "./views/HrReports/HrReports";
import TrainedEmployees from "./views/Hr/TrainedEmployees";
import ApplicationSuccess from "./views/Hr/success/ApplicationSuccess";
import DocumentUpload from "./views/Hr/components/DocumentUpload";

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

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={"/dashboard"} />
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
        <Route exact path="/" element={<HomeInit />}>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route
              exact
              path="/health/dashboard"
              element={<HealthDashboard />}
            />
            <Route exact path="/visitors" element={<Visitors />} />
            <Route exact path="/orders" element={<Orders />} />

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
            <Route exact path="/providence/drugs" element={<Drugs />} />
            <Route exact path="/order/drugs" element={<OrderForm />} />
            <Route exact path="/clinic" element={<AddStatsForm />} />
            {/* <Route exact path="/add/stats/" element={<AddStatsForm />} /> */}
            <Route
              path="/print/beneficiary/document/:clientId"
              element={<PrintBeneficiaryForm />}
            />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/add" element={<AddCompany />} />
            <Route path="/company/edit/:companyId" element={<EditCompany />} />

            <Route path="/clinics" element={<Clinics />} />
            <Route path="/clinic/add" element={<AddClinic />} />
            <Route path="/clinic/edit/:clinicId" element={<EditClinic />} />
            <Route path="/health/reports" element={<HealthReports />} />
            <Route path="/health/staff" element={<HealthStaff />} />
            <Route path="/leave/management" element={<LeaveManagement />} />
            <Route path="/hr/reports" element={<HrReports />} />

            <Route
              path="/patient/profile/:patientId"
              element={<PatientDetailedPage />}
            />
            <Route
              path="/medicals/certificates"
              element={<MedicalsCertificates />}
            />

            <Route path="*" element={<Navigate to={"/dashboard"} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

export { WrapperComponent };
