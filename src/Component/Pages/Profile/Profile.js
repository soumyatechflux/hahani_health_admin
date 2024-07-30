import React, { useState } from 'react';
import './profile.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaPencilAlt, FaTimes } from 'react-icons/fa'; // Import FaTimes for the cross icon
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="container-fluid Profile-Container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 profile-target">
          <div className="profilepage-container text-center position-relative">
            <div className="icon-form mb-4 position-relative">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-icon" />
              ) : (
                <CgProfile size={150} style={{ color: 'gray' }} />
              )}

              <FaPencilAlt className='pencil-profile'
                size={20} 
                style={{ cursor: 'pointer', position: 'absolute', transform: 'translate(-50%, -50%)' }} 
                onClick={triggerFileInput}
              />
              <input 
                id="fileInput" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
            </div>

            <div className="center-profile">
              <div className="data-form">
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label-profile">Name</Form.Label>
                    <Form.Control className="profile-input" type="text" placeholder="Enter name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label-profile">Email</Form.Label>
                    <Form.Control className="profile-input" type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="label-profile">Password</Form.Label>
                    <Form.Control className="profile-input" type="password" placeholder="Enter password" />
                  </Form.Group>
                </Form>
              </div>
            </div>

            <div className="profile-but-align mt-4">
              <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                <span>Back</span>
              </Button>
              <Button className="proflie-butn">Save</Button>
            </div>

            <FaTimes
              className="close-profile"
              size={20}
              style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
              onClick={() => navigate('/dashboard')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
