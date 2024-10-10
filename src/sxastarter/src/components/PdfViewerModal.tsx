import React, { useState } from 'react';
import Modal from 'react-modal';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Define the types for the component props
interface PdfViewerModalProps {
  fileUrl: string; // URL of the PDF to display
  linkLabel?: string; // Optional label for the link, default is 'View PDF'
}

// React Modal styles
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '90vh',
    backgroundColor: '#fff',
    border: '1px solid #444',
    color: '#000',
    borderRadius: '10px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 20,
  },
};

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ fileUrl, linkLabel = 'View PDF' }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Create an instance of the default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Functions to open and close the modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <span onClick={openModal} className="document-preview">
        {linkLabel}
      </span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="PDF Viewer Modal"
        ariaHideApp={false}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          style={{
            marginBottom: '10px',
            cursor: 'pointer',
            background: '#444',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
          }}
        >
          Close PDF
        </button>

        {/* PDF Viewer */}
        <div style={{ height: '94%' }}>
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
            <div
              style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '100%',
              }}
            >
              <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
            </div>
          </Worker>
        </div>
      </Modal>
    </>
  );
};

export default PdfViewerModal;
