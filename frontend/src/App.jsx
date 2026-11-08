import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import ScrollToTop from "./Components/Common/ScrollToTop";
import ProtectedRoute from "./Components/Common/ProtectedRoute";

import My_Appications from "./Pages/Profile/My_Appications";
import Home from "./Pages/Home";
import Jobs from "./Pages/Job/Jobs";
import Companies from "./Pages/Company/Companies";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Auth/Login";
import UserProfile from "./Pages/Profile/UserProfile";
import Register from "./Pages/Auth/Register";
import JobDetails from "./Pages/Job/Job_Details";
import ApplyJob from "./Pages/Job/Apply_Jobs";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminJobs from "./Pages/admin/AdminJobs";
import AdminCategory from "./Pages/admin/AdminCatagory";
import AdminCompany from "./Pages/admin/AdminCompany";

import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TopCompanyView from "./Pages/Company/TopCompanyView";

const App = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    ["/login", "/register"].includes(location.pathname);

  return (
    <div>
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:companyId/jobs" element={<TopCompanyView />} />
        <Route path="/my-applications" element={<My_Appications />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job_details" element={<JobDetails />} />
        <Route path="/job_details/:id" element={<JobDetails />} />
        <Route path="/apply_jobs" element={<ApplyJob />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Admin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/categories" element={<AdminCategory />} />
          <Route path="/admin/companies" element={<AdminCompany />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}

     
    </div>
  );
};

export default App;
