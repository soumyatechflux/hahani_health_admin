import './sidebar.css';
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import hanai_logo from './../images/Modern Initial Font Logo.png';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({onLogout}) => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const Menus = ["Logout"];

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout click
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setOpen(false); // Close dropdown when modal opens
  };

  // Confirm logout and navigate to login page
  const handleLogoutConfirm = () => {

    setShowLogoutModal(false);


    localStorage.clear();
    
    onLogout();
    if (onLogout) {
      navigate("/");
    }
    navigate("/");

    toast.success("Logged out successfully!");

    
  };

  return (
    <div className='container-navbar'>
      <nav className='col nav-sidebar bg-light'>
        <div className='hanai-img'>
          <img src={hanai_logo} alt="Hanai Logo" />
        </div>

        {/* Dropdown */}
        <div className='relative' onClick={() => setOpen(!open)}>
          <IoMdContact />
          <MdOutlineKeyboardArrowDown style={{ width: "25px" }} />
        </div>
      </nav>

      {open && (
        <div ref={dropdownRef} className='drop-down bg-white p-2 w-15 shadow-lg relative top-10'>
          <ul className='dropalign_nav'>
            {Menus.map((menu) => (
              <li
                onClick={() => {
                  if (menu === "Logout") {
                    handleLogoutClick();
                  }
                  setOpen(false); // Close the dropdown in all cases
                }}
                className='p-2 text-sm cursor-pointer rounded hover:bg-red-100'
                key={menu}
              >
                {menu}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar */}
      <div className='sidebar-content'>
        <div className='sidebar-container'>
          <Link to="/dashboard" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <MdDashboardCustomize />
              <h5>Dashboard</h5>
            </div>
          </Link>

          <Link to="/vendor" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/vendor' ? 'active' : ''}`}>
              <IoIosPeople />
              <h5>Vendor</h5>
            </div>
          </Link>

          <Link to="/user" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/user' ? 'active' : ''}`}>
              <FaUserCog />
              <h5>Users</h5>
            </div>
          </Link>

          <Link to="/bill" className="no-underline">
            <div className={`nav-option option1 ${location.pathname === '/bill' ? 'active' : ''}`}>
              <IoIosPaper />
              <h5>Bill</h5>
            </div>
          </Link>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            No
          </Button>
          <Button className='btn-LogoutProfile' onClick={handleLogoutConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sidebar;
