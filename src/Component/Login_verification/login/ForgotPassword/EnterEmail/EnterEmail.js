import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EnterEmail.css'
const EnterEmail = ({ show, handleClose, onEmailSubmit }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onEmailSubmit(email);
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
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
                        <button  type="submit" className='send-otp'>
                            Send OTP
                        </button>
                    </div>
                   
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EnterEmail;
