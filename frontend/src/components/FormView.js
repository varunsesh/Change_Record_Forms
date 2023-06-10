import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';



export class FormView extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         data:[]
      }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/")
        .then(response => {
            this.setState({data:response.data})   
        })
        .catch(error => {
            console.log(error)
        });
        
    }


  render() {
    return (
      <div>
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
               <td>None</td>
             </tr>
           ))}
            
            </tbody>
    
        </table>
 
        
    </div>

    )
  }
}


export default FormView