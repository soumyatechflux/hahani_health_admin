import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { GetUserAPIById, IsActiveUserAPI } from "../../../../api.js"; // Adjust import path if necessary

const ConfirmUserStatusModal = ({ show, handleCancel, handleConfirm, userId , handleGetUser }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        setLoading(true);
        try {
          const response = await GetUserAPIById({ id: userId });
          setUserData(response.data); // Adjust based on the actual API response structure
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleStatusChange = async () => {
    try {
      const response = await IsActiveUserAPI({ id: userId });
      if (response.status === 200) {
        handleConfirm();
        handleGetUser();
      }
    } catch (err) {
      console.error("Failed to change user status:", err.message);
    }
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change User Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to change the user status?</p>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          No
        </Button>
        <Button className="all-buttons" onClick={handleStatusChange}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmUserStatusModal;
