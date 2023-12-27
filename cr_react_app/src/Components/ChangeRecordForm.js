import React, { useState, useEffect } from 'react';
import { createChangeRecord, getProjects } from '../DbStores/models_new'; // Import functions from models.js
import CustomRichTextEditor from './CustomRichTextEditor';

function ChangeRecordForm() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [requesterName, setRequesterName] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();
        setProjects(projects);
        if (projects.length > 0) {
          setSelectedProject(projects[0].project_id);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newRecord = {
      project_id: selectedProject,
      requester_name: requesterName,
      title,
      summary,
    };
    try {
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

  const handleEditorContentChange = ()=>{

  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Project:
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          {projects.map((project) => (
            <option key={project.project_id} value={project.project_id}>
              {project.project_name}
            </option>
          ))}
        </select>
      </label>
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
