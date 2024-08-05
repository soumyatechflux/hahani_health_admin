import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect,useState} from 'react';
import './App.css';
import ScrollToTop from "./ScrollToTop";

import InternetChecker from "./Component/Internet Checker/Internet Checker.js";
import { BrowserRouter , Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Component/Pages/Dashboard/Dashboard';
import User from './Component/Pages/User/User';
import Bill from './Component/Pages/Bill/Bill';
import Vender from './Component/Pages/Vender/Vender';
import Profile from './Component/Pages/Profile/Profile';
import SidebarComp from './Component/SidebarComp/SidebarComp';
import Navbar from './Component/Navbar/Navbar';
import Login from './Component/Login_verification/login/Login';
import Verification from './Component/verification/Verification';

import ForgotPasswordFlow from './Component/Login_verification/login/ForgotPassword/ForgotPassword';
// import PostsTable from './Component/PostTable/PostTable';
// import Verification from './Component/Login_verification/verification/Verification';

// const MainLayout = ({ children }) => {
//   const location = useLocation();
//   const { pathname } = location;

//   // Define the paths where Navbar and Sidebar should not be displayed
//   const hideNavAndSidebar = ['/', '/signup'];
//   const hideSidebar = ['/profile', '/signup'];

//   return (
//     <>
//       {/* Render Navbar only if the current path is not in hideNavAndSidebar */}
//       {!hideNavAndSidebar.includes(pathname) && <Navbar />}
//       {/* Render SidebarComp only if the current path is not in hideNavAndSidebar and not '/profile' */}
//       {!hideNavAndSidebar.includes(pathname) && !hideSidebar.includes(pathname) && <SidebarComp />}
//       {children}
//     </>
//   );
// }

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isUserLoggedIn");
    const encryptedToken = localStorage.getItem("encryptedTokenForAdminOfHanaiHealth");

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

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
     <BrowserRouter>
        
        <ScrollToTop />

        {isOffline && <InternetChecker />}

    {/* <Router> */}
      <div className="App">
      
        {/* <MainLayout/> */}
          <Routes>
            <Route path='/' element={<Login/>}/>
            {/* <Route path='/verification' element={<Verification/>}/>  */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vender" element={<Vender />} />
            <Route path="/user" element={<User />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/verification" element={<Verification/>}/>
       
            <Route path="/forgot-password" element={<ForgotPasswordFlow/>} />
          
          </Routes>
        {/* </MainLayout> */}
      </div>
    {/* </Router> */}
    </BrowserRouter>
  );
}

export default App;
