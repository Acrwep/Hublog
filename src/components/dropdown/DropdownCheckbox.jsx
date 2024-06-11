import React, { useState, useEffect, useRef } from 'react';

const DropdownWithCheckboxes = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    const updatedOptions = [...selectedOptions];
    const index = updatedOptions.indexOf(option);
    if (index === -1) {
      updatedOptions.push(option);
    } else {
      updatedOptions.splice(index, 1);
    }
    onChange(updatedOptions);
  };

  const handleSelectAll = () => {
    onChange(options);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        placeholder="All Team"
        className="w-full p-2 border rounded focus:outline-none"
        onClick={toggleDropdown}
        readOnly
      />
      {isOpen && (
        <div className="absolute z-10 top-full left-0 w-full bg-white border rounded shadow-md">
          <div className="p-1 flex justify-between">
            <button className="block w-full p-1 text-[14px] text-left" onClick={handleSelectAll}>
              Select All
            </button>
            <button className="block w-full p-1 text-[14px] text-left" onClick={handleClearAll}>
              Clear
            </button>
          </div>
          <div className="border-t">
            {options.map((option) => (
              <label key={option} className="block p-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;
