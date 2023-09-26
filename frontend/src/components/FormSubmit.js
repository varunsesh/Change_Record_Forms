import React, { Component, useState, useEffect } from 'react'; 
import FormView from './FormView';
import api from './api'
import CustomRichTextEditor from './CustomRichTextEditor';

export class FormSubmit extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        username:"",
        title:"",
        summaryContent:"",
      }    

    }

    handleChange = (e)=>{
        this.setState({
        [e.target.name] : e.target.value
      
      })
            
    }

    handleEditorContentChange = (content) => {
      console.log("Content from handleEditorContentChange:", content);
      this.setState({ summaryContent: content });
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
  

      api.post("/", formData, {
        headers:{
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    })
      .then(response =>{
        console.log(response.data)
        this.setState({username:"", title:"", summaryContent:""})
        this.props.onFormSubmit();
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
        {/* <textarea name="summary" cols="50" rows="20" value={this.state.summary} onChange={(e)=>this.handleChange(e)}>
        </textarea> */}
        <CustomRichTextEditor  onContentChange={this.handleEditorContentChange} value={this.state.summaryContent} />
        </label><br/><br/>
        <input type="submit"></input>
        
    </form>
    )
  }
}

export default FormSubmit