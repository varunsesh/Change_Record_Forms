import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from 'react';

function BasicExample(props) {
  const [label, setLabel]=useState('');
  
  useEffect(()=>{
    setLabel("Pristine Connect");
  })

  const handleClick = (e)=>{
    console.log(label);
  }

  const goHome = ()=>{
    props.setPjt(false);
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" onClick={goHome}>Change Record Form</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Project" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleClick}>{label}</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Project 2</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;