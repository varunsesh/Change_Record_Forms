import React, { useState, useEffect, useCallback } from 'react';
import { createChangeRecord, getProjects } from '../DbStores/models_new'; // Import functions from models.js
import CustomRichTextEditor from './CustomRichTextEditor';
import Button from 'react-bootstrap/Button';

function ChangeRecordForm(props) {
  const [selectedProject, setSelectedProject] = useState('');
  const [requesterName, setRequesterName] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setSelectedProject(props.pid);
}, [props]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(props.pid);
    console.log(selectedProject);

    const newRecord = {
      project_id: selectedProject,
      requester_name: requesterName,
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
    <form onSubmit={handleSubmit}>
      <br></br>
      <label>
        Requester Name
        <br></br>
        <input
          type="text"
          value={requesterName}
          onChange={(e) => setRequesterName(e.target.value)}
          required
        />
      </label>
      <br></br>
      <label>
        Title
        <br></br>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <br></br>
      <br></br>
      <label>Summary
        <br />
        {/* <textarea name="summary" cols="50" rows="20" value={this.state.summary} onChange={(e)=>this.handleChange(e)}>
        </textarea> */}
        <CustomRichTextEditor onContentChange={handleEditorContentChange} isReset={reset} />
        </label><br/><br/>
      <Button variant = 'primary' type="submit">Add Change Record</Button>
    </form>
  );
}

export default ChangeRecordForm;
