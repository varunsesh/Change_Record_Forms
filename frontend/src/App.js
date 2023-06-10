import logo from './logo.svg';
import './App.css';
import {Title, Forms, View} from './components/CR_Forms'
import FormSubmit from './components/FormSubmit'
import FormView from './components/FormView';

function App() {
  return (
    <div className="App">
      <Title />
      <FormSubmit/>
      <br /><br />
      <center><FormView /></center>
      
    </div>
  );
}

export default App;
