import logo from './logo.svg';
import './App.css';
import {Title, Forms, View} from './Components/CR_Forms'
import FormParent from './Components/FormParent';



function App() {
  return (
    <div className="App">
      <Title />
      <br />
      <center><FormParent /></center>
    
    </div>
  );
}

export default App;
