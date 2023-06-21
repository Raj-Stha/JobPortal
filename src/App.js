import "./App.css";
import { Routes, Route } from "react-router";
import RootLayout from "./components/RootLayout";
import ClientHomepage from "./pages/Client/ClientHomepage";
import { EmployeeRegister } from "./pages/EmployeeRegister";
import ClientRegister from "./pages/ClientRegister";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCheck from "./protectedRoute/AdminCheck";
import CheckToken from "./protectedRoute/CheckToken";
import AddJob from "./pages/Admin/AddJob";
import UpdateJob from "./pages/Admin/UpdateJob";
import SingleCategory from "./pages/Client/SingleCategory";
import JobDetail from "./pages/Client/JobDetail";
import AppliedJob from "./pages/Client/AppliedJob";
import Search from "./pages/Client/Search";
import ViewCandidate from "./pages/Admin/ViewCandidate";
import { RedirectHomepage } from "./protectedRoute/RedirectHomepage";
import { PageNotFound } from "./pages/PageNotFound";
import AllCategories from "./pages/Client/AllCategories";
import AllCompany from "./pages/Client/AllCompanies";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route element={<CheckToken />}>
            <Route path="/" element={<ClientHomepage />} />
          </Route>

          <Route path="/categories" element={<AllCategories />} />
          <Route path="/companies" element={<AllCompany />} />
          <Route path="/category/:categoryName" element={<SingleCategory />} />
          <Route path="/job/:id" element={<JobDetail />} />

          <Route element={<RedirectHomepage />}>
            <Route path="/applied-job" element={<AppliedJob />} />
          </Route>

          <Route path="/search/:jobName" element={<Search />} />

          <Route element={<CheckToken />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register-employee" element={<EmployeeRegister />} />
            <Route path="/register-jobseeker" element={<ClientRegister />} />
          </Route>

          <Route element={<AdminCheck />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-job" element={<AddJob />} />
            <Route path="/admin/update/:id" element={<UpdateJob />} />
            <Route path="/admin/view/:id" element={<ViewCandidate />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={2000} position="top-right" />
    </>
  );
}

export default App;
