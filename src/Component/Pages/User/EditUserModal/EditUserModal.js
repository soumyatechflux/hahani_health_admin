import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { EditUserAPI, GetUserAPIById } from './../../../../api.js'; // Adjust the import path

const EditUserModal = ({ show, handleClose, userId, editData, setEditData, onUserUpdated, handleGetUser }) => {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (show && userId) {
      const fetchUserData = async () => {
        setError(null);
        try {
          const response = await GetUserAPIById({ id: userId });
          console.log("user info", response?.data);
          const user = response?.data?.data?.user;
          if (user) {
            setEditData({
              id: user.id,
              name: user.name,
              email: user.email,
              password: user.password,
              createdAt: user.created_at, // Ensure this is in YYYY-MM-DD format
            });
          } else {
            setError('User not found');
          }
        } catch (error) {
          setError('An error occurred while fetching the user data');
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [show, userId, setEditData]);

  const handleEditUser = async () => {
    const { id, name, email, password, createdAt } = editData;

    if (!id || !name || !email || !password || !createdAt) {
      setError('All fields are required');
      return;
    }
    handleClose();
    setError(null);

    try {
      const response = await EditUserAPI(editData);
      if (response.response) {
        onUserUpdated(response?.data);
        handleGetUser();
      } else {
        setError(response?.error_msg);
      }
    } catch (error) {
      setError('An error occurred while updating the user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* <Form.Group className="mb-3" controlId="formSrNoEdit">
            <Form.Label>Sr No</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Sr No"
              value={editData.id || ''}
              onChange={(e) => setEditData({ ...editData, id: e.target.value })}
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="formNameEdit">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={editData.name || ''}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmailEdit">
            <Form.Label>User Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter User Email"
              value={editData.email || ''}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPasswordEdit">
            <Form.Label>User Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter User Password"
              value={editData.password || ''}
              onChange={(e) => setEditData({ ...editData, password: e.target.value })}
            />
          </Form.Group>


          {/* <Form.Group className="mb-3" controlId="formCreatedAtEdit">
            <Form.Label>Created At</Form.Label>
            <Form.Control
              type="date"
              value={editData.createdAt?.split('T')[0] || ''} // Ensure the format is YYYY-MM-DD
              onChange={(e) => setEditData({ ...editData, createdAt: e.target.value })}
            />
          </Form.Group> */}


        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="all-buttons" onClick={handleEditUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
