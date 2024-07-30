import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
// import Navbar from './../Navbar/Navbar'
// import { FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

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

  const handleSignUp = (event) => {
    event.preventDefault();
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long and include at least one special character and one number.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    navigate('/');
  };

  return (
    <>
      {/* <Navbar/> */}
      <div className="container-fluid profile-container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 profile-target">
            <div className="profilepage-container text-center">
              <h2>Sign Up</h2>

              <div className="center-profile">
                {/* <div className="addbtn-form mb-3">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="label-profile">Add Profile</Form.Label>
                    <Form.Control className="profile-input" type="file" onChange={handleFileChange} />
                  </Form.Group>
                </div> */}
                

                <div className="data-form">
                  <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label className="label-profile">Name</Form.Label>
                      <Form.Control
                        className="profile-input"
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label className="label-profile">Email</Form.Label>
                      <Form.Control
                        className="profile-input"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                      <Form.Label className="label-profile">Password</Form.Label>
                      <Form.Control
                        className="profile-input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                      <Form.Label className="label-profile">Confirm Password</Form.Label>
                      <Form.Control
                        className="profile-input"
                        type="password"
                        placeholder="Enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="profile-but d-flex justify-content-around mt-4">
                      <button type="submit" className="signup-btn">Sign UP</button>
                    </div>
                  </Form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
