import logo from './logo.svg';
import './App.css';
import FormParent from './Components/FormParent';
import NavBar from './Components/CustomNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import { useState } from 'react';
import ProjectForm from './Components/ProjectForm';

function App() {
const [project, setProject] = useState('1');

const onSelect = (data)=>{
  console.log(data);
  setProject(data);

}

  return (
    <div className="App">
    <NavBar onSelect={onSelect}></NavBar>
    {/* <ProjectForm/> */}
    <FormParent data={project}/>
    </div>
  );
}

export default App;
