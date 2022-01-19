import React from "react";

function Search({handleFilter}) {

  function onHandleFilter(e){
    handleFilter(e.target.value)
  }


  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={onHandleFilter}
      />
    </div>
  );
}

export default Search;
