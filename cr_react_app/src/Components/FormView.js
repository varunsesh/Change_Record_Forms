import React, { Component, useState, useEffect } from 'react';
import api from './api';
import FormSubmit from './FormSubmit';
import DropdownMenu from "./Dropdown";
import PopupCard from './PopupCard';
import "../styles.css";
import { initDB, Stores, getStoreData, deleteData, updateStatusData } from '../DbStores/models.ts';

export class FormView extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         formSubmitted:false,
         data:[],
         selectedItemValue:"", 
         isPopupVisible: false, // State to control the visibility of the pop-up card
         selectedRowData: null, // Store data for the selected row, 
         isDBReady: false, 
         setIsDBReady: false 
      }
    }

    componentDidMount(){
      //Intialise db
      const status = initDB();
      console.log(status);
      this.setState({setIsDBReady:status.response});

      const users = getStoreData(Stores.Users);
      users.then((e)=>{this.setState({data:e})});
      
      
    }

    componentDidUpdate(prevProps){
      const status = initDB();
      const users = getStoreData(Stores.Users);
      console.log`prevProps.formsubmitted = ${prevProps.formSubmitted}`;
      if(this.props.formSubmitted !== prevProps.formSubmitted){
        api.get('/').then(response=>console.log(response)).catch(error=>console.log(error));
      }
      
      
      
    }
    
    deleteRecord =(id)=>{
      console.log(id);
      deleteData(Stores.Users, id);
      window.location.reload();
      
    }

    updateStatus = (id, menuItem)=>{
      updateStatusData(id, Stores.Users, menuItem);      

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
        <table className="nice-table">
            <thead>
            <tr>
             <th>CR_ID</th>
             <th>Name</th>
             <th>Title</th>
             {/* <th>Date</th> */}
             <th>Status</th>
             <th>Select Status</th>
             <th>Actions</th>
           </tr>
            </thead>
            <tbody>
            {this.state.data.map((item) => (
             <tr key={item.id}>
               
               <td><div className="row-clickable" onClick={() => this.showPopup(item)}>{item.id}</div></td>
               <td><div className="row-clickable" onClick={() => this.showPopup(item)}>{item.username}</div></td>
               <td><div className="row-clickable" onClick={() => this.showPopup(item)}>{item.title}</div></td>
               
               <td><div className="row-clickable" onClick={() => this.showPopup(item)}>{item.status}</div></td>
               <td><DropdownMenu onItemSelected={(menuItem)=>this.updateStatus(item.id, menuItem)}/> </td>
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