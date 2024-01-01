import React, { Component, useState, useEffect } from 'react'
import ChangeRecordForm  from './ChangeRecordForm';
import ChangeRecordsTable from './ChangeRecordsTable';


function FormParent ({selectedProjectID}) {
  const [projectID, setProjectID] = useState(null);

  useEffect(()=>{
    console.log("Form Parent data");
    console.log(selectedProjectID);
  }, [selectedProjectID])

    return (
      <div>
        <ChangeRecordForm pid={selectedProjectID} />
        <ChangeRecordsTable pid={selectedProjectID}/>
    </div>
    )
  
}

export default FormParent;