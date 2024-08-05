import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { GetUserAPIById, DeleteUserAPI } from "../../../../api.js"; // Adjust import path if necessary

const DeleteUserModal = ({ show, handleCancel, handleConfirm, userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeletedStatus, setIsDeletedStatus] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        setLoading(true);
        try {
          const response = await GetUserAPIById({ id: userId });
          setUserData(response.data); // Adjust based on the actual API response structure
          
          // Update isDeletedStatus based on user's current is_deleted status
          setIsDeletedStatus( setUserData.is_deleted === "0" ? "1" : "0");
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleDelete = async () => {
    if (userId && isDeletedStatus !== null) {
      try {
        await DeleteUserAPI({ id: userId, is_deleted: isDeletedStatus });
        handleConfirm(); // Call handleConfirm to close the modal and refresh the user list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userData ? (
          <p>Are you sure you want to delete {userData.name}?</p>
        ) : (
          <p>No user data available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          No
        </Button>
        <Button className="all-buttons" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
