import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EnterEmail.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ForgotPasswordEnterEmailAPI} from "./../../../../../api";

const EnterEmail = ({ show, handleClose ,onEmailSubmit}) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // onEmailSubmit(email);


        setIsLoading(true);

        try {
            const response = await ForgotPasswordEnterEmailAPI({ email });
            if (response?.data && response?.data?.response === true) {
                toast.success("OTP sent to your email.");
                // handleClose();
                onEmailSubmit(email);
            } else {
                toast.error(response?.data?.error_msg || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("An error occurred while sending OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }


    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className='btn-div'>
                        <Button type="submit" className='send-otp' disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send OTP'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EnterEmail;
