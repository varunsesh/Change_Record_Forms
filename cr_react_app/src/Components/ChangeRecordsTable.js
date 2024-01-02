import React, { useState, useEffect } from 'react';
import { getChangeRecords, deleteChangeRecord, updateChangeRecord } from '../DbStores/models_new';
import {saveAs} from 'file-saver';
import CustomRichTextEditor from './CustomRichTextEditor.js'; 
import "../styles.css";
import DropdownMenu from "./Dropdown";
import PopupCard from './PopupCard';
import EditModal from './EditModal.js';
import Button from 'react-bootstrap/Button';


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
    if(props.pid)
        fetchRecords();
  },[props, records]);

  const handleClick = (record)=>{
    console.log(record);
    setCurrentRecord(record);
    setIsPopup(true);
  }
  const exportDB = ()=>{console.log("Clicked");}
  const importDB = ()=>{console.log("Clicked");}

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


  return (
    <div>
      <Button variant='secondary' onClick={exportDB}>Export</Button>
        <input type="file" className='button button1' onChange={importDB} Import/>
    <table className='nice-table'>
      <thead>
        <tr>
          <th>CR_ID</th>
          <th>Name</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.cr_id}>
            <td><div className='row-clickable' onClick={()=>handleClick(record)}>{record.cr_id}</div></td>
            <td>{record.requester_name}</td>
            <td>{record.title}</td>
            <td>{record.status}</td>
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
