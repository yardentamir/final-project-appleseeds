import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import myApi from "../api/Api";
import SignUpBanner from "../components/Banner";
import FromGroup from "../components/FormGroup";
import Modal from "../components/Modal";
import { GlobalContext } from '../providers/global.provider';
import "./styles/Sign.css";

import { INPUT_ATTRIBUTES } from '../constants/signs.constants';
import { headersToken } from "../utils/functions.utils";

function UpdateUser() {

  const [currentUserBody, setCurrentUserBody] = useState({});
  const [newUserBody, setNewUserBody] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(GlobalContext);
  const imageUploadRef = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await myApi.get("/users/me", headersToken(token));
        setCurrentUserBody(data);

        const { name, email } = data;
        setNewUserBody({ name, email });
      } catch (error) {
        console.log(error.message);
      }
    }
    token && getUser();
  }, [token]);

  const changeAvatar = async () => {
    try {
      const data = new FormData();
      data.append("avatar", avatar);
      await myApi.post("/users/me/uploadAvatar", data, headersToken(token));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      await myApi.put("/users/me/updateUser", newUserBody, headersToken(token));
      setIsUpdated(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      await updateUser();
      image && await changeAvatar();

      window.location.reload(true);

    } catch (err) {
      console.log(err);
    }
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


  const logout = async () => {
    try {
      await myApi.post('/users/logout', { data: {} }, headersToken(token));
      setUser('');
      localStorage.setItem('token', '');
      navigate("/SignIn");
    } catch (err) {
      console.log(err);
    }
  }

  const logoutAll = async () => {
    try {
      await myApi.post('/users/logoutAll', { data: {} }, headersToken(token));
      setUser('');
      localStorage.setItem('token', '');
      navigate("/SignIn");
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = ({ target: { name, value } }) => {
    setNewUserBody({ ...newUserBody, [name]: value });
    console.log(name, value)
  }

  const renderInputs = () => INPUT_ATTRIBUTES.map(inputAttr => {
    return <FromGroup key={inputAttr.id} {...inputAttr} defaultValue={currentUserBody[inputAttr.id]} onChange={handleInputChange} />
  })

  return (
    <Modal condition={isUpdated} onClick={() => setIsUpdated(false)} title="Congratulations" text="You updated your profile successfully!">
      <div className="wrapper">
        <div className="left">
          <div className="sign-up-form">
            <h2>Update Your Account</h2>
            <form onSubmit={onSubmit}>
              {renderInputs()}
              <input type="file" ref={imageUploadRef} className="hidden-upload-file" accept="image/png, image/jpeg" onChange={avatarUpload} />
              <div id="profile" onClick={() => imageUploadRef.current.click()} style={{ backgroundImage: "url(" + image + ")" }}>
                <div className="dashes"></div>
                <label className={image && "hasImage"}>Click to browse an avatar image</label>
              </div>
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
    </Modal>
  );
}

export default UpdateUser;