import React, { useState } from 'react';
import { Container } from '../components/styles/Container.styled';
import "./styles/SearchItems.css"

function SearchItems() {

  return (
    <Container>
      <div className="search_wrap search_wrap_6">
        <div className="search_box">
          <input type="text" className="input" placeholder="search..." />
          <div className="btn">
            <p>Search</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SearchItems;