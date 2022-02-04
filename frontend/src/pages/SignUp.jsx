import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myApi from "../api/Api";
import { UserContext } from '../providers/user.provider';
import SignUpBanner from "../components/Banner";
import FromGroup from "../components/FormGroup";
import "./styles/Sign.css";

import { INPUT_ATTRIBUTES } from '../constants/signs.constants';
import { headersToken } from "../utils/functions.utils";


function SignUp() {

  const navigate = useNavigate();
  const { setToken, token } = useContext(UserContext);
  const [newUser, setNewUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");
  const imageUploadRef = useRef(null);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      setToken('');
      const { data: { token } } = await myApi.post("/users/addUser", newUser);
      setToken(token);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setNewUser({ ...newUser, [name]: value });
  }


  const addAvatar = useCallback(async () => {
    try {
      const data = new FormData();
      data.append("avatar", avatar);
      await myApi.post("/users/me/uploadAvatar", data, headersToken(token));
    } catch (error) {
      console.log(error);
    }

  }, [avatar, token])

  const fileUpload = (e) => {
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
      await addUser(event)
      navigate("/SignIn");
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    async function avatar() {
      await addAvatar()
    }
    if (token && avatar) avatar();
  }, [addAvatar, token, avatar])

  return (
    <div className="wrapper">
      <div className="left">
        <div className="sign-up-form">
          <h1>Sign up to Find Me</h1>
          <form onSubmit={onSubmit}>
            {renderInputs()}
            <input type="file" ref={imageUploadRef} className="hidden-upload-file" accept="image/png, image/jpeg" onChange={fileUpload} />
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