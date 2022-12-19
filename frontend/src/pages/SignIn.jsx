import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogInBanner from "../components/Banner";
import { GlobalContext } from '../providers/global.provider';
import myApi from "../api/Api";
import "./styles/Sign.css";
import { HOME_PATH, SIGN_UP_PATH } from '../routes/routes.constants';

function SignIn() {

  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({});
  const { setUser } = useContext(GlobalContext);

  const handleInputChange = ({ target: { name, value } }) => {
    setLoginDetails({ ...loginDetails, [name]: value });
  }

  const login = async () => {
    try {
      const { data: { user, token } } = await myApi.post('/users/login', loginDetails);
      setUser(user);
      localStorage.setItem('token', token);
      navigate(HOME_PATH);
    } catch (err) {
      console.log(err);
    }
  }

  const loginWithAnonymousUser = async () => {
    try {
      const anonymousUser = { email: "anonymous@gmail.com", password: "123456789", name: "anonymous" }
      const { data: { user, token } } = await myApi.post('/users/login', anonymousUser);
      setUser(user);
      localStorage.setItem('token', token);
      navigate(HOME_PATH);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="wrapper">
      <div className="left">
        <div className="sign-in-form">
          <h2>Sign in to Find Me</h2>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" name="email" placeholder="@mail.com" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" placeholder="password" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <button onClick={login}>SIGN IN</button>
          </div>
          <div className="form-group">
            <button onClick={loginWithAnonymousUser}>SIGN IN ANONYMOUSLY</button>
          </div>
          <div className="create-aacount">
            Not registered yet? <Link to={SIGN_UP_PATH}> Create an Account</Link>
          </div>
        </div>
      </div>
      <div className="right">
        <LogInBanner />
      </div>
    </div>

  );
}

export default SignIn;