import React, { useState, useEffect, useCallback } from 'react';
import { createChangeRecord, getProjects } from '../DbStores/models_new'; // Import functions from models.js
import CustomRichTextEditor from './CustomRichTextEditor';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';




function ChangeRecordForm(props) {
  const [selectedProject, setSelectedProject] = useState('');
  const [requesterName, setRequesterName] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [reset, setReset] = useState(false);
  

  useEffect(() => {
    
    setSelectedProject(props.pid);

}, [props]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedProject);

    const newRecord = {
      project_id: selectedProject,
      requester_name: requesterName,
      crStatus:"",
      title,
      summary,
    };
    try {
      console.log(newRecord); 
      await createChangeRecord(newRecord);
      alert('Change record added successfully');
      // Reset form fields
      setRequesterName('');
      setTitle('');
      setReset(true);
    } catch (error) {
      console.error('Error adding change record:', error);
    }
  };

  const handleEditorContentChange = (data, isReset)=>{
    setSelectedProject(props.pid);
    setSummary(data);
    setReset(isReset);
  }

  return (
    <div>
      <h4>{props.pjtName && props.pjtName}</h4>
      <center><Card style={{ width: '60rem' }}>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="requesterName">
        <Form.Label>Requester Name</Form.Label>
        <Form.Control onChange={(e)=>setRequesterName(e.target.value)} type="text" placeholder="Enter requester name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter title name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description
        <CustomRichTextEditor onContentChange={handleEditorContentChange} isReset={reset}/>
        </Form.Label>
      </Form.Group>
      <Button variant = 'primary' type="submit">Add Change Record</Button>
    </Form>
    </Card></center>
    </div>
  );
}

export default ChangeRecordForm;
