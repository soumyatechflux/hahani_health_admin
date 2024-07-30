import React, { Fragment, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import './user.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UserEmployeesData from "./UserEmployees";// Renamed to EmployeesData to avoid confusion

const User = () => {
  const [employees, setEmployees] = useState(UserEmployeesData);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [employeeStatus, setEmployeeStatus] = useState({});//for states
  const [showConfirm, setShowConfirm] = useState(false);//for states active inactive
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);//for states active inactive

  const [editData, setEditData] = useState({ id: "", Sr: "", name: "", location: "", createdAt: "" });
  const [newData, setNewData] = useState({ name: "", location: "", createdAt: "" });

  let history = useNavigate();


  //for togglestatus states operation
  const toggleStatus = (id) => {
    setEmployeeStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === "Active" ? "Inactive" : "Active",
    }));
  };

  //for handle opening confirmation of states model
  const handleOpenConfirm = (id) => {
    setCurrentEmployeeId(id);
    setShowConfirm(true);
  };

  //handle confirming states model
  const handleConfirmChange = () => {
    toggleStatus(currentEmployeeId);
    setShowConfirm(false);
  };

  const handleCancelChange = () => {
    setShowConfirm(false);
  };


  // Edit Operation
  const handleEdit = (id, Sr, name, location, createdAt) => {
    setEditData({ id, Sr, name, location, createdAt });
    setShowEdit(true);
  };

  // DELETE Operation
  const handleDelete = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
    history(" ");
  };

  // Handle modal close
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseCreate = () => setShowCreate(false);

  // Handle modal save for edit
  const handleSaveEdit = () => {
    setEmployees(
      employees.map((e) =>
        e.id === editData.id ? { ...e, Sr: editData.Sr, Name: editData.name, location: editData.location, createdAt: editData.createdAt } : e
      )
    );
    setShowEdit(false);
  };

  // Handle modal save for create
  const handleSaveCreate = () => {
    const newId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    setEmployees([...employees, { id: newId, Sr: newData.Sr, Name: newData.name, location: newData.location, createdAt: newData.createdAt }]);
    setShowCreate(false);
    setNewData({ Sr: "", name: "", location: "", createdAt: "" });
  };

  // Open Create Modal
  const handleCreate = () => setShowCreate(true);

  return (
    <Fragment>
      <div className="container container-Users" style={{marginTop:'2.6%'}}>
        <div className="d-flex align-items-center justify-content-between top-margin-heading">
          <h1 className="text-class " >User Details </h1>

          {/* Add button is   */}
          <div className=" btn-class">
            <Button size="lg" className="add-btn" onClick={handleCreate}>Add Users</Button>
          </div>
        </div>

        <Table responsive striped bordered hover size="sm" className="table-resp" >
          <thead>
            <tr>
              <th className="col-1 col-md-1">Sr No</th>
              <th className="col-3 col-md-3">User Name</th>
              <th className="col-2 col-md-2">Location</th>
              <th className="col-3 col-md-3">Created At</th>
              <th className="col-3 col-md-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees && employees.length > 0
              ? employees.map((item) => (
                <tr key={item.id}>
                  <td >{item.Sr}</td>
                  <td>{item.Name}</td>
                  <td>{item.location}</td>
                  <td style={{textWrap:'nowrap'}}>{item.createdAt}</td>
                  <td className="action-users">
                    <Button style={{ color: '#454545',width: '80px'}}
                      variant="link"
                      onClick={() => handleEdit(item.id, item.Sr, item.Name, item.location, item.createdAt)}
                    >
                      <FaEdit />
                    </Button>
                    <Button style={{ color: 'red' }}
                      variant="link"
                      className="mx-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </Button>

                    {/* for states  */}
                    <Button
                      className={`btn-state ${employeeStatus[item.id] === "Active" ? 'btn-state-active' : 'btn-state-inactive'}`}
                      variant="link"
                      onClick={() => handleOpenConfirm(item.id)}
                    >
                      {employeeStatus[item.id] || "Inactive"}
                    </Button>

                  </td>
                </tr>
              ))
              : <p className="mt-2">No data available</p>}
          </tbody>
        </Table>
        <br />
        {/* <div className="d-grid gap-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button size="lg" onClick={handleCreate}>Add Users</Button>
        </div> */}
      </div>

      {/* for states model  */}
      <Modal show={showConfirm} onHide={handleCancelChange} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to change the status?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelChange}>
            No
          </Button>
          <Button className="all-buttons" onClick={handleConfirmChange}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNameEdit">
              <Form.Label>Sr No</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Sr No"
                value={editData.Sr}
                onChange={(e) => setEditData({ ...editData, Sr: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNameEdit">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocationEdit">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCreatedAtEdit">
              <Form.Label>Created At</Form.Label>
              <Form.Control
                type="date"
                value={editData.createdAt}
                onChange={(e) => setEditData({ ...editData, createdAt: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button className="all-buttons" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Modal */}
      <Modal show={showCreate} onHide={handleCloseCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNameCreate">
              <Form.Label>Sr No</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Sr No"
                value={newData.Sr}
                onChange={(e) => setNewData({ ...newData, Sr: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNameCreate">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                value={newData.name}
                onChange={(e) => setNewData({ ...newData, name: e.target.value })}
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
            <Form.Group className="mb-3" controlId="formCreatedAtCreate">
              <Form.Label>Created At</Form.Label>
              <Form.Control
                type="date"
                value={newData.createdAt}
                onChange={(e) => setNewData({ ...newData, createdAt: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
          <Button className="all-buttons" onClick={handleSaveCreate}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default User;