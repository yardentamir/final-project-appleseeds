import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogInBanner from "../components/Banner";
import { UserContext } from '../providers/user';
import myApi from "../api/Api";
import "./styles/Sign.css";

function SignIn() {

  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({});
  const { setUser, setToken } = useContext(UserContext);

  const handleInputChange = ({ target: { name, value } }) => {
    setLoginDetails({ ...loginDetails, [name]: value });
  }

  const login = async (e) => {
    e.preventDefault();
    try {
      console.log(loginDetails)
      const { data: { user, token } } = await myApi.post('/users/login', loginDetails);
      setUser(user);
      setToken(token);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="wrapper">
      <div className="left">
        <div className="sign-in-form">
          <h1>Sign in to Find Me</h1>

          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" name="email" placeholder="@mail.com" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" placeholder="password" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <button>SIGN IN</button>
            </div>
            <div className="create-aacount">
              Not registered yet? <Link to="/SignUp"> Create an Account</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="right">
        <LogInBanner />
      </div>
    </div>

  );
}

export default SignIn;