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
  
  

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const allRecords = await getChangeRecords();
        const filteredRecords = allRecords.filter(record => record.project_id === props.pid);
        console.log(filteredRecords);
        setRecords(filteredRecords);
      } catch (error) {
        console.error('Error fetching change records:', error);
      }
    };
    if(props.pid)
        fetchRecords();
  },[props]);

  const handleClick = ()=>{console.log("Clicked");}
  const exportDB = ()=>{console.log("Clicked");}
  const importDB = ()=>{console.log("Clicked");}

  const handleEditClick = (record) => {
    setCurrentRecord(record);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedRecord) => {
    // Save the edited record to the database
    // Update the records state to reflect the change
    console.log(editedRecord);
    const recordData = {
      summary:editedRecord.summary
    }
    updateChangeRecord(editedRecord.cr_id, recordData);
    setIsEditModalOpen(false);
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
      <button className=' button button1' type='button' onClick={exportDB}>Export</button>
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
            <td><div className='row-clickable' onClick={handleClick}>{record.cr_id}</div></td>
            <td>{record.requester_name}</td>
            <td>{record.title}</td>
            <td>{record.status}</td>
            <td>
              {/* Add buttons or links for edit/delete actions */}
             <Button onClick={() => handleEditClick(record)}>Edit</Button>
             <Button onClick={() => handleDelete(record.cr_id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <EditModal
        record={currentRecord}
        isOpen={isEditModalOpen}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    </div>
  );
}

export default ChangeRecordsTable;
