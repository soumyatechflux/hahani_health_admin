import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EnterOTP.css';
const EnterOtp = ({ show, handleClose, onOTPSubmit }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onOTPSubmit(otp);
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
                    <div className='btn-div'>
                        <button  type="submit" className='verify-otp'>
                            Verify OTP
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EnterOtp;
