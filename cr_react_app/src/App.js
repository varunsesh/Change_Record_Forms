import logo from './logo.svg';
import './App.css';
import {Title} from './Components/TitleManager'
import FormParent from './Components/FormParent';
import BasicExample from './Components/CustomNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import { useState } from 'react';


function App() {
  const [pjt, setPjt] = useState(false);



  return (
    <div className="App">
      {/* <BasicExample setPjt={setPjt}/>
      {(!pjt) &&
      <HomePage setPjt={setPjt}/>
      } */}
      <br />
      {/* {(pjt)&& */}
      <center><FormParent /></center>
      {/* } */}
    </div>
  );
}

export default App;
