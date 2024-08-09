
import React, { Fragment, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import './user.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import { GetUserAPI, IsActiveUserAPI, DeleteUserAPI } from "../../../api.js";
import AddUserModal from "./AddUserModal/AddUserModal.js";
import EditUserModal from "./EditUserModal/EditUserModal.js";
import DeleteUserModal from "./DeleteUserModal/DeleteUserModal.js";
import ConfirmUserStatusModal from "./ConfirmUserStatusModal/ConfirmUserStatusModal.js";

const User = ({onLogout}) => {
  const [getUser, setGetUser] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const [userStatus, setUserStatus] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  const [editData, setEditData] = useState({ id: "", Sr: "", name: "", diseases: "", email: "", password: "", createdAt: "" });
  const [newData, setNewData] = useState({ Sr: "", name: "", email: "", password: "", createdAt: "" });

  const history = useNavigate();

 

  const toggleStatus = (id) => {
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === "Active" ? "Inactive" : "Active",
    }));
  };

  const handleOpenConfirmStatus = (id) => {
    setCurrentUserId(id);
    setShowConfirmStatus(true);
  };

  const handleConfirmStatusChange = async () => {
    try {
      const response = await IsActiveUserAPI({ id: currentUserId });
      if (response.status === 200) {
        toggleStatus(currentUserId);
        handleGetUser(); // Fetch the updated user list
      }
    } catch (err) {
      console.error("Failed to change user status:", err.message);
    } finally {
      setShowConfirmStatus(false);
    }
  };

  const handleCancelStatusChange = () => {
    setShowConfirmStatus(false);
  };

  const handleOpenDelete = (id) => {
    setCurrentUserId(id);
    setShowDelete(true);
  };

  const handleDeleteUser = async () => {
    try {
      if (currentUserId) {
        await DeleteUserAPI({ id: currentUserId, is_deleted: "1" });
        handleGetUser(); // Fetch the updated user list
      }
    } catch (err) {
      console.error("Failed to delete user:", err.message);
    } finally {
      setShowDelete(false);
    }
  };

  const handleCancelDelete = () => setShowDelete(false);

  const handleEdit = (id, Sr, name, diseases, email, password, createdAt) => {
    setEditData({ id, Sr, name, diseases, email, password, createdAt });
    setShowEdit(true);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseCreate = () => setShowCreate(false);

  const handleSaveEdit = () => {
    setGetUser(
      getUser.map((u) =>
        u.id === editData.id ? { ...u, Sr: editData.Sr, name: editData.name,diseases: editData.diseases, email: editData.email, password: editData.password, createdAt: editData.createdAt } : u
      )
    );
    setShowEdit(false);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGetUser = async () => {
    setLoading(true);
    try {
      // Introduce a timeout to simulate delay
      const timer = setTimeout(async () => {
        try {
          const response = await GetUserAPI();

if(response?.data?.response === true && response?.data?.data.length !== 0){
          const users = response?.data?.data;
          const activeUsers = users.filter(user => user?.is_deleted === "0");
          setGetUser(activeUsers);

        }

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
      setLoading(false); // Ensure loading state is reset
    }
  };

  useEffect(() => {
    // Call handleGetUser on component mount
    handleGetUser();

    // Cleanup function for useEffect
    return () => {
      // Any additional cleanup if necessary
    };
  }, []);



  useEffect(() => {
    handleGetUser(); // Fetch users on component mount
  }, [showDelete, showEdit]);




  const handleSaveCreate = () => {
    // Assuming the API call was successful and user was added
    const newId = getUser.length ? Math.max(...getUser.map((u) => u.id)) + 1 : 1;
    setGetUser([...getUser, { id: newId, Sr: newData.Sr, name: newData.name, diseases: newData.diseases, email: newData.email, password: newData.password, createdAt: newData.createdAt }]);
    setShowCreate(false);
    setNewData({ Sr: "", name: "",diseases:"", email: "", password: "", createdAt: "" });
  };

  const handleCreate = () => setShowCreate(true);

  return (
    <Fragment>
        <Navbar onLogout={onLogout}/><Sidebar onLogout={onLogout}/>
      <div className="container container-Users" style={{ marginTop: '2.6%' }}>
        <div className="d-flex align-items-center justify-content-between top-margin-heading">
          <h1 className="text-class">User Details</h1>
          <div className="btn-class">
            <Button size="lg" className="add-btn" onClick={handleCreate}>Add Users</Button>
          </div>
        </div>

        <div className="table-padding-right">
          <Table responsive striped bordered hover size="sm" className="table-resp">
            <thead>
              
              <tr>
                <th className="col-1 col-md-1">Sr No</th>
                <th className="col-2 col-md-2">User Name</th>
                <th className="col-2 col-md-2">Disease</th>
                <th className="col-2 col-md-2">Email</th>
                {/* <th className="col-2 col-md-2">Created At</th> */}
                <th className="col-3 col-md-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getUser && getUser.length > 0
                ? getUser.filter((user) => user?.is_deleted !== "1").map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.diseases ? item.diseases : "---"}</td>
                    <td>{item.email}</td>
                    {/* <td style={{ whiteSpace: 'nowrap' }}>{formatDate(item.created_at)}</td> */}
                    <td className="action-users">
                      <Button style={{ color: '#454545', width: '30px' }}
                        variant="link"
                        onClick={() => handleEdit(item.id, item.Sr, item.name,item.diseases, item.email, item.password, item.createdAt)}
                      >
                        <FaEdit />
                      </Button>
                      <Button  style={{ color: 'red' ,width: '80px', marginLeft:'40px' }}
                        variant="link"
                        className="mx-2"
                        onClick={() => handleOpenDelete(item.id)}
                      >
                        <MdDelete />
                      </Button>

                      <Button
                        className={`btn-state ${userStatus[item.id] === "Active" ? 'btn-state-active' : 'btn-state-inactive'}`}
                        variant="link"
                        onClick={() => handleOpenConfirmStatus(item.id)}
                      >
                        {userStatus[item.id] || "Inactive"}
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
                    {/* <td colSpan="5">No users found.</td> */}
                  </tr>
                )}
            </tbody>
          </Table>
        </div>
        <br />
      </div>
      
      <ConfirmUserStatusModal
        show={showConfirmStatus}
        handleCancel={handleCancelStatusChange}
        handleConfirm={handleConfirmStatusChange}
        userId={currentUserId}
        handleGetUser={handleGetUser}
      />

      <DeleteUserModal
        show={showDelete}
        handleCancel={handleCancelDelete}
        handleConfirm={handleDeleteUser}
        userId={currentUserId} 
        handleGetUser={handleGetUser}
      />

      <EditUserModal
        show={showEdit}
        handleClose={handleCloseEdit}
        userId={editData.id}
        editData={editData}
        setEditData={setEditData}
        handleSave={handleSaveEdit}
        handleGetUser={handleGetUser}
      />

      <AddUserModal
        show={showCreate}
        handleClose={handleCloseCreate}
        newData={newData}
        setNewData={setNewData}
        onUserUpdated={handleSaveCreate}
        handleGetUser={handleGetUser}
      />
      
    </Fragment>
  );
};

export default User;
