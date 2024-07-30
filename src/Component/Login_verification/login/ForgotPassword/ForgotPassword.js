import React, { useState } from 'react';
import EnterEmail from './EnterEmail/EnterEmail';
import EnterOtp from './EnterOTP/EnterOtp';
import ResetPassword from './ResetPassword/ResetPassword';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordFlow = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const handleEmailSubmit = (email) => {
    setEmail(email);
    setStep(2);
  };

  const handleOTPSubmit = (otp) => {
    setOtpVerified(true);
    setStep(3);
  };

  const handlePasswordReset = (password) => {
    alert('Password reset successful. Please login with your new password.');
    navigate('/');
    setStep(1);
    setShowModal(false);
    onClose(); // Close the modal when done
  };

  const handleClose = () => {
    setShowModal(false);
    onClose(); // Ensure modal closes
  };

  return (
    <div>
      {step === 1 && (
        <EnterEmail show={showModal} handleClose={handleClose} onEmailSubmit={handleEmailSubmit} />
      )}
      {step === 2 && (
        <EnterOtp show={showModal} handleClose={handleClose} onOTPSubmit={handleOTPSubmit} />
      )}
      {step === 3 && (
        <ResetPassword show={showModal} handleClose={handleClose} onPasswordReset={handlePasswordReset} />
      )}
    </div>
  );
};

export default ForgotPasswordFlow;
