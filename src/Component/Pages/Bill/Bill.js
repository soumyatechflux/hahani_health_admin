import React, { Fragment, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import './bill.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFilePdf } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PdfModal from './PdfModal/PdfModal'; // Import the PdfModal component
import { GetBillsAPI } from './../../../api.js'; // Import your API function
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editData, setEditData] = useState({ id: "", Sr: "", billId: "", amount: "", createdAt: "" });
  const [newData, setNewData] = useState({ Sr: "", billId: "", amount: "", createdAt: "" });
  const [showPdf, setShowPdf] = useState(false); // State for showing PDF modal
  const [pdfUrl, setPdfUrl] = useState(""); // State for storing PDF URL

  let history = useNavigate();

  // Fetch bills on component mount
  useEffect(() => {
    const fetchBills = async () => {
      try {
        // Introduce a timeout to simulate delay
        const timer = setTimeout(async () => {
          try {
            const response = await GetBillsAPI();
            console.log("Bill Data", response?.data?.data?.bills);
            setBills(response?.data?.data?.bills); // Update state with fetched bills data
          } catch (apiError) {
            console.error("Error fetching bills:", apiError);
            // setError("Failed to fetch bills. Please try again.");
          }
        }, 10); // 10ms delay
  
        // Cleanup the timer if the component unmounts before the timeout completes
        return () => clearTimeout(timer);
  
      } catch (error) {
        console.error("Unexpected error:", error);
        // setError("An unexpected error occurred.");
      }
    };
  
    fetchBills();
  }, []);
  

  // DELETE Operation
  const handleDelete = (id) => {
    setBills(bills.filter((b) => b.id !== id));
    history(" ");
  };

  // Handle modal close
  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseCreate = () => setShowCreate(false);

  // Handle modal save for create
  const handleSaveCreate = () => {
    const newId = bills.length ? Math.max(...bills.map((b) => b.id)) + 1 : 1;
    setBills([...bills, { id: newId, Sr: newData.Sr, billId: newData.billId, amount: newData.amount, createdAt: newData.createdAt }]);
    setShowCreate(false);
    setNewData({ Sr: "", billId: "", amount: "", createdAt: "" });
  };

  // Open Create Modal
  const handleCreate = () => setShowCreate(true);

  // Open PDF Modal
  const handleOpenPdf = () => {
    const url = '/pdf/BillStatement.pdf'; // Path to the PDF file in the public directory
    setPdfUrl(url);
    setShowPdf(true);
  };

  return (
    <Fragment>
      <Navbar />
      <Sidebar />
      <div className="container container-Bil" style={{ marginTop: '2.6%' }}>
        <div className="d-flex align-items-center justify-content-between top-margin-heading">
          <h1 className="text-class">Bill Details</h1>

          {/* Add button is */}
          <div className="" style={{ visibility: 'hidden' }}>
            <Button size="lg">Add Bill</Button>
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
            {bills && bills.length > 0
              ? bills.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ padding: '6px' }}>{index + 1}</td>
                    <td style={{ padding: '6px' }}>{item.bill_id}</td>
                    <td style={{ padding: '6px' }}>{item.amount}</td>
                    <td style={{ textWrap: 'nowrap', padding: '6px' }}>{new Date(item.bill_date).toLocaleDateString()}</td>
                    <td className="action-users" style={{ padding: '6px' }}>
                      <Button
                        variant="link"
                        onClick={handleOpenPdf} // Open PDF modal
                      >
                        <FaFilePdf style={{ color: 'red', fontSize: '20px', margin: '7px' }} />
                      </Button>
                    </td>
                  </tr>
                ))
              : <p className="mt-2">No data available</p>}
          </tbody>
        </Table>
        <br />

        {/* PDF Modal */}
        <PdfModal showPdf={showPdf} setShowPdf={setShowPdf} pdfUrl={pdfUrl} />
      </div>
    </Fragment>
  );
};

export default Bill;
