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

    handleSubmit = ()=>{
        this.setState(prevState=>(
            {formSubmitted:!prevState.formSubmitted}
        ), ()=>{console.log`state = ${this.state.formSubmitted}`})
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