import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { AddUserAPI } from '../../../../api.js'; // Import the API function

const AddUserModal = ({ show, handleClose, newData, setNewData, handleSave, handleGetUser }) => {
  const [getUser, setGetUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await AddUserAPI({
        name: newData.name,
        email: newData.email,
        password: newData.password,
        createdAt: newData.createdAt,
      });

      if (response?.data?.response) {
        const newId = response?.data?.data?.id; // Assuming the API returns the new ID in the response
        const newUser = { id: newId, name: newData.name,email:newData.email,password:newData.password, created_at: newData.createdAt };
        setGetUser((prevUsers) => [...prevUsers, newUser]);
        setNewData({name: "", email: "", password: "", createdAt: "" });
        handleClose();
        handleGetUser()
      } else {
        setError("Error adding user: " + response?.data?.error_msg);
      }
    } catch (error) {
      setError("Error adding user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNameCreate">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={newData.name}
              onChange={(e) => setNewData({ ...newData, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLocationCreate">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter User Email"
              value={newData.email}
              onChange={(e) => setNewData({ ...newData, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLocationCreate">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password For User"
              value={newData.password}
              onChange={(e) => setNewData({ ...newData, password: e.target.value })}
              required
            />
          </Form.Group>


          {/* <Form.Group className="mb-3" controlId="formCreatedAtCreate">
            <Form.Label>Created At</Form.Label>
            <Form.Control
              type="date"
              value={newData.createdAt}
              onChange={(e) => setNewData({ ...newData, createdAt: e.target.value })}
              required
            />
          </Form.Group> */}


          {error && <p className="text-danger">{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="all-buttons" onClick={handleAddUser} disabled={loading}>
          {loading ? 'Adding...' : 'Add User'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
