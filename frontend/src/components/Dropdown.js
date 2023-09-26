import React, { useState } from 'react';
import Select from 'react-select';
import './../styles.css'

function DropdownMenu(props, { onItemSelected }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: state.isFocused ? '0 0 0 1px #0366d6' : 'none',
    }),
    menu: (provided) => ({
      ...provided,
      display: isMenuOpen ? 'block' : 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.color, // Set the background color based on the "color" property
    }),
    singleValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.color, // Set the background color for the selected value
      fontWeight: 'bold', // Apply bold font weight to the selected value
    }),
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu when the dropdown is clicked
  };

  const handleChange = (selectedItem) => {
    // Perform any local handling of the selected item if needed
    console.log('Selected item:', selectedItem);
  
    // Call the parent's onChange function with the selected value
    props.onChange(selectedItem.value);
  };
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsMenuOpen(false);
  };



  const menuItems = [
    { value: 'Prod', label: 'In Production', color:'green' },
    { value: 'Dev', label: 'Under Dev', color:'orange' },
    { value: 'Review', label: 'Under Review for Dev', color:'red' },
  ];

  return (
    <div className="dropdown-container">
      <div className="down-arrow" onClick={toggleMenu}></div>
      {isMenuOpen && (
        <Select
          options={menuItems}
          styles={customStyles}
          autoFocus
          onBlur={() => setIsMenuOpen(false)}
          onChange={handleChange} // Close the menu when clicking outside
        />
      )}
    </div>
  );
}

export default DropdownMenu;
