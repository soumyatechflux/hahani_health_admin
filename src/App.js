import "bootstrap/dist/css/bootstrap.min.css";
import React,{ useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Component/Pages/Dashboard/Dashboard";
// import User from './Component/Pages/Lab_Report/Lab_Report';
import Bill from "./Component/Pages/Bill/Bill";
import Profile from "./Component/Pages/Profile/Profile";
import SidebarComp from "./Component/SidebarComp/SidebarComp";
import Navbar from "./Component/Navbar/Navbar";
import Login from "./Component/Login_verification/login/Login";
import Verification from "./Component/Login_verification/verification/Verification";
import Lab_Report from "./Component/Pages/Lab_Report/Lab_Report";
import SignUp from "./Component/SignUp/SignUp/SignUp";
import ForgotPasswordFlow from "./Component/Login_verification/login/ForgotPassword/ForgotPassword";
import Signup_Verification from "./Component/Signup otp verification/Verification";


const MainLayout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  // Define the paths where Navbar and Sidebar should not be displayed
  const hideNavAndSidebar = ["/", "/verification", "/signup","/signup_verification"];
  const hideSidebar = ["/profile", "/signup" ];


  return (
    <>
      {/* Render Navbar only if the current path is not in hideNavAndSidebar */}
      {!hideNavAndSidebar.includes(pathname) && <Navbar />}
      {/* Render SidebarComp only if the current path is not in hideNavAndSidebar and not '/profile' */}
      {!hideNavAndSidebar.includes(pathname) &&
        !hideSidebar.includes(pathname) && <SidebarComp />}
      {children}
    </>
  );
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isVendorLoggedIn");
    const encryptedToken = localStorage.getItem("encryptedTokenForVendorOfHanaiHealth");

    if (isLoggedIn === "true" && encryptedToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };





  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);


  return (
    <Router>
      <div className="App">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Lab_Report" element={<Lab_Report />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup_verification" element={<Signup_Verification />} />
            <Route path="/forgot_password" element={<ForgotPasswordFlow />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
