import React, { Fragment, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import './bill.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFilePdf } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import BillEmployeesData from "./BillEmployees";// Renamed to EmployeesData to avoid confusion
import BillStatement from './BillStatement.pdf';

const Bill = () => {
  const [Billemployees, setEmployees] = useState(BillEmployeesData);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editData, setEditData] = useState({ id: "", Sr:"", billId: "", amount: "", createdAt: "" });
  const [newData, setNewData] = useState({Sr:"", billId: "", amount: "", createdAt: "" });

  let history = useNavigate();

  // Edit Operation
  // const handleEdit = (id, Sr, billId, amount, createdAt) => {
  //   setEditData({ id, Sr, billId, amount, createdAt });
  //   setShowEdit(true);
  // };

  // DELETE Operation
  const handleDelete = (id) => {
    setEmployees(Billemployees.filter((e) => e.id !== id));
    history(" ");
  };

  // Handle modal close
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseCreate = () => setShowCreate(false);

  // Handle modal save for edit
  // const handleSaveEdit = () => {
  //   setEmployees(
  //     Billemployees.map((e) =>
  //       e.id === editData.id ? { ...e, Sr: editData.Sr, BillId: editData.billId, amount: editData.amount, createdAt: editData.createdAt } : e
  //     )
  //   );
  //   setShowEdit(false);
  // };

  // Handle modal save for create
  const handleSaveCreate = () => {
    const newId = Billemployees.length ? Math.max(...Billemployees.map((e) => e.id)) + 1 : 1;
    setEmployees([...Billemployees, { id: newId, Sr: newData.Sr, BillId: newData.billId, amount: newData.amount, createdAt: newData.createdAt }]);
    setShowCreate(false);
    setNewData({Sr:"", billId: "", amount: "", createdAt: "" });
  };

  // Open Create Modal
  const handleCreate = () => setShowCreate(true);

  return (
    <Fragment>
      <div className="container container-Bil" style={{marginTop:'2.6%'}}>
      <div className="d-flex align-items-center justify-content-between top-margin-heading">
        <h1 className="text-class ">Bill Details </h1> 

        {/* Add button is   */}
        <div className=" " style={{visibility:'hidden'}}>
          <Button size="lg" onClick={handleCreate}>Add Bill</Button>
        </div>
        </div>
        <Table responsive striped bordered hover size="sm" className="table-resp">
          <thead>
            <tr>
             <th className="col-1 col-md-1">Sr No</th>
              <th className="col-3 col-md-3">Bill Id</th>
              <th className="col-2 col-md-2">Amount</th>
              <th className="col-3 col-md-3">Bill Date</th>
              <th className="col-3 col-md-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Billemployees && Billemployees.length > 0
              ? Billemployees.map((item) => (
                  <tr key={item.id}>
                  <td style={{padding:'6px'}}>{item.Sr}</td>
                    <td style={{padding:'6px'}}>{item.BillId}</td>
                    <td style={{padding:'6px'}}>{item.amount}</td>
                    <td style={{textWrap:'nowrap',padding:'6px'}}>{item.createdAt}</td>
                    <td className="action-users" style={{padding:'6px'}}>
                      {/* <Button size="sm" variant="success" onClick={() => handleEdit(item.id, item.BillId, item.amount, item.createdAt)}>
                        Edit
                      </Button>
                      <Button size="sm" className="mx-2" variant="danger" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button> */}
                      {/* <Button
                          variant="link"
                          onClick={() => handleEdit(item.id, item.Sr, item.BillId, item.amount, item.createdAt)}
                        >
                          <FaEdit />
                        </Button> */}
                        <a
                      href={BillStatement}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFilePdf style={{ color: 'red', fontSize:'20px', margin:'7px'}} />
                    </a>
                        

                    </td>
                  </tr>
                ))
              : <p className="mt-2">No data available</p>}
          </tbody>
        </Table>
        <br />
        {/* <div className="d-grid gap-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button size="lg" onClick={handleCreate}>Add Bill Details</Button>
        </div> */}
      </div>

      {/* Edit Modal */}
      {/* <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNameEdit">
            <Form.Label>Sr No</Form.Label>
              <Form.Control
                type="number"
                placeholder="Sr No"
                value={editData.Sr}
                onChange={(e) => setEditData({ ...editData, Sr: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNameEdit">
              <Form.Label>BillId</Form.Label>
              <Form.Control
                type="number"
                placeholder="Bill Id"
                value={editData.billId}
                onChange={(e) => setEditData({ ...editData, billId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocationEdit">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Bill Amount"
                value={editData.amount}
                onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCreatedAtEdit">
              <Form.Label>Bill Date</Form.Label>
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
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Create Modal */}
      {/* <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bill Details</Modal.Title>
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
              <Form.Label>Bill Id</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Bill Id"
                value={newData.billId}
                onChange={(e) => setNewData({ ...newData, billId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocationCreate">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Bill Amount"
                value={newData.amount}
                onChange={(e) => setNewData({ ...newData, amount: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCreatedAtCreate">
              <Form.Label>Bill Date</Form.Label>
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
          <Button variant="primary" onClick={handleSaveCreate}>
            Add Bill Details
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Fragment>
  );
};

export default Bill;