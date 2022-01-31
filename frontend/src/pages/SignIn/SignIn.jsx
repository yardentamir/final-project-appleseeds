import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LogInBanner from "../../components/Banner";
import { UserContext } from '../../context/user';
import myApi from "../../api/Api";
import "./style.css"

function SignIn() {

  const [loginDetails, setLoginDetails] = useState({});
  const { userToken, setUserToken } = useContext(UserContext);

  const handleInputChange = ({ target: { name, value } }) => {
    setLoginDetails({ ...loginDetails, [name]: value });
  }

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data: { token } } = await myApi.post('/users/login', loginDetails);
      setUserToken(token);
    } catch (err) {
      console.log(err);
    }
  }

  const logout = async () => {
    try {
      await myApi.post('/users/logout', { data: {} }, {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${userToken}`
        }
      });
      setUserToken('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="wrapper">
      <div className="left">
        <div className="sign-in-form">
          <h1>Sign in to Find Me</h1>

          <form>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" placeholder="@mail.com" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input type="password" placeholder="password" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <button onClick={login}>SIGN IN</button>
            </div>
            <div className="create-aacount">
              Not registered yet? <Link to="/SignUp"> Create an Account</Link>
            </div>
          </form>
        </div>
      </div>
      <LogInBanner />
    </div>

  );
}

export default SignIn;