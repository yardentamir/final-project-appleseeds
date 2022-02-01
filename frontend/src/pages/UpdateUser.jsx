import React, { useState, useContext, } from 'react';
import { useNavigate } from 'react-router-dom';
import myApi from "../api/Api";
import SignUpBanner from "../components/Banner";
import FromGroup from "../components/FormGroup";
import { UserContext } from '../providers/user';
import "./styles/Sign.css";


function SignUp() {

  const navigate = useNavigate();
  const [newUserDetails, setNewUserDetails] = useState({});
  const { token, setUser, setToken } = useContext(UserContext);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await myApi.put("/users/addUser", newUserDetails);
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
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = ({ target: { name, value } }) => {
    setNewUserDetails({ ...newUserDetails, [name]: value });
  }

  const renderInputs = () => {
    const keys = [{ name: "name", type: "text" }, { name: "email", type: "email" }, { name: "password", type: "password" }];
    return keys.map(item => {
      return <FromGroup key={item.name} text={item.name} name={item.name} type={item.type} callback={handleInputChange} />
    })
  }

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