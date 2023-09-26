import React, { Component, useState, useEffect } from 'react';
import api from './api';
import FormSubmit from './FormSubmit';
import DropdownMenu from "./Dropdown";
import PopupCard from './PopupCard';
import "../styles.css";

export class FormView extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         formSubmitted:false,
         data:[],
         selectedItemValue:"", 
         isPopupVisible: false, // State to control the visibility of the pop-up card
         selectedRowData: null, // Store data for the selected row

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

    updateStatus = (id, menuItem)=>{
      
      console.log(`Look who's here id = ${id}; menuItem=${menuItem}`);
      api.post("/update", {"id":id, "status":menuItem}, {
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

    // Function to show the pop-up card when a row is clicked
  showPopup = (rowData) => {
    this.setState({
      isPopupVisible: true,
      selectedRowData: rowData,
    });
  };

  // Function to hide the pop-up card
  hidePopup = () => {
    this.setState({
      isPopupVisible: false,
      selectedRowData: null,
    });
  };
     
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
             <tr key={item.id} className="highlighted-row" onClick={()=>this.showPopup(item)}>
               <td>{item.id}</td>
               <td>{item.username}</td>
               <td>{item.title}</td>
               <td>{item.date}</td>
               {/* <td>None</td> */}
               {/* <td><button onClick={()=>this.updateStatus(item.id)}>Update</button></td> */}
               
               {/* <td><button onClick={()=>this.viewSummary(item.id)}>View</button></td> */}
               <td>{item.status}</td>
               <td><DropdownMenu onChange={(menuItem)=>this.updateStatus(item.id, menuItem)} /></td>
               <td><button onClick={()=>this.deleteRecord(item.id)}>Delete</button></td>
               
             </tr>
           ))}
            
            </tbody>
    
        </table>
        {this.state.isPopupVisible && (
        <div className="popup-overlay" onClick={this.hidePopup}>
          <div className="popup-card">
            {/* <button onClick={this.hidePopup}>Close</button> */}
            <PopupCard data={this.state.selectedRowData} onClose={this.hidePopup} />
          </div>
        </div>
        )}
        
    </div>

    )
  }
}


export default FormView