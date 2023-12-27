import {React, useEffect, useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';



const HomePage = (props) => {

 const [createForm, setCreateForm] = useState(false);


    const handleClick = ()=>{
        props.setPjt(true);
        console.log("Clicked here");
    }

    const newForm = ()=>{
      setCreateForm(true);
      console.log("new form");
      console.log(props);
    }

  return (
    <div>
        <br />
        <br />
        <br />
        <br />
        <h1>Change Record Application</h1>
        <div>
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
            Choose Project
          </Dropdown.Toggle>
               <Dropdown.Menu>
            <Dropdown.Item onClick={handleClick}>Pristine Connect</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        <br />
        <Button onClick={newForm}> + Create New Form</Button>
    </div>
  )
}

export default HomePage