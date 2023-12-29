import {React, useEffect, useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { getProjects } from '../DbStores/models_new';


const HomePage = ({props, onNewForm}) => {

 const [projects, setProjects] = useState();
 const [createForm, setCreateForm] = useState(false);
 const [selectedProject, setSelectedProject] = useState('');

 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const projects = await getProjects();
      projects.map((project)=>{console.log(project.project_name)});
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

    const handleClick = ()=>{
        
        console.log("Clicked here");
    }

    const handleChange  = (e) =>{
      console.log("Handling change");
      console.log(e);

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