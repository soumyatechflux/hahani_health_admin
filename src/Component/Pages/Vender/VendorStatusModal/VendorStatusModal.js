// ConfirmModal.js
import React,{useState,useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GetVenderAPIById,IsActiveVendorAPI } from "../../../../api.js"; // Adjust import path if necessary

const VendorStatusModal= ({handleGetVendors ,show, handleClose, handleConfirm,vendorId}) => {
  // const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActiveStatus, setIsActiveStatus] = useState(null);

// console.log(vendorId)
  useEffect(() => {

    const fetchVendorData = async () => {
      if (show && vendorId) {
        setLoading(true);
        try {
          const response = await GetVenderAPIById({ id: vendorId });
          console.log(response?.data);
          console.log('isVendorStatus:',response?.data?.data?.vendor);
          const vendorData = response?.data?.data?.vendor;
          
          
          if(response){
            const isActive = vendorData.is_active;
            console.log(isActive);
            const updatedStatus = isActive === "1" ? "0" : "1";
            console.log("updated status:", updatedStatus)
            setIsActiveStatus(updatedStatus);
            // setIsActiveStatus(updatedStatus);
            handleGetVendors();
          }
         
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVendorData();
  }, [vendorId]);


  console.log('isUpdatedActive',isActiveStatus);
  const handleStatusChange = async () => {
    // console.log(isActiveStatus);
    try {
      const response = await IsActiveVendorAPI({ id: vendorId, is_active: isActiveStatus  });
      
        if (response.status === 200) {

          handleConfirm();
          handleGetVendors();
        }
       
      // }
      else{
        handleConfirm();
      }
      
    } catch (err) {
      console.error("Failed to change user status:", err.message);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to change the status?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button className="all-buttons" onClick={handleStatusChange }>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VendorStatusModal;
