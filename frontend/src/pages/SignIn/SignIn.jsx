import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LogInBanner from "../../components/Banner";
import { UserContext } from '../../context/user';
import { Container } from '../../components/styles/Container.styled';
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
    <Container>
      <div className="wrapper">
        <div className="left">
          <div className="left-inner">

            <div className="sign-in-form">
              <h1>Sign in to Your Brand</h1>

              <form>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" placeholder="@mail.com" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={handleInputChange} />
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
        </div>
        <div className="right">
          <LogInBanner />
        </div>
      </div>

    </Container>
  );
}

export default SignIn;