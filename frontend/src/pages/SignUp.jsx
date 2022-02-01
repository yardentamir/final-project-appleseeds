import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from "../api/Api";
import SignUpBanner from "../components/Banner";
import FromGroup from "../components/FormGroup"
import "./styles/Sign.css";


function SignUp() {

  const [newUser, setNewUser] = useState({});

  const AddUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await myApi.post("/users/addUser", newUser);
      if (data) console.log("added user successfully")
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setNewUser({ ...newUser, [name]: value });
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
          <h1>Sign up to Find Me</h1>

          <form onSubmit={AddUser}>
            {renderInputs()}
            <div className="form-group">
              <button>SIGN UP</button>
            </div>
            <div className="create-aacount">
              Already registered? <Link to="/SignIn">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="right">
        <SignUpBanner />
      </div>
    </div>
  );
}

export default SignUp;