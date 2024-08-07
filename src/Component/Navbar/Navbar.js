import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdContact } from "react-icons/io";
import { Modal, Button } from 'react-bootstrap';
import hanai_logo from './Modern Initial Font Logo.png';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import './navbar.css';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const Menus = ["Profile", "Logout"];

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

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setOpen(false); // Close dropdown when modal opens
  };


  //when we want to click on logout and open the module and we click on yes button then it render on login page
  const handleLogoutConfirm = () => {
    localStorage.clear()
    setShowLogoutModal(false);
    console.log('Vender logged out');
    navigate("/"); 
  };

  return (
    <div>
        <div className='container-navbar'>
      <nav className='col nav-sidebar bg-light'>
        <div className='hanai-img'>
          <img src={hanai_logo} alt="Hanai Logo" />
        </div>

        {/* Dropdown */}
        <div className='relative ' onClick={() => setOpen(!open)}>
          <IoMdContact /><MdOutlineKeyboardArrowDown  style={{width:"25px"}} />
        </div>
        
      </nav>

      {open &&
        <div ref={dropdownRef} className='drop-down bg-white p-2 w-15 shadow-lg relative top-10'>
          <ul className='dropalign_nav'>
            {Menus.map((menu) => (
              <li
                onClick={() => {
                  if (menu === "Logout") {
                    handleLogoutClick();
                  } else if (menu === "Profile") {
                    navigate("/profile");
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
      }

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
    </div>
  )
}

export default Navbar