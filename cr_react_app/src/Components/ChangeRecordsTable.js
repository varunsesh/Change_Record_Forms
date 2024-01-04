import React, { useState, useEffect } from 'react';
import { getChangeRecords, deleteChangeRecord, updateChangeRecord, exportDatabaseToJson, clearAndInsertData } from '../DbStores/models_new';
import CustomRichTextEditor from './CustomRichTextEditor.js'; 
import "../styles.css";
import DropdownMenu from "./Dropdown";
import PopupCard from './PopupCard';
import EditModal from './EditModal.js';
import { Button, Form, FormGroup, FormControl, FormLabel, Card } from 'react-bootstrap';
import DatabaseOperations from './DatabaseOperations.js';


// Import the function to fetch change records

function ChangeRecordsTable(props) {
  const [records, setRecords] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  
  
  

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
    console.log(record.cr_id);
    try{
      await updateChangeRecord(record.cr_id, newRecord);
    }catch(error){
      console.error('Error updating status in record:', error);
    }
  }
  const handleManageDB = ()=>{

  }


  return (
    <div>
      <br></br>
      
      <br></br>
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
