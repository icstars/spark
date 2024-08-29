// SearchBar.js
import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search people..."
                value={searchQuery}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;
