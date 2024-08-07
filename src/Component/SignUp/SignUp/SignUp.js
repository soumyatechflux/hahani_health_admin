import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./SignUp.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignupAPI } from "../../../api";

const SignUp = ({ onClose }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] =useState("");
  const [location, setLocation] =useState("");

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !location || !test) {
      setError("All fields are required.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one special character and one number."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    // handleClose();

    // navigate('/signup_verification', { state: { email: email } });


    setIsLoading(true);

    try {
      const data = {
        name:firstName + " " + lastName ,
        email: email,
        password: password,
        venue:location,
        test_type:test,
      };

      const response = await SignupAPI(data);
      // console.log(response?.data?.response);
      // return;
      if (response?.data?.response === true) {
        setError("");
        // handleClose();
        toast.success("OTP sended to your mail.");
        navigate('/signup_verification', { state: { email: email } });

      } else {
        if (response?.data?.error_msg) {
          toast.error(response?.data?.error_msg);
        } else {
          toast.error("An error occurred during login. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }


  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignUp}>

          <Form.Group className="mb-3" controlId="formFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>



            <Form.Group className="mb-3" controlId="formLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group><Form.Group className="mb-3" controlId="formVenue">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                placeholder="Venue"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formtest">
              <Form.Label>Test Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Test Type"
                value={test}
                onChange={(e) => setTest(e.target.value)}
                required
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <div className="profile-but d-flex justify-content-around mt-4">
              <button className="signup-btn" type="submit">
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;