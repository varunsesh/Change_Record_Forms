import React, { Component, useState, useEffect } from 'react';
import api from './api';
import FormSubmit from './FormSubmit';
import DropdownMenu from "./Dropdown";

export class FormView extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         formSubmitted:false,
         data:[]
      }
    }

    componentDidMount(){
        api.get("/")
        .then(response => {
            this.setState({data:response.data})   
        })
        .catch(error => {
            console.log(error)
        });
    }

    componentDidUpdate(prevProps){
      console.log`prevProps.formsubmitted = ${prevProps.formSubmitted}`;
      if(this.props.formSubmitted !== prevProps.formSubmitted){
        api.get('/').then(response=>console.log(response)).catch(error=>console.log(error));
      }
      
      
      
    }
    
    deleteRecord =(id)=>{
        console.log(id);
        
        api.post("/delete", JSON.stringify({"id":id}), {
          headers:{
            'Content-Type':'application/json', 
          }
        })
        .then(response =>{
                console.log(response.data)
                api.get("/").then(response=>{this.setState({data:response.data})}).catch(err=>{console.log(err)})
        })
        .catch(error=>{
            console.log(error)
        });
      
    }

    updateStatus = (id)=>{

    }

    viewSummary = (id)=>{

    }

    options = [
      {value:"green", label:"In Production"},
      {value:"yellow", label:"Under Development"},
      {value:"red", label:"Under Review for Development"},
      {value:"grey", label:"Discarded"}
    ];
  
  handleSubmit=(props)=>{
    console.log(props);
    this.setState({formsubmitted:true});
    console.log`state updated`;
  }
    
  render() {
    return (
      <div>
        <br/><br/>
        <table>
            <thead>
            <tr>
             <th>CR_ID</th>
             <th>Name</th>
             <th>Title</th>
             <th>Date</th>
             <th>Status</th>
           </tr>
            </thead>
            <tbody>
            {this.state.data.map((item) => (
             <tr key={item.id}>
               <td>{item.id}</td>
               <td>{item.username}</td>
               <td>{item.title}</td>
               <td>{item.date}</td>
               {/* <td>None</td> */}
               {/* <td><button onClick={()=>this.updateStatus(item.id)}>Update</button></td> */}
               
               {/* <td><button onClick={()=>this.viewSummary(item.id)}>View</button></td> */}
               <td><DropdownMenu  /></td>
               <td><button onClick={()=>this.deleteRecord(item.id)}>Delete</button></td>
               
             </tr>
           ))}
            
            </tbody>
    
        </table>
        
        
    </div>

    )
  }
}


export default FormView