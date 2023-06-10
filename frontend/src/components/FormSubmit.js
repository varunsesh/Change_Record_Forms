import React, { Component, useState, useEffect } from 'react'; 
import axios from 'axios';

export class FormSubmit extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        username:"",
        title:"",
        summary:"",         
      }
    }

  render() {
    return (
        <form >
        <label>Username<br/>
        <input type="text" ></input>
        </label>
        <br /><br />
        <label>Title<br/>
        <textarea name="title" cols="50" rows="5" ></textarea>
        </label><br /><br />
        <label>Summary
        <br />
        <textarea name="summary" cols="50" rows="20" value="Enter text...">
            
        </textarea>
        </label><br/><br/>
        <input type="submit"></input>
        
    </form>
    )
  }
}

export default FormSubmit