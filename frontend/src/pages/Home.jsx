import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/styles/Container.styled';
import { FlexAround } from '../components/styles/Flex.styled';
import foundDog from "../images/found-dog.png"
import lostDog from "../images/PikPng.com_pet-png_2063773.png"
import lostProducts from "../images/PikPng.com_lost-logo-png_4473839.png"
import "./styles/Home.css";


function Home() {

  return (
    <div className="full-page">
      <header className="header-of-home-page">
        <Container>
          <img src={lostProducts} alt="keys" className="keys-img" width="10%" height="100px" /><h1>Welcome to lost & founds</h1>
          <h3>Every one know the feeling of lost but most importantly we know the feeling to give back</h3>
        </Container>
      </header>
      <section className="slanted-div">
        <Container>
          <FlexAround>
            <div>
              <p>Omg! I Lost my dog!</p>
              <img src={lostDog} alt="keys" className="keys-img" />
              <Link to="/SearchProducts"><button>search for it here</button></Link>
            </div>
            <div>
              <p>Omg! I found someones dog!</p>
              <img src={foundDog} alt="keys" className="keys-img" />
              <Link to="/AddProduct"><button>add product here</button></Link>
            </div>
          </FlexAround>
        </Container>
      </section>
    </div>
  );
}

export default Home;