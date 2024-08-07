import React, { Fragment, useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import "./lab.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LabReportAPI } from "../../../api";

const Lab_Report = () => {

  // const encryptedTokenForVendorOfHanaiHealth = localStorage.getItem("encryptedTokenForVendorOfHanaiHealth")

  const [lab, setLab] = useState([]); 
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    type: "",
    venue: "",
    date: "",
    time: "",
    pdf: null,
  });
  const [error, setError] = useState(""); // To display errors
  const navigate = useNavigate();

  
  const fetchLabReport = async () => {
    try {
      // Introduce a timeout to simulate delay
      const timer = setTimeout(async () => {
        try {
          const response = await LabReportAPI();
          const labReports = response?.data?.data?.labreports;
          setLab(labReports); 
        } catch (apiError) {
          console.error("Error fetching data:", apiError);
          setError("Failed to fetch data. Please try again.");
        }
      }, 10); // 10

      // Cleanup the timer if the component unmounts before the timeout completes
      return () => clearTimeout(timer);

    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred.");
    }
  };
  

  useEffect(() => {
      fetchLabReport(); 
    },[]); 

    
  // Edit Operation
  const handleEdit = (id, type, venue, date, time, pdf) => {
    setEditData({ id, type, venue, date, time, pdf: pdf ? new Blob([pdf], { type: "application/pdf" }) : null });
    setShowEdit(true);
  };

  // Handle PDF Upload
  const handlePdfUpload = (e) => {
    setEditData({ ...editData, pdf: e.target.files[0] });
  };

  // Handle PDF Deselect
  const handlePdfDeselect = () => {
    setEditData({ ...editData, pdf: null });
  };

  // Handle modal close
  const handleCloseEdit = () => setShowEdit(false);

  // Handle Save Changes
  const handleSave = async () => {
    const { id, type, venue, date, time, pdf } = editData;
    const payload = {
      id,
      type,
      venue,
      date,
      time,
      pdf: pdf ? await convertFileToBase64(pdf) : null,
    };
    // Add your save logic here
    console.log("Saving data:", payload);
    handleCloseEdit();
  };

  // Convert file to base64 (if needed for API call)
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="container user-main-container" style={{ marginTop: "2.6%" }}>
        <div className="d-flex align-items-center justify-content-between top-margin-heading">
          <h1 className="text-class">Lab Report</h1>
          {/* Add button is */}
          <div className="btn-class" style={{ visibility: "hidden" }}>
            <Button size="lg" className="add-btn">Lab Report</Button>
          </div>
        </div>

        <Table
          responsive
          striped
          bordered
          hover
          size="sm"
          className="table-resp"
          style={{ marginTop: "1%" }}
        >
          <thead>
            <tr>
              <th className="col-1 col-md-1">Sr No</th>
              <th className="col-3 col-md-3">Test Name</th>
              <th className="col-2 col-md-2">Venue</th>
              <th className="col-3 col-md-3">Date</th>
              <th className="col-2 col-md-2">Time</th>
              <th className="col-1 col-md-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lab.length > 0 ? ( 
              lab.map((item, index) => ( 
                <tr key={item.id}>
                  <td>{index + 1}</td> 
                  <td>{item.type}</td> 
                  <td>{item.venue}</td> 
                  <td>{new Date(item.date).toLocaleDateString()}</td> {/* Date */}
                  <td>{item.time_slot}</td> {/* Time */}
                  <td className="action-users">
                    <Button
                      style={{ color: "#454545", width: "80px" }}
                      variant="link"
                      onClick={() =>
                        handleEdit(
                          item.id, // Assuming Sr is item.id
                          item.type, // Assuming Name is item.type
                          item.venue, // Venue
                          new Date(item.date).toLocaleDateString(), // Date
                          item.time_slot, // Time
                          item.pdf // PDF URL or Blob
                        )
                      }
                    >
                      <FaEdit style={{ fontSize: "20px", margin: "2px" }} />
                    </Button>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
        <br />
      </div>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-container">
            <div className="form-group">
              <strong>Sr No:</strong>
              <span>{editData.id}</span>
            </div>
            <div className="form-group">
              <strong>Test Name:</strong>
              <span>{editData.type}</span>
            </div>
            <div className="form-group">
              <strong>Venue:</strong>
              <span>{editData.venue}</span>
            </div>
            <div className="form-group">
              <strong>Date:</strong>
              <span>{editData.date}</span>
            </div>
            <div className="form-group">
              <strong>Time:</strong>
              <span>{editData.time}</span>
            </div>
            <div className="form-group">
              <strong>PDF:</strong>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.9em",
                }}
              >
                {editData.pdf ? (
                  <>
                    <iframe
                      src={URL.createObjectURL(editData.pdf)}
                      style={{
                        width: "100%",
                        height: "200px",
                        border: "1px solid #ddd",
                      }}
                      title="PDF Preview"
                    />
                    <Button
                      variant="link"
                      style={{
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                        color: "black",
                        padding: 0,
                        background: "transparent",
                        border: "none",
                        fontSize: "1.5em",
                      }}
                      onClick={handlePdfDeselect}
                    >
                      ×
                    </Button>
                  </>
                ) : (
                  "No PDF Selected"
                )}
              </div>
            </div>
            <div className="form-group">
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white", border: "none" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Lab_Report;
