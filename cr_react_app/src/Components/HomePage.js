import {React, useEffect, useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { getProjects } from '../DbStores/models_new';


const HomePage = ({props, onNewForm, onShowCR}) => {

 const [projects, setProjects] = useState();
 const [createForm, setCreateForm] = useState(false);
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

    const handleClick = ()=>{
        
        console.log("Clicked here");
    }

    const handleChange  = (project_id) =>{
      console.log("Handling change");
      console.log(project_id);
      setSelectedProject(projects[project_id-1].project_name);
      onShowCR(project_id);

    }

    const newForm = ()=>{
      setCreateForm(true);
      console.log("new form");
      console.log(props);
    }


  return (
    <div>
        <Container>
        <div className='row align-items-center'>
        <h1>Change Record Application</h1>
        <Dropdown  onSelect={handleChange}>
            <Dropdown.Toggle  variant="" id="dropdown-basic">
            Choose Project
          </Dropdown.Toggle>
          <h6>{selectedProject}</h6>
               <Dropdown.Menu >
                {projects && projects.map((project)=><Dropdown.Item eventKey = {project.project_id} key={project.project_id}>{project.project_name}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
        </div>
        <br />
        <Button onClick={onNewForm}> + Create New Form</Button>
        </Container>
    </div>
  )
}

export default HomePage