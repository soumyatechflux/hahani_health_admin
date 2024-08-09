import React, { Fragment, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import './bill.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFilePdf } from "react-icons/fa6";
import PdfModal from './PdfModal/PdfModal';
import { GetBillsAPI } from './../../../api.js';
import Navbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';

const Bill = ({onLogout}) => {
  const [bills, setBills] = useState([]);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const loading=true;

  useEffect(() => {
    const fetchBills = async () => {
      // setLoading(true);
      try {
        // Introduce a timeout to simulate delay
        const timer = setTimeout(async () => {
          try {
            const response = await GetBillsAPI();
            if(response?.data?.data?.bills.length !== 0 && response?.data?.response === true ){  setBills(response?.data?.data?.bills)}
          
          } catch (apiError) {
            console.error("Error fetching bills:", apiError);
          } finally {
            // setLoading(false);
          }
        }, 10); // 10ms delay
  
        // Cleanup the timer if the component unmounts before the timeout completes
        return () => clearTimeout(timer);

      } catch (error) {
        console.error("Unexpected error:", error);
        // setError("An unexpected error occurred.");
        // setLoading(false); // Ensure loading state is reset
      }
    };

    fetchBills();

    // Cleanup function for useEffect
    return () => {
      // Any additional cleanup if necessary
    };
  }, []);


  // Open PDF Modal
  const handleOpenPdf = (url) => {
    setPdfUrl(url);
    setShowPdf(true);
  };
  
  return (
    <Fragment>
     <Navbar onLogout={onLogout}/><Sidebar onLogout={onLogout}/>
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
                        onClick={() => handleOpenPdf(item?.actions)}
                      >
                        <FaFilePdf style={{ color: 'red', fontSize: '20px', margin: '7px' }} />
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
                    <td colSpan="5">No vendors found.</td>
                  </tr>
                )}
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
