import React, { Component } from 'react'
import ChangeRecordForm  from './ChangeRecordForm';
import ChangeRecordsTable from './ChangeRecordsTable';


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
        <ChangeRecordForm data={this.props} onFormSubmit={this.handleSubmit}/>
        {/* <ChangeRecordsTable formSubmitted={this.state.formSubmitted}/> */}
    </div>
    )
  }
}

export default FormParent;