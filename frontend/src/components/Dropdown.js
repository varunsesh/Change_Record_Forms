import React, { useState } from 'react';
import Select from 'react-select';

function DropdownMenu({ onItemSelected }) {
  const [selectedItem, setSelectedItem] = useState(null);


  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.color, // Set the background color based on the "color" property
    }),
    singleValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.color, // Set the background color for the selected value
        fontWeight: 'bold',
      }),
      
  };
  
  const menuItems = [
    { value: 'Item1', label: 'In Production', color:'green' },
    { value: 'Item2', label: 'Under Dev', color:'orange' },
    { value: 'Item3', label: 'Under Review for Dev', color:'red' },
  ];

  return (
    <div className="dropdown-container">
      <Select options={menuItems} placeholder="Select an Item" styles={customStyles} />
    </div>
  );
}

export default DropdownMenu;
