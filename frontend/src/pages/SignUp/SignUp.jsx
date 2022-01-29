import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/styles/Container.styled';
import SignUpBanner from "../../components/Banner";
import "./style.css";

function SignUp() {

  return (
    <Container>
      <div className="wrapper">
        <div className="left">
          <div className="sign-up-form">
            <h1>Sign up to Your Brand</h1>

            <form action="">
              <div className="form-group">
                <label htmlFor="">Name Surname</label>
                <input type="input" placeholder="Name Surname" />
              </div>
              <div className="form-group">
                <label htmlFor="">E-mail</label>
                <input type="email" placeholder="@mail.com" />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="password" placeholder="password" />

              </div>
              <div className="form-group">
                <button>SIGN UP</button>
              </div>
              <div className="create-aacount">
                Already registered? <Link to="/SignIn"> Sign In</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <SignUpBanner />
        </div>
      </div>
    </Container>
  );
}

export default SignUp;