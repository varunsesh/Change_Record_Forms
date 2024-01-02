import React, { useState, useEffect } from 'react';
import { createProject } from '../DbStores/models_new'; // Import the function from models.js
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      onProjectAdd();// Callback to update the list of projects in the parent component
      setProjectName('');
      setProjectDescription('');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
<div>
<Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="projectName">
        <Form.Label>Project Name</Form.Label>
        <Form.Control onChange={(e)=>setProjectName(e.target.value)} type="text" placeholder="Enter project name" />
        <Form.Text className="text-muted">
          Enter project name here
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="One line description here" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Create Form
      </Button>
    </Form>
    </div>
  );
  
}

export default ProjectForm;
