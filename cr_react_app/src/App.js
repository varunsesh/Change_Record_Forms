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
const [newForm, setNewForm] = useState(false);
const [homePage, setHomePage] = useState(true);

const onSelect = (data)=>{
  console.log(data);
  setProject(data);

}

const onNewForm = (e)=>{
  setHomePage(false);
  setNewForm(true);
}

const onProjectAdd = (e)=>{
  setHomePage(true);
  setNewForm(false);
}





  return (
    <div className="App">
    
    <NavBar goHome={onProjectAdd} onSelect={onSelect}></NavBar>
    {homePage && <HomePage onNewForm={onNewForm}/>}
    {newForm && <ProjectForm onProjectAdd={onProjectAdd}/> }
    {/* <FormParent data={project}/> */}
    </div>
  );
}

export default App;
