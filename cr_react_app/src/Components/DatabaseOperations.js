import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function DatabaseOperations() {
  const [showModal, setShowModal] = useState(false);
  const [driveLink, setDriveLink] = useState('');

  const handleExport = () => {
    if (driveLink) {
      // Export to Google Drive
    } else {
      // Local export
    }
  };

  const handleImport = () => {
    // Handle import functionality
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Manage DB</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Database Operations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Google Drive Link</Form.Label>
              <Form.Control 
                type="text" 
                value={driveLink} 
                onChange={(e) => setDriveLink(e.target.value)} 
                placeholder="Enter Google Drive link (optional)" 
              />
            </Form.Group>
            <Button variant="primary" onClick={handleExport}>Export DB</Button>
            <Button variant="secondary" onClick={handleImport}>Import DB</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DatabaseOperations;
