import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/styles/Container.styled';
import { FlexAround } from '../components/styles/Flex.styled';
import foundDog from "../images/found-dog.png"
import lostDog from "../images/PikPng.com_pet-png_2063773.png"
import lostProducts from "../images/PikPng.com_lost-logo-png_4473839.png"
import "./styles/Home.css";
import { SEARCH_PRODUCTS_PATH, ADD_PRODUCT_PATH } from "../routes/routes.constants"


function Home() {

  return (
    <div className="full-page">
      <header className="header-of-home-page">
        <Container>
          <img src={lostProducts} alt="keys" className="keys-img" width="10%" height="100px" /><h1>Welcome to lost & founds</h1>
          <h3>We know the feeling of lost, but most importantly we know the feeling of giving back</h3>
        </Container>
      </header>
      <section className="slanted-div">
        <Container div="slanted-div">
          <FlexAround div="home">
            <div>
              <img src={lostDog} alt="keys" className="keys-img" />
              <p>Lost something? <br /> Your cute dog maybe?</p>
              <Link to={SEARCH_PRODUCTS_PATH}><button className='actions-buttons'>Search for it here</button></Link>
            </div>
            <div>
              <img src={foundDog} alt="keys" className="keys-img" />
              <p>Found something? <br />A jewelry? keys? a dog?</p>
              <Link to={ADD_PRODUCT_PATH}><button className='actions-buttons'>Share the found here</button></Link>
            </div>
          </FlexAround>
        </Container>
      </section>
    </div>
  );
}

export default Home;