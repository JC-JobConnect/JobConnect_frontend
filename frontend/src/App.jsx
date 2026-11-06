import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import My_Appications from "./Pages/My_Appications";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Companies from "./Pages/Companies";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import UserProfile from "./Pages/UserProfile";
import Register from "./Pages/Register";
import JobDetails from "./Pages/Job_DetailsPage";
import ApplyJob from "./Pages/Apply_Jobs";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminJobs from "./Pages/admin/AdminJobs";
import AdminCategory from "./Pages/admin/AdminCatagory";
import AdminCompany from "./Pages/admin/AdminCompany";
import ProtectedRoute from "./Components/ProtectedRoute";
import TopCompanyView from "./Pages/TopCompanyView";

const App = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    ["/login", "/register"].includes(location.pathname);

  return (
    <div>
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

        {/* Admin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/categories" element={<AdminCategory />} />
          <Route path="/admin/companies" element={<AdminCompany />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}

      <ScrollToTop />
    </div>
  );
};

export default App;
