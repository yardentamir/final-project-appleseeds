import React from 'react';
import { SearchBarStyled } from './styles/SearchBar.styled';

function SearchBar({ onChange, onClick }) {
  return (
    <SearchBarStyled>
      <div className="search-wrap search-wrap-6">
        <div className="search-box">
          <input type="text" className="input" placeholder="search..." onChange={onChange} />
          <div className="search-btn" onClick={onClick}>
            <p>Search</p>
          </div>
        </div>
      </div>
    </SearchBarStyled>
  );
}

export default SearchBar;