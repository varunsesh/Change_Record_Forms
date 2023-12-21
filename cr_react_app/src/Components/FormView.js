import React, { Component, useState, useEffect } from 'react';
import api from './api';
import DropdownMenu from "./Dropdown";
import PopupCard from './PopupCard';
import "../styles.css";
import { initDB, Stores, getStoreData, deleteData, updateStatusData, addData, updateStoreData } from '../DbStores/models.ts';
import {saveAs} from 'file-saver';
import CustomRichTextEditor from './CustomRichTextEditor.js';


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
         setIsDBReady: false, 
         isEditorShow: false, 
         
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
      deleteData(Stores.Users, id)
      window.location.reload();
      
      
    }

    updateStatus = (id, menuItem)=>{
      if(updateStatusData(id, Stores.Users, menuItem)){
        setTimeout(()=>{
          window.location.reload(); 
       },1000)}
            

    }

    editRecord = (item)=>{
      this.showEditor(item);
    }

  //Function to show rich text editor with data when edit is clicked
  showEditor=(data)=>{
    this.setState({
      isEditorShow:true,
      selectedRowData: data,
    })
  }

  handleEditorContentChange = (content, id) => {
    console.log(content);
    console.log(id); 
    var data = {
      "id":id, 
      "name":this.state.selectedRowData.username,
      "summary":content,
      "title": this.state.selectedRowData.title,
      "status":this.state.selectedRowData.status,
    }
    console.log(data);
    this.setState({selectedRowData:data});
  };

  updateRecord = (data)=>{
    console.log(data);
    if(updateStoreData(data.id, Stores.Users, data.summary)){
      setTimeout(()=>{
        window.location.reload(); 
     },1000)}

  }
  
  hideEditor=(data)=>{
    console.log("On update...");
    this.setState({
      isEditorShow:false, 
    })
    this.updateRecord(this.state.selectedRowData);
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

  exportDB = ()=>{
    console.log(`exporting entire DB`);
    const users = getStoreData(Stores.Users);
   
    users.then((e)=>{
      const result = JSON.stringify(e);
      const download = new Blob([result], {type: 'text/plain;charset=utf-8'});
      saveAs(download, "db.json");
    });
  }

  importDB = (e)=>{
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const importData = JSON.parse(e.target.result);
      for (let dat in importData){
        addData(Stores.Users, importData[dat]).then((e)=>{ this.setState((prevState) => ({data: [...prevState.data, e]}));});
      }
     
    };
  


  }
    
  render() {
    return (
      <div>
        <br/><br/>
        <button className=' button button1' type='button' onClick={this.exportDB}>Export</button>
        <input type="file" className='button button1' onChange={this.importDB} Import/>
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
               <td><div><button className='button button0' onClick={()=>this.deleteRecord(item.id)}>Delete</button>
               <button className='button button0' onClick={()=>this.editRecord(item)}>Edit</button>
               </div></td>
             </tr>
           ))}
            
            </tbody>
    
        </table>
        {this.state.isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-card">
            <PopupCard data={this.state.selectedRowData} onClose={this.hidePopup} />
          </div>
        </div>
        )}
         {this.state.isEditorShow && (
        <div className="popup-overlay">
          <div className="popup-card">
            <CustomRichTextEditor data={this.state.selectedRowData} onContentChange={this.handleEditorContentChange} editMode={this.state.isEditorShow} onClose={this.hideEditor} />
          </div>
        </div>
        )}        
    </div>

    )
  }
}


export default FormView