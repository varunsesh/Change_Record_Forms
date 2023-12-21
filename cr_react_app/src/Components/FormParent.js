import React, { Component } from 'react'
import FormSubmit  from './FormSubmit';
import FormView from './FormView';


export class FormParent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         formSubmitted:false
      }
    }

    handleSubmit = (e)=>{
        this.setState(prevState=>(
            {formSubmitted:!prevState.formSubmitted}
        ), ()=>{console.log`state = ${this.state.formSubmitted}`})
        const res = e.target.result;
        console.log(`result from parent = ${res}`);
    }

  render() {
    return (
      <div>
        <FormSubmit onFormSubmit={this.handleSubmit}/>
        <FormView formSubmitted={this.state.formSubmitted}/>
    </div>
    )
  }
}

export default FormParent;