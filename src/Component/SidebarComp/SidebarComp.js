import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import './sidebarComp.css';

const SidebarComp = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();
  return (
    <div>
      <div className='sidebar-content'>
        <div className='sidebar-container'>
          <Link to="/dashboard" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <MdDashboardCustomize />
              {!isMobile && <span>Dashboard</span>}
            </div>
          </Link>

          <Link to="/vendor" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/vendor' ? 'active' : ''}`}>
              <IoIosPeople />
              <h5 className='h5-sidebar'>Vendor</h5>
            </div>
          </Link>

          <Link to="/user" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/user' ? 'active' : ''}`}>
              <FaUserCog />
              <h5 className='h5-sidebar'>Users</h5>
            </div>
          </Link>

          <Link to="/bill" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/bill' ? 'active' : ''}`}>
              <IoIosPaper />
              <h5 className='h5-sidebar'>Bill</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SidebarComp;
