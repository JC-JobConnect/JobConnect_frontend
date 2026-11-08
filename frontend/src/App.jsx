import { Routes, Route, useLocation } from "react-router-dom";

// COMMON COMPONENTS
import Footer from "./Components/Common/Footer";
import Navbar from "./Components/Common/Navbar";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import ScrollToTop from "./Components/Common/ScrollToTop";

// HOME
import Home from "./Pages/Home";

// JOB PAGES
import ApplyJob from "./Pages/Job/Apply_Jobs";
import JobDetails from "./Pages/Job/Job_Details";
import Jobs from "./Pages/Job/Jobs";

// COMPANY PAGES
import Companies from "./Pages/Company/Companies";
import TopCompanyView from "./Pages/Company/TopCompanyView";

// PROFILE PAGES
import My_Appications from "./Pages/Profile/My_Appications";
import UserProfile from "./Pages/Profile/UserProfile";

// AUTHENTICATION PAGES
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

// ADMIN PAGES
import AdminCategory from "./Pages/admin/AdminCatagory";
import AdminCompany from "./Pages/admin/AdminCompany";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminJobs from "./Pages/admin/AdminJobs";

// INFORMATIONAL PAGES
import About from "./Pages/About";
import Contact from "./Pages/Contact";

// LEGAL PAGES
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";

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
