import React, { useState } from 'react';
import Select from 'react-select';

function DropdownMenu(props) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedItem(selectedOption);
    props.onItemSelected(selectedOption.value);
  };

  const menuItems = [
    { value: 'Prod', label: 'In Production', color: 'green' },
    { value: 'Dev', label: 'Under Dev', color: 'orange' },
    { value: 'Review', label: 'Under Review for Dev', color: 'red' },
  ];

  return (
    <Select
      options={menuItems}
      onChange={handleChange}
      value={selectedItem}
    />
  );
}

export default DropdownMenu;
