import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {exportDatabaseToJson, clearAndInsertData} from '../DbStores/models_new';
import oauthSignIn from './Authentication/oauth2';



function DatabaseOperations({onFileUpload}) {
  const [showModal, setShowModal] = useState(false);
  const [driveLink, setDriveLink] = useState('');
  const fileInputRef = useRef(null);
  const [authToken, setAuthToken] = useState('');
  const [fileToUpload, setFileToUpload] = useState(null);
  



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

  useEffect(()=>{
    const hash = window.location.hash;
    if (hash) {
        const token = new URLSearchParams(hash.substring(1)).get('access_token');
        if (token) {
            // Use the token as needed
            setAuthToken(token);
        }
    }
    if (authToken && fileToUpload) {
      uploadFileToGoogleDrive(authToken, fileToUpload, driveLink)
      onFileUpload(true);
      // Reset or handle the fileToUpload state as necessary
      setFileToUpload(null);
      onFileUpload(false);
    }
  }, [authToken, fileToUpload])



  async function uploadFileToGoogleDrive(token, file, driveLink) {
    const folderId = driveLink.match(/[-\w]{25,}/);
    
    const metadata = {
        'name': file.name, // file name
        'mimeType': file.type, 
        // 'parents':[folderId] // file MIME type
    };
  
    // Form the body of the request
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json', charset:'UTF-8'}));
    formData.append('file', file);
    console.log(formData);
  
    try {
      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
          method: 'POST',
          headers: new Headers({ 'Authorization': 'Bearer ' + token }),
          body: formData
      });
      const result = await response.json();
      console.log(response);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file: ' + error.message); // Error alert
    }
  }
  



  const handleExport = () => {
    if (driveLink) {
      exportDatabaseToJson()
      .then(jsonData => {
        const blob = new Blob([jsonData], { type: 'application/json' });
        const file = new File([blob], 'myDatabaseExport.json', { type: 'application/json' });
        setFileToUpload(file);
        oauthSignIn(); // Trigger OAuth sign-in
      })
      .catch(error => {
        console.error('Error exporting database:', error);
      });
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
