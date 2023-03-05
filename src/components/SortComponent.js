import React from "react";

const SortComponent = ({ handleSort }) => {
  return (
    <div className="filter-price">
      <select onChange={handleSort}>
        <option value="All">All</option>
        <option value="0-15">$0 - $15</option>
        <option value="15-30">$15 - $30</option>
        <option value="30+">$30+</option>
      </select>
    </div>
  );
};

export default SortComponent;
