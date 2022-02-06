import React, { useState, useEffect } from 'react';
import { Container } from '../components/styles/Container.styled';
import { FlexAround } from '../components/styles/Flex.styled';
import keysImage from "../images/pngwing.com.png";
import "./styles/Home.css";


function Home() {

  return (
    <div className="full-page">
      <header className="header-of-home-page">
        <Container>
          <h1>Welcome to the community found lost item</h1>
          <h3>Every one know the feeling of lost but most importantly we know the feeling to give back</h3>
        </Container>
      </header>
      <section className="slanted-div">
        <Container>
          <FlexAround>
            <div>
              <p>Omg! Lost my keys!</p>
              <img src={keysImage} alt="keys" className="keys-img" />
              <input type="button" value="search here" />
            </div>
            <div>
              <p>Omg! found keys!</p>
              <img src={keysImage} alt="keys" className="keys-img" />
              <input type="button" value="add item here" />
            </div>
          </FlexAround>
        </Container>
      </section>
    </div>
  );
}

export default Home;