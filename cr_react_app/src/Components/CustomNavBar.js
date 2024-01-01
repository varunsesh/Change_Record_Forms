import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getProjects } from '../DbStores/models_new'; // Import functions from models.js
import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';

function NavBar({props, onSelect, goHome}) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

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
  const handleClick = (e)=>{
    
  }
  const handleChange = (e) =>{
    onSelect(e.target.value);
    setSelectedProject(e.target.value);
  }

  return (
    <Navbar  expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" onClick={goHome}>Change Record Form</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <select
          value={selectedProject}
          onChange={handleChange}
        >
          {projects.map((project) => (
            <option key={project.project_id} value={project.project_id}>
              {project.project_name}
            </option>
          ))}
        </select>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;