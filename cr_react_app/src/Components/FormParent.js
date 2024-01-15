import React, { Component, useState, useEffect } from 'react'
import ChangeRecordForm  from './ChangeRecordForm';
import ChangeRecordsTable from './ChangeRecordsTable';
import { getProjects } from '../DbStores/models_new'; // Import functions from models.js


function FormParent ({selectedProjectID}) {
  const [pjt, setPjt] = useState(null);

  useEffect(()=>{
    
    const fetchProjects = async () => {
      try {
         const projects = await getProjects();
         setPjt(projects[selectedProjectID-1].project_name);
      
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    
    fetchProjects();
    console.log("Form Parent data");
    console.log(selectedProjectID);
    
  }, [selectedProjectID, pjt])

    return (
      <div>
        <ChangeRecordForm pid={selectedProjectID} pjtName={pjt} />
        <ChangeRecordsTable pid={selectedProjectID}/>
    </div>
    )
  
}

export default FormParent;