import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
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
        <Route path="/login" element={<Login />} />
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
            <Route exact path="/terminations" element={<Terminations />} />
            <Route exact path="/data/forms" element={<DataFormPrintPage />} />
            <Route exact path="/cv/view" element={<CvViewPage />} />
            <Route exact path="/reports" element={<Reports />} />
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
            <Route path="/patient/profile/:patientId" element={<PatientDetailedPage />} />
            <Route path="/medicals/certificates" element={<MedicalsCertificates />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

export { WrapperComponent };
