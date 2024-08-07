import React, { Fragment, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import './vender.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AddVenderAPI, GetVenderAPI, DeleteVendorAPI, IsActiveVendorAPI } from "./../../../api.js";
import Navbar from "../../Navbar/Navbar.js";
import Sidebar from "../../Sidebar/Sidebar.js";
import EditVendorModal from "./EditVendorModal/EditVendorModal.js";
import AddVendorModal from "./AddVendorModal/AddVendorModal.js";
import VendorStatusModal from "./VendorStatusModal/VendorStatusModal.js";
import VendorDeleteModal from "./VendorDeleteModal/VendorDeleteModal.js";

const Vender = () => {
  const [vendors, setVendors] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [vendorStatus, setVendorStatus] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentVendorId, setCurrentVendorId] = useState(null);
  const [editData, setEditData] = useState({ id: "", Sr: "", name: "", location: "", createdAt: "", vendorEmail: "", vendorPass: "", testType: "" });
  const [newData, setNewData] = useState({ Sr: "", name: "", email: "", password: "", type: "", location: "", createdAt: "" });

  let navigate = useNavigate();

  const toggleStatus = (id) => {
    setVendorStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === "Active" ? "Inactive" : "Active",
    }));
  };

  const handleOpenConfirm = (id) => {
    setCurrentVendorId(id);
    setShowConfirm(true);
  };

  const handleConfirmStatusChange = async () => {
    try {
      const response = await IsActiveVendorAPI({ id: currentVendorId });
      if (response.status === 200) {
        toggleStatus(currentVendorId);
        handleGetVendors(); // Fetch the updated user list
      }
    } catch (err) {
      console.error("Failed to change Vendor status:", err.message);
    } finally {
      setShowConfirm(false);
    }
  };

  const handleCancelChange = () => {
    setShowConfirm(false);
  };

  const handleEdit = (id, Sr, name, location, createdAt, vendorEmail, vendorPass, testType) => {
    setEditData({ id, Sr, name, location, createdAt, vendorEmail, vendorPass, testType });
    setShowEdit(true);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseCreate = () => setShowCreate(false);

  const handleSaveEdit = () => {
    setVendors(
      vendors.map((v) =>
        v.id === editData.id ? { ...v, Sr: editData.Sr, name: editData.name, location: editData.location, createdAt: editData.createdAt, vendorEmail: editData.vendorEmail, vendorPass: editData.vendorPass, testType: editData.testType } : v
      )
    );
    setShowEdit(false);
  };

  const handleOpenDeleteConfirm = (id) => {
    setCurrentVendorId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteVendor = async (vendorId, isDeletedStatus) => {
    try {
      const response = await DeleteVendorAPI({ id: vendorId, is_deleted: isDeletedStatus });
      if (response?.data?.response) {
        setVendors((prevVendors) => prevVendors.filter((v) => v.id !== vendorId));
      } else {
        throw new Error(response?.data?.error_msg);
      }
    } catch (error) {
      console.error("Error deleting vendor:", error);
      throw error;
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await handleDeleteVendor(currentVendorId);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting vendor:", error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  // const [getVender, setGetVender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'N/A'; // Placeholder for null or missing date
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleGetVendors = async () => {
    try {
      // Introduce a timeout to simulate delay
      const timer = setTimeout(async () => {
        try {
          setLoading(true);
          const response = await GetVenderAPI();
          const vendors = response?.data?.response?.data;
          setVendors(vendors);
        } catch (apiError) {
          console.error("Error fetching data:", apiError);
          setError("Failed to fetch data. Please try again.");
        } finally {
          setLoading(false);
        }
      }, 10); // Simulated delay of 10 milliseconds
  
      // Cleanup the timer if the component unmounts before the timeout completes
      return () => clearTimeout(timer);
  
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred.");
    }
  };
  

  useEffect(() => {
    handleGetVendors(); // Fetch vendors on component mount
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    handleGetVendors();
  }, [showCreate, showDeleteConfirm, showEdit]);

  const handleAddVender = async () => {
    try {
      const response = await AddVenderAPI({
        name: newData.name,
        email: newData.email,
        password: newData.password,
        type: newData.type,
        venue: newData.location, // Assuming 'venue' corresponds to 'location'
        // createdAt: newData.createdAt,
      });

      if (response?.data?.response) {
        const newId = response?.data?.data?.id; // Assuming the API returns the new ID in the response
        const newVendor = { id: newId, name: newData.name, venue: newData.location, created_at: newData.createdAt };
        setVendors((prevVendors) => [...prevVendors, newVendor]);
        setShowCreate(false);
        setNewData({ Sr: "", name: "", email: "", password: "", type: "", location: "", createdAt: "" });
      } else {
        console.error("Error adding vendor:", response?.data?.error_msg);
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  const handleCreate = () => setShowCreate(true);

  return (
    <Fragment>
      <Navbar />
      <Sidebar />
      <div className="container container-vender" style={{ marginTop: '2.6%' }}>
        <div className="d-flex align-items-center justify-content-between top-margin-heading">
          <h1 className="text-class">Vendor Details</h1>
          <div className="btn-class">
            <Button size="lg" className="add-btn" onClick={handleCreate}>Add Vendor</Button>
          </div>
        </div>
        <div className="table-padding-right">
          <Table responsive striped bordered hover size="sm" className="table-resp table-resp-padding">
            <thead>
              <tr>
                <th className="col-1 col-md-1">Sr No</th>
                <th className="col-3 col-md-3">Vendor Name</th>
                <th className="col-2 col-md-2">Location</th>
                <th className="col-3 col-md-3">Created At</th>
                <th className="col-3 col-md-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors && vendors.length > 0
                ? vendors
                    .filter((vendor) => vendor?.is_deleted !== "1") // Filter out deleted vendors
                    .map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.venue}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{formatDate(item.created_at)}</td>
                        <td className="action-users">
                          <Button
                            style={{ color: '#454545', width: '30px' }}
                            variant="link"
                            onClick={() => handleEdit(item.id, index + 1, item.name, item.venue, item.created_at)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            style={{ color: 'red' ,width: '80px',marginLeft:"40px" }}
                            variant="link"
                            className="mx-2"
                            onClick={() => handleOpenDeleteConfirm(item.id)}
                          >
                            <MdDelete />
                          </Button>
                          <Button
                            className={`btn-state ${vendorStatus[item.id] === "Active" ? 'btn-state-active' : 'btn-state-inactive'}`}
                            variant="link"
                            onClick={() => handleOpenConfirm(item.id)}
                            style={{ width: '85px' }}
                          >
                            {vendorStatus[item.id] === "Active" ? "Active" : "Inactive"}
                          </Button>
                        </td>
                      </tr>
                    ))
                : loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : (
                  <tr>
                    {/* <td colSpan="5">No vendors found.</td> */}
                  </tr>
                )}
            </tbody>
          </Table>
        </div>
      </div>

        <EditVendorModal
        show={showEdit}
        handleClose={handleCloseEdit}
        vendorId={editData.id}
        editData={editData}
        setEditData={setEditData}
        onVendorUpdated={handleSaveEdit}
      />

      <AddVendorModal handleAddVender={handleAddVender} show={showCreate} handleClose={handleCloseCreate} newData={newData} setNewData={setNewData}  />
      <VendorStatusModal show={showConfirm} handleConfirm={handleConfirmStatusChange} handleCancel={handleCancelChange} vendorId={currentVendorId}/>
      <VendorDeleteModal show={showDeleteConfirm} handleDeleteVendor={handleDeleteVendor} handleGetVendors={handleGetVendors} handleClose={() => setShowDeleteConfirm(false)} vendorId={currentVendorId} />
    </Fragment>
  );
};

export default Vender;
