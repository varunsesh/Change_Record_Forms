import React, { Component, useState, useEffect } from 'react'; 
import axios from 'axios';
import FormView from './FormView';

export class FormSubmit extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        username:"",
        title:"",
        summary:"",         
      }    

    }

    handleChange = (e)=>{
      this.setState({
        [e.target.name] : e.target.value
      
      })
            
    }


    handleSubmit = (e)=>{
      e.preventDefault();
     
      const data = JSON.stringify(this.state)
      console.log(data)
      axios.post("http://localhost:5000/", data, {
        headers:{
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    })
      .then(response =>{
        console.log(response.data)
        this.setState({username:"", title:"", summary:""})
      })
      .catch(error=>{
        console.log(error)
      })
      
    }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <label>Username<br/>
        <input name="username" type="text" value = {this.state.username} onChange={(e)=>this.handleChange(e)} ></input>
        </label>
        <br /><br />
        <label>Title<br/>
        <textarea name="title" cols="50" rows="5" value={this.state.title} onChange={(e)=>this.handleChange(e)}></textarea>
        </label><br /><br />
        <label>Summary
        <br />
        <textarea name="summary" cols="50" rows="20" value={this.state.summary} onChange={(e)=>this.handleChange(e)}>
        </textarea>
        </label><br/><br/>
        <input type="submit"></input>
        
    </form>
    )
  }
}

export default FormSubmit