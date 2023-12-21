import {React, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';



const HomePage = (props) => {


    const handleClick = ()=>{
        props.setPjt(true);
        console.log("Clicked here");
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
            <Dropdown.Item href="#/action-1" onClick={handleClick}>Pristine Connect</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        <br />
        <Button>+ Create New Form</Button>
    </div>
  )
}

export default HomePage