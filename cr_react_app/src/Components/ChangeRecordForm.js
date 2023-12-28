import React, { useState, useEffect, useCallback } from 'react';
import { createChangeRecord, getProjects } from '../DbStores/models_new'; // Import functions from models.js
import CustomRichTextEditor from './CustomRichTextEditor';

function ChangeRecordForm(props) {
  const [selectedProject, setSelectedProject] = useState('');
  const [requesterName, setRequesterName] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
}, [selectedProject]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(props.data.data);
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
      setSummary('');
    } catch (error) {
      console.error('Error adding change record:', error);
    }
  };

  const handleEditorContentChange = (data)=>{
    setSelectedProject(props.data.data);
    setSummary(data);
    console.log(data);
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
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <br></br>
      <label>Summary
        <br />
        {/* <textarea name="summary" cols="50" rows="20" value={this.state.summary} onChange={(e)=>this.handleChange(e)}>
        </textarea> */}
        <CustomRichTextEditor data={editMode} onContentChange={handleEditorContentChange} value={summary} />
        </label><br/><br/>
      <button type="submit">Add Change Record</button>
    </form>
  );
}

export default ChangeRecordForm;
