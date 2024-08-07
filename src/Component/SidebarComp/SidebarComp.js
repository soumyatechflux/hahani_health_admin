import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import './sidebarComp.css';

const SidebarComp = () => {
    const location = useLocation();
  return (
    <div>
         <div className='sidebar-content'>
        <div className='sidebar-container'>
          <Link to="/dashboard" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <MdDashboardCustomize />
              <h5 className='h5-sidebar'>Dashboard</h5>
            </div>
          </Link>

          
          <Link to="/Lab_Report" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/Lab_Report' ? 'active' : ''}`}>
              <FaUserCog />
              <h5 className='h5-sidebar'>Lab Report</h5>
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
  )
}

export default SidebarComp