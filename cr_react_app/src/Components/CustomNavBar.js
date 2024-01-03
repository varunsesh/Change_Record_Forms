import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getProjects } from '../DbStores/models_new'; // Import functions from models.js
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'bootstrap';
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
          setSelectedProject(projects[0].project_name);
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
        <NavDropdown title={projects[selectedProject-1]} id="basic-nav-dropdown">
          {projects && projects.map((project)=><NavDropdown.Item>{project.project_name}</NavDropdown.Item>)}
          </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default NavBar;