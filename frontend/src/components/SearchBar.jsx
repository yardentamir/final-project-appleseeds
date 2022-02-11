import React from 'react';
import { SearchBarStyled } from './styles/SearchBar.styled';

function SearchBar({ value, onChange }) {
  return (
    <SearchBarStyled>
      <div className="search-wrap search-wrap-6">
        <div className="search-box">
          <input type="text" className="input" placeholder="search..." value={value} onChange={onChange} />
        </div>
      </div>
    </SearchBarStyled>
  );
}

export default SearchBar;