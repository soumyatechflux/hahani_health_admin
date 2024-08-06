import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AddVenderAPI } from "./../../../../api.js";

const AddVendorModal = ({ handleGetVendors,show, handleClose, newData, setNewData, handleSave }) => {
  const [getVender, setGetVender] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddVender = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await AddVenderAPI({
        name: newData.name,
        email: newData.email,
        password: newData.password,
        type: newData.type,
        venue: newData.location,
        createdAt: newData.createdAt,
      });

      if (response?.data?.response) {
        const newId = response?.data?.data?.id; // Assuming the API returns the new ID in the response
        const newVendor = { id: newId, name: newData.name, venue: newData.location, created_at: newData.createdAt };
        setGetVender((prevVenders) => [...prevVenders, newVendor]);
        setNewData({name: "", email: "", password: "", type: "", location: "", createdAt: "" });
        handleClose();
        handleGetVendors();
      } else {
        setError("Error adding vendor: " + response?.data?.error_msg);
      }
    } catch (error) {
      setError("Error adding vendor: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group className="mb-3" controlId="formNameCreate">
            <Form.Label>Vendor Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Vendor Name"
              value={newData.name}
              onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmailCreate">
            <Form.Label>Vendor Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Vendor Email"
              value={newData.email}
              onChange={(e) => setNewData({ ...newData, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPasswordCreate">
            <Form.Label>Vendor Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Vendor Password"
              value={newData.password}
              onChange={(e) => setNewData({ ...newData, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLocationCreate">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Location"
              value={newData.location}
              onChange={(e) => setNewData({ ...newData, location: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTypeCreate">
            <Form.Label>Test Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Test Type"
              value={newData.type}
              onChange={(e) => setNewData({ ...newData, type: e.target.value })}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formCreatedAtCreate">
            <Form.Label>Created At</Form.Label>
            <Form.Control
              type="date"
              value={newData.createdAt}
              onChange={(e) => setNewData({ ...newData, createdAt: e.target.value })}
            />
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="all-buttons" onClick={handleAddVender} disabled={loading}>
          {loading ? 'Adding...' : 'Add Vendor'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVendorModal;
