import React, { Component, useState, useEffect } from 'react'; 
import FormView from './FormView';
import api from './api'
import CustomRichTextEditor from './CustomRichTextEditor';
import { Stores, addData, getStoreData, initDB } from '../DbStores/models.ts';
import "../styles.css";


export class FormSubmit extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        username:"",
        title:"",
        summaryContent:"",
        reload:false,
        editMode:false
      }    

    }

    

    handleChange = (e)=>{
        this.setState({
        [e.target.name] : e.target.value
      
      })
            
    }

    handleEditorContentChange = (content) => {
      console.log("Content from handleEditorContentChange:", content);
      this.setState({ summaryContent: content }, ()=>{console.log(content)});
    };


    handleSubmit = (e)=>{
      e.preventDefault();
      console.log("Summary Content from handleSubmit:", this.state.summaryContent);
      // Now you have the editor content and embedded images as base64 strings
      // You can include them in the formData as needed
      
      const formData = {
        summary: this.state.summaryContent,
        username: this.state.username,
        title: this.state.title
        // Add other form fields here if necessary
      };
      
      try {
        const res =  addData(Stores.Users, formData);
        if(res){setTimeout(()=>{
          window.location.reload(); 
       },1000);};

      } catch (err) {
        console.log(err);
      }
      finally{
        this.setState({reload:true})
      }

      
  }
  
   
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <label>Requester<br/>
        <input name="username" type="text" value = {this.state.username} onChange={(e)=>this.handleChange(e)} ></input>
        </label>
        <br /><br />
        <label>Title<br/>
        {/* <textarea name="title" cols="50" rows="5" value={this.state.title} onChange={(e)=>this.handleChange(e)}></textarea> */}
        <input className="inputField" name="title"  value={this.state.title} onChange={(e)=>this.handleChange(e)}></input>
        </label><br /><br />
        <label>Summary
        <br />
        {/* <textarea name="summary" cols="50" rows="20" value={this.state.summary} onChange={(e)=>this.handleChange(e)}>
        </textarea> */}
        <CustomRichTextEditor data={this.editMode} onContentChange={this.handleEditorContentChange} value={this.state.summaryContent} />
        </label><br/><br/>
        <input className='button button1' type="submit"></input>
        
    </form>
    )
  }
}

export default FormSubmit