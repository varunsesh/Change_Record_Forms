import React, { useState } from 'react';
import { createProject } from '../DbStores/models_new'; // Import the function from models.js
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ProjectForm({onProjectAdd}) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      alert('Project name is required');
      return;
    }
 
    const newProject = {
      // A simple way to generate a unique ID
      project_name: projectName,
      project_description: projectDescription,
    };
    try {
      await createProject(newProject);
      //onProjectAdd(); // Callback to update the list of projects in the parent component
      setProjectName('');
      setProjectDescription('');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
<div>
  <Container><Card>
  <form onSubmit={handleSubmit}>
  <Row className="justify-content-md-center" md='auto'>
    <Col md='auto'><Card.Subtitle><label>
        Project Name
        <br></br>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </label></Card.Subtitle>
    </Col>  
  </Row>
  <Row className="justify-content-md-center" md='auto'>
    <Col md='auto'>
      <Card.Subtitle><label>
        Project Description
        <br></br>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </label></Card.Subtitle>
    </Col>
  </Row>
 <Row className="justify-content-md-center" md='auto'>
      <button type="submit">Create Project</button>
      </Row>
    </form>
    </Card></Container>
    </div>
  );
  
}

export default ProjectForm;
