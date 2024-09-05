import React from 'react';

const SearchBox = ({ onSearch, isDisabled,searchBoxRef }) => (
    <input
        type="text"
        className={`search-box ${isDisabled ? 'disabled' : ''}`}
        placeholder="Search Places"
        onKeyDown={onSearch}
        ref={searchBoxRef}
        disabled={isDisabled}
    />
);

export default SearchBox;
