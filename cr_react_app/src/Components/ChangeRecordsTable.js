import React, { useState, useEffect } from 'react';
import { getChangeRecords, deleteChangeRecord, updateChangeRecord, exportDatabaseToJson, clearAndInsertData } from '../DbStores/models_new';
import CustomRichTextEditor from './CustomRichTextEditor.js'; 
import "../styles.css";
import DropdownMenu from "./Dropdown";
import PopupCard from './PopupCard';
import EditModal from './EditModal.js';
import { Button, Form, FormGroup, FormControl, FormLabel, Card } from 'react-bootstrap';


// Import the function to fetch change records

function ChangeRecordsTable(props) {
  const [records, setRecords] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  const [driveFolderId, setDriveFolderId] = useState('');
  
  

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const allRecords = await getChangeRecords(props.pid);
        const filteredRecords = allRecords.filter(record => record.project_id === props.pid);
        setRecords(filteredRecords);
      } catch (error) {
        console.error('Error fetching change records:', error);
      }
    };
    if(props.pid){
        fetchRecords();
      }
  },[props, records]);

  const handleClick = (record)=>{
    console.log(record);
    setCurrentRecord(record);
    setIsPopup(true);
  }
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

  const exportDB =()=>{
    exportDatabaseToJson()
    .then(jsonData => {
    downloadJSON(jsonData, 'myDatabaseExport.json');
  })
  .catch(error => {
    console.error('Error exporting database:', error);
  });
}


  const importDB = (file)=>{
    const reader = new FileReader();

    reader.onload = async (event)=>{
      const json = JSON.parse(event.target.result);
      await clearAndInsertData("projects", json.projects);
      await clearAndInsertData("changeRecords", json.changeRecords);
    };
    reader.onerror = (error) =>{
      console.log("error reading file ", error);
    };

    reader.readAsText(file);
  
  }

  const closePopup = ()=>{setIsPopup(false)}
  const handleEditClick = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedRecord) => {
    console.log(editedRecord);
    const recordData = {
      // Ensure all fields are included
      summary: editedRecord.summary,
      project_id:editedRecord.pid, 
      requester_name: editedRecord.requester_name, 
      title:editedRecord.title
      // ... other fields as needed ...
    };
  
    try {
      const updatedRecords = await updateChangeRecord(editedRecord.cr_id, recordData);
      
      // // Manually update the record in the state
      // const updatedRecords = records.map(record => {
      //   if (record.cr_id === editedRecord.cr_id) {
      //     return { ...record, ...recordData };
      //   }
      //   return record;
      // });
      console.log(updatedRecords);
  
      //setRecords(updatedRecords);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };
  
  const handleExportToDrive = async () => {
    try {
      const jsonData = await exportDatabaseToJson();
      // Code to handle OAuth and uploading to Google Drive
      // This will involve using the Google Drive API to create a file in the user's drive
    } catch (error) {
      console.error('Error syncing with Google Drive:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async (cr_id) => {
    try {
      await deleteChangeRecord(cr_id); // Function to delete record from IndexedDB
      setRecords(records.filter(record => record.cr_id !== cr_id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const updateStatus = async (record, status)=>{
    
    const newRecord = {
      requester_name:record.requester_name,
      title:record.title,
      crStatus:status,
      summary:record.summary
    }
    try{
      await updateChangeRecord(record.cr_id, newRecord);
    }catch(error){
      console.error('Error deleting record:', error);
    }
  }


  return (
    <div>
      <br></br>
      <Card>
       <Button variant='secondary' onClick={exportDB}>Export to Local</Button>
      <Form>
        <FormGroup>
          <FormLabel>Google Drive Folder ID:</FormLabel>
          <FormControl
            type="text"
            value={driveFolderId}
            onChange={(e) => setDriveFolderId(e.target.value)}
            placeholder="Enter Folder ID"
          />
        </FormGroup>
        <Button onClick={handleExportToDrive}>Sync to Google Drive</Button>
      </Form>
      <br></br>
      <h4><p>Import DB</p></h4>
        <input type="file" className='button button1' label="Import" onChange={(event)=>importDB(event.target.files[0])} Import />
        </Card>
        <h4>Change Records</h4>
    <table className='nice-table'>
      <thead>
        <tr>
          <th>CR_ID</th>
          <th>Name</th>
          <th>Title</th>
          <th>Status</th>
          <th>Update Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.cr_id}>
            <td><div className='row-clickable' onClick={()=>handleClick(record)}>{record.cr_id}</div></td>
            <td>{record.requester_name}</td>
            <td>{record.title}</td>
            <td><div>{record.crStatus}</div></td>
            <td><DropdownMenu onItemSelected={(menuItem)=>updateStatus(record, menuItem)}/></td>
            <td>
              {/* Add buttons or links for edit/delete actions */}
             <Button onClick={() => handleEditClick(record)}>Edit</Button>
             <Button variant='danger' onClick={() => handleDelete(record.cr_id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isEditModalOpen && <EditModal
        record={currentRecord}
        isOpen={isEditModalOpen}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />}
    {isPopup && <PopupCard
    isOpen={isPopup}
    data={currentRecord}
    onCancel={closePopup}
    />}
    </div>
    
  );
}

export default ChangeRecordsTable;
