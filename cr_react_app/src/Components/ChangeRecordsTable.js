import React, { useState, useEffect } from 'react';
import { getChangeRecords, deleteChangeRecord, updateChangeRecord, exportDatabaseToJson, clearAndInsertData } from '../DbStores/models_new';
import CustomRichTextEditor from './CustomRichTextEditor.js'; 
import "../styles.css";
import DropdownMenu from "./Dropdown";
import PopupCard from './PopupCard';
import EditModal from './EditModal.js';
import {Container, Row, Col, Button, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// Import the function to fetch change records

function ChangeRecordsTable(props) {
  const [records, setRecords] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  const [dates, setDates] = useState(new Date());
  
  
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const allRecords = await getChangeRecords(props.pid);
        const filteredRecords = allRecords.filter(record => record.project_id === props.pid);
        
        // Sort the records
        const sortedRecords = sortChangeRecords(filteredRecords);
  
        setRecords(sortedRecords);
    
        // Initialize dates for each record
        const initialDates = sortedRecords.map(record => record.date ? new Date(record.date) : new Date());
        setDates(initialDates);
      } catch (error) {
        console.error('Error fetching change records:', error);
      }
    };
    
    if(props.pid){
      fetchRecords();
    }
  }, [props.pid, records]); // Dependency on props.pid
  
  

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
  
    try {
      const updatedRecords = await updateChangeRecord(editedRecord.cr_id, editedRecord);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };
  

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  // Function to handle date change
  const handleDateChange = async (date, index) => {
    const newDates = [...dates];
    newDates[index] = date;
    setDates(newDates);
  
    const recordToUpdate = {...records[index], date: date.toISOString()};
    
    // Update the record's date in the IndexedDB
    try {
      await updateChangeRecord(recordToUpdate.cr_id, recordToUpdate);
      console.log('Date updated successfully');
    } catch (error) {
      console.error('Error updating date:', error);
    }
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

  function exportToCsv(filename, rows) {
    const csvContent = "data:text/csv;charset=utf-8," + 
      rows.map(row => 
        row.map(field => 
          `"${field.toString().replace(/"/g, '""')}"` // Enclose in quotes and escape quotes
        ).join(",")
      ).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Required for FF
  
    link.click(); // This will download the data file named "export.csv".
    document.body.removeChild(link);
  }
  
  

  const handleExport = () => {
    const headers = ["CR_ID", "Name", "Title", "Status", "Date"];
    const rows = records.map(record => [
      `="${record.cr_id}"`, // Format as Excel formula to output text
      record.requester_name, 
      record.title, 
      record.crStatus, 
      (new Date(record.date)).toLocaleDateString() // Format date
    ]);
  
    exportToCsv("export.csv", [headers, ...rows]);
  };

  function sortChangeRecords(records) {
    return records.sort((a, b) => {
      const partsA = a.cr_id.split('-').map(Number);
      const partsB = b.cr_id.split('-').map(Number);
  
      if (partsA[0] === partsB[0]) { // Compare project IDs
        return partsA[1] - partsB[1]; // Compare CR numbers within the same project
      } else {
        return partsA[0] - partsB[0]; // Compare different projects
      }
    });
  }
  
  

  return (
    <div>
      <br></br>
      
      <br></br>
    <Container>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col><h4>Change Records</h4></Col>
        <Col></Col>
        <Col><Button variant="light" onClick={handleExport}>Export as CSV</Button> </Col>
      </Row>
    
      </Container>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>CR_ID</th>
          <th>Name</th>
          <th>Title</th>
          <th>Status</th>
          <th>Update Status</th>
          <th>Estimated Uat Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index}>
            <td><div className='row-clickable' onClick={()=>handleClick(record)}>{record.cr_id}</div></td>
            <td>{record.requester_name}</td>
            <td>{record.title}</td>
            <td><div>{record.crStatus}</div></td>
            <td><DropdownMenu onItemSelected={(menuItem)=>updateStatus(record, menuItem)}/></td>
            <td>
              <DatePicker  
              showIcon
              selected={dates[index]}
              onChange={(date) => handleDateChange(date, index)} />
              </td>
            <td>
              {/* Add buttons or links for edit/delete actions */}
             <Button onClick={() => handleEditClick(record)}>Edit</Button>
             <Button variant='danger' onClick={() => handleDelete(record.cr_id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
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
