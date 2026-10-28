import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import My_Appications from './Pages/My_Appications'
import Home from './Pages/Home'
import Jobs from './Pages/Jobs'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import UserProfile from './Pages/UserProfile'
import Register from './Pages/Register'

const App = () => {
  const location = useLocation();

  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/my-applications" element={<My_Appications />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!isAuthPage && <Footer />}
      
      <ScrollToTop />
    </div>
  );
};

export default App;
