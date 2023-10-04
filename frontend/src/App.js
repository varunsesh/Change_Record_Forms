import logo from './logo.svg';
import './App.css';
import {Title, Forms, View} from './components/CR_Forms'
import FormSubmit from './components/FormSubmit'
import FormView from './components/FormView';
import FormParent from './components/FormParent';


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
