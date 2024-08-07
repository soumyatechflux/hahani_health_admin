import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { EditVenderAPI, GetVenderAPIById } from './../../../../api.js'; // Adjust the import path

const EditVendorModal = ({handleGetVendors, show, handleClose, vendorId, editData, setEditData, onVendorUpdated }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    if (show && vendorId) {
      const fetchVendorData = async () => {
        // setIsLoading(true);
        setError(null);
        try {
          const response = await GetVenderAPIById({ id: vendorId });
          const vendor = response?.data?.data?.vendor;
          if (vendor) {
            setEditData({
              id: vendor.id,
              name: vendor.name,
              email: vendor.email,
              password: vendor.password,
              type: vendor.type,
              venue: vendor.venue,
              createdAt: vendor.created_at,
            });
          } else {
            setError('Vendor not found');
          }
        } catch (error) {
          setError('An error occurred while fetching the vendor data');
        } finally {
          setIsLoading(false);
        }
      };

      fetchVendorData();
    }
  }, [show, vendorId, setEditData]);

  const handleEditVendor = async () => {
    const { id, name, email, password, type, venue, createdAt } = editData;

    if (!id || !name || !email || !password || !type || !venue || !createdAt) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(editData.email)) {
      setError("Invalid email format");
      return;
    }

    handleClose();
    setError(null);
    try {
      const response = await EditVenderAPI(editData);
      if (response?.response) {
        onVendorUpdated(response?.data);
        handleGetVendors();
     
      } else {
        setError(response?.error_msg);
      }
    } catch (error) {
      setError('An error occurred while updating the vendor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
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
              <Form.Label>Vendor Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Vendor Email"
                value={editData.email || ''}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPasswordEdit">
              <Form.Label>Vendor Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Vendor Password"
                value={editData.password || ''}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTypeEdit">
              <Form.Label>Test Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Test Type"
                value={editData.type || ''}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocationEdit">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={editData.venue || ''}
                onChange={(e) => setEditData({ ...editData, venue: e.target.value })}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formCreatedAtEdit">
              <Form.Label>Created At</Form.Label>
              <Form.Control
                type="date"
                value={editData.createdAt?.substring(0, 10) || ''} // Format date to YYYY-MM-DD
                onChange={(e) => setEditData({ ...editData, createdAt: e.target.value })}
              />
            </Form.Group> */}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="all-buttons" onClick={handleEditVendor} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVendorModal;
