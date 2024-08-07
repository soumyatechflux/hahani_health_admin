import React, { useState } from "react";
import { Modal, Form, Alert } from "react-bootstrap";
import "./ResetPassword.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgotPasswordEnterNewPasswordAPI } from "../../../../../api";

const ResetPassword = ({ show, handleClose, onPasswordReset, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Password validation regex: At least one digit, one special character, and minimum length of 6
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    
    // Validate password
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters long and include at least one number and one special character.");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        email: email,
        password: password,
        confirmpass: confirmPassword,
      };

      const response = await ForgotPasswordEnterNewPasswordAPI(data);
      if (response?.data && response?.data?.response === true) {
        toast.success(response?.data?.success_msg);
        setError(""); // Clear any previous errors
        onPasswordReset(password);
      } else {
        setError(
          response?.data?.error_msg ||
            "Failed to update password. Please try again."
        );
        toast.error(
          response?.data?.error_msg ||
            "Failed to update password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("An error occurred while updating password. Please try again.");
      toast.error(
        "An error occurred while updating password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="btn-div">
            <button
              type="submit"
              className="reset-password"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Reset Password"}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPassword;
