import logo from './logo.svg';
import './App.css';
import FormParent from './Components/FormParent';
import NavBar from './Components/CustomNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import React, {useState} from 'react';

import ProjectForm from './Components/ProjectForm';


function App() {
const [project, setProject] = useState(null);
const [newForm, setNewForm] = useState(false);
const [homePage, setHomePage] = useState(true);
const [showCR, setShowCR] = useState(false);





const onNewForm = (e)=>{
  setHomePage(false);
  setNewForm(true);
  setShowCR(false);
}

const onProjectAdd = (e)=>{
  setHomePage(true);
  setNewForm(false);
  setShowCR(false);
}

const onShowCR = (e) => {
  console.log(e);
  setProject(parseInt(e));
  setShowCR(true);
  setHomePage(false);
  
}



  return (
    <div className="App">
    
    <NavBar goHome={onProjectAdd} onSelect={onShowCR} isHome={homePage}></NavBar>
    <HomePage onShowCR={onShowCR} onNewForm={onNewForm} isHome={homePage}/>
    {newForm && <ProjectForm onProjectAdd={onProjectAdd} /> }
    { showCR && <FormParent selectedProjectID={project}/>}
    </div>
  );
}

export default App;
