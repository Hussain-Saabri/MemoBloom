import React, { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";  // Search icon
import { IoMdClose } from "react-icons/io";           // Close (X) icon

const SearchBar = ({setSearchQuery}) => {
  const [value, setValue] = useState("");  // Yeh input ka text rakhta hai

  const handleInputChange = (e) => {
    console.log("Searching the value");
    setValue(e.target.value);
    console.log("searchbar:",value);
    setSearchQuery(e.target.value);  // Jab user type kare, value update ho jaye
  };  

  const handleSearch = () => {
     // Search karne par alert dikhao
    console.log("Clicked on search");
  };

  const onClearSearch = () => {
    setValue("") ;
    setSearchQuery("");
    // Sab text clear kar do
  };

  return (
    <div className="relative flex items-center w-full px-4 py-2 rounded-full bg-white/80 border border-blue-200 shadow-inner backdrop-blur-md transition-all duration-300 hover:shadow-lg">
  
  <input
    type="text"
    placeholder="Search Notes"
    className="flex-1 bg-transparent placeholder-slate-500 text-sm font-medium outline-none"
    value={value}
    onChange={handleInputChange}
  />

  {/* Clear icon */}
  {value && (
    <IoMdClose
      className="absolute right-10 text-slate-400 hover:text-red-600 cursor-pointer text-base"
      onClick={onClearSearch}
    />
  )}

  {/* Search icon */}
  <FaMagnifyingGlass
    className="text-slate-600 hover:text-black cursor-pointer ml-2 text-sm"
    onClick={handleSearch}
  />
</div>

  );
};

export default SearchBar;
