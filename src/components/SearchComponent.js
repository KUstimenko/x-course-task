import React, { useState } from "react";

const SearchComponent = ({ handleSearch, handleClear }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  };

  const handleClick = () => {
    setSearchText("");
    handleClear();
  };

  return (
    <div className="search__content">
      <form action="#" className="search__form">
        <input
          type="text"
          className="search__input"
          placeholder="Search by book title"
          value={searchText}
          onChange={handleChange}
        />
        <div className="search__buttons">
          {searchText && (
            <button type="button" className="clear__btn" onClick={handleClick}>
              <i className="fa-solid fa-close"></i>
            </button>
          )}
          <button type="button" className="search__btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
