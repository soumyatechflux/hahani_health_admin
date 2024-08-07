import React from 'react';
import { Modal } from "react-bootstrap";

const PdfModal = ({ showPdf, setShowPdf, pdfUrl }) => {
  return (
    <Modal show={showPdf} onHide={() => setShowPdf(false)} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>PDF Viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            style={{ width: '100%', height: '600px' }}
            frameBorder="0"
          />
        ) : (
          <p>No PDF available</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PdfModal;
