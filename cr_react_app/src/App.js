import logo from './logo.svg';
import './App.css';
import FormParent from './Components/FormParent';
import NavBar from './Components/CustomNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import { useState } from 'react';
import ProjectForm from './Components/ProjectForm';

function App({pjt}) {
const [project, setPjt] = useState('');
const projects=['Pristine Connect'];


  return (
    <div className="App">
      <NavBar></NavBar>
    <ProjectForm/>
    <FormParent/>
    </div>
  );
}

export default App;
