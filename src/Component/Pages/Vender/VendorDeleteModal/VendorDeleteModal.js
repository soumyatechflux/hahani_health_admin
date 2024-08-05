import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GetVenderAPIById } from '../../../../api';

const VendorDeleteModal = ({ handleGetVendors, show, handleClose, vendorId, handleDeleteVendor }) => {
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isDeletedStatus, setIsDeletedStatus] = useState(null);

  useEffect(() => {
    if (show && vendorId) {
      const fetchVendorData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await GetVenderAPIById({ id: vendorId });
          const vendorData = response?.data?.data?.vendor;

          if (vendorData) {
            setVendor(vendorData);
            const isDeleted = vendorData.is_deleted;
            const updatedStatus = isDeleted === "0" ? "1" : "0";
            setIsDeletedStatus(updatedStatus);
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
  }, [show, vendorId]);

  const handleDelete = async () => {
    setIsLoading(true);
    setDeleteError(null);
    setDeleteSuccess(false);
    try {
      await handleDeleteVendor(vendorId, isDeletedStatus);
      setDeleteSuccess(true);
      handleClose();
    } catch (error) {
      setDeleteError('An error occurred while deleting the vendor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this vendor?</p>
        {deleteError && <p className="text-danger">{deleteError}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button className="all-buttons" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Yes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VendorDeleteModal;
