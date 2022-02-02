import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myApi from "../api/Api";
import SignUpBanner from "../components/Banner";
import FromGroup from "../components/FormGroup";
import { UserContext } from '../providers/user.provider';
import { INPUT_ATTRIBUTES } from '../constants/signUp.constants';
import "./styles/Sign.css";


function SignUp() {

  const navigate = useNavigate();
  const [currentUserBody, setCurrentUserBody] = useState({});
  const [newUserBody, setNewUserBody] = useState({});
  const { token, setUser, setToken } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await myApi.get("/users/me", {
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
          }
        });
        setCurrentUserBody(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getUser();
  }, [token])

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await myApi.put("/users/updateUser", newUserBody);
      console.log("added user successfully")
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const logout = async () => {
    try {
      await myApi.post('/users/logout', { data: {} }, {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      setUser('');
      setToken('');
      navigate("/SignIn");
    } catch (err) {
      console.log(err);
    }
  }

  const logoutAll = async () => {
    try {
      await myApi.post('/users/logoutAll', { data: {} }, {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      setUser('');
      setToken('');
      navigate("/SignIn");
    } catch (err) {
      console.log(err);
    }
  }


  const handleInputChange = ({ target: { name, value } }) => {
    setNewUserBody({ ...newUserBody, [name]: value });
  }

  const renderInputs = () => INPUT_ATTRIBUTES.map(inputAttr => {
    return <FromGroup key={inputAttr.id} {...inputAttr} value={currentUserBody[inputAttr.id]} onChange={handleInputChange} />
  })

  return (
    <div className="wrapper">
      <div className="left">
        <div className="sign-up-form">
          <h1>Update Your Account</h1>

          <form onSubmit={updateUser}>
            {renderInputs()}
            <div className="form-group">
              <button>Update</button>
            </div>
          </form>
          <div className="form-group">
            <button className="create-aacount" onClick={logout}>Log Out</button>
          </div>
          <div className="form-group">
            <button className="create-aacount" onClick={logoutAll}>Log Out All Devices</button>
          </div>
        </div>
      </div>
      <div className="right">
        <SignUpBanner />
      </div>
    </div>
  );
}

export default SignUp;