import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./EnterOTP.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgotPasswordEnterOtpAPI } from "./../../../../../api";

const EnterOtp = ({ show, handleClose, onOTPSubmit, email }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // onOTPSubmit(otp);

    setIsLoading(true);

    try {
        const data = {
            email: email,
            otp: otp
        };

        const response = await ForgotPasswordEnterOtpAPI(data);
        if (response?.data && response?.data?.response === true) {
        toast.success(  response?.data?.success_msg);
        // handleClose();
        onOTPSubmit(otp);
      } else {
        toast.error(
          response?.data?.error_msg || "Failed to varify OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("Error varifying OTP:", error);
      toast.error("An error occurred while varifying OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }


  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formOtp">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </Form.Group>
          <div className="btn-div">
            <button type="submit" className="verify-otp" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EnterOtp;
