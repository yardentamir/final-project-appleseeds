import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myApi from "../api/Api";
import SignUpBanner from "../components/Banner";
import FromGroup from "../components/FormGroup";
import { UserContext } from '../providers/user.provider';
import "./styles/Sign.css";

import { INPUT_ATTRIBUTES } from '../constants/signs.constants';
import { headersToken } from "../utils/functions.utils";


function SignUp() {

  const [newUser, setNewUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const imageUploadRef = useRef(null);
  const { setUser } = useContext(UserContext);

  const addUser = async () => {
    const { data: { user, token } } = await myApi.post("/users/addUser", newUser);
    setUser(user);
    localStorage.setItem('token', token);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setNewUser({ ...newUser, [name]: value });
  }

  const addAvatar = async () => {
    const data = new FormData();
    data.append("avatar", avatar);
    await myApi.post("/users/me/uploadAvatar", data, headersToken(localStorage.getItem('token')));
  }

  const avatarUpload = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const file = e.target.files[0];
    fileReader.readAsDataURL(file);
    setAvatar(file)
    fileReader.onload = ({ target: { result } }) => {
      setImage(result)
    }
  };

  const renderInputs = () => INPUT_ATTRIBUTES.map(inputAttr => {
    return <FromGroup key={inputAttr.id} {...inputAttr} onChange={handleInputChange} />
  })

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      await addUser()
      image && await addAvatar();

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="wrapper">
      <div className="left">
        <div className="sign-up-form">
          <h2>Sign up to Find Me</h2>
          <form onSubmit={onSubmit}>
            {renderInputs()}
            <input type="file" ref={imageUploadRef} className="hidden-upload-file" accept="image/png, image/jpeg" onChange={avatarUpload} />
            <div id="profile" onClick={() => imageUploadRef.current.click()} style={{ backgroundImage: "url(" + image + ")" }}>
              <div className="dashes"></div>
              <label className={image && "hasImage"}>Click to browse an avatar image</label>
            </div>
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