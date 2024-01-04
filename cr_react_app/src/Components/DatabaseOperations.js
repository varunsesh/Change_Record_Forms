import React, { useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {exportDatabaseToJson, clearAndInsertData} from '../DbStores/models_new';

function DatabaseOperations() {
  const [showModal, setShowModal] = useState(false);
  const [driveLink, setDriveLink] = useState('');
  const fileInputRef = useRef(null);


  const downloadJSON = (data, filename)=>{
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'exported-data.json';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  }

  const handleExport = () => {
    if (driveLink) {
      // Export to Google Drive
    } else {
      exportDatabaseToJson()
      .then(jsonData => {
        downloadJSON(jsonData, 'myDatabaseExport.json');
      })
      .catch(error => {
        console.error('Error exporting database:', error);
     });
      // Local export
    }
  };

  const handleImportClick = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
        
    if (file) {
      const reader = new FileReader();

      reader.onload = async (event)=>{
        const json = JSON.parse(event.target.result);
        await clearAndInsertData("projects", json.projects);
        await clearAndInsertData("changeRecords", json.changeRecords);
        console.log("inserted data");
      };
      reader.onerror = (error) =>{
        console.log("error reading file ", error);
      };
  
      reader.readAsText(file);
      // Call your import function here
      // For example: await importDB(file);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Export/ImportDB</Button>

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
            <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button variant="secondary" onClick={handleImportClick}>Import DB</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DatabaseOperations;
