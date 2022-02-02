
import { Link, NavLink } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../providers/user.provider';
import myApi from "../api/Api";
import "./styles/Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token } = useContext(UserContext);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const { data } = await myApi.get("/users/me/avatar", {
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
          }
        }
        );
        setAvatar(data);
      } catch (err) {
        console.log(err)
      }
    }
    token && loadAvatar();
  }, [token])

  return (
    <header className="header">
      <p className="header__logo">Find Me</p>

      <ion-icon name="menu-outline" onClick={() => setIsOpen(!isOpen)} class="header__toggle" id="nav-toggle"></ion-icon>

      <nav className={`nav ${isOpen ? "show" : ""}`} id="nav-menu">
        <div className="nav__content bd-grid">

          <ion-icon name="close-outline" onClick={() => setIsOpen(false)} class="nav__close" id="nav-close"></ion-icon>

          {
            user ?
              <>
                <div className="nav__perfil">
                  <div className="nav__img">
                    <img src={avatar && `data:image/png;base64,${avatar}`} alt="avatar" />
                  </div>

                  <div>
                    <Link to="/UpdateUser">{user.name}</Link>
                  </div>
                </div>
              </>
              :
              <>
                <div className="nav__perfil">
                  <div className="nav__img">
                  </div>

                  <div>
                    <Link to="/SignIn" className="nav__name">Sign In</Link>
                  </div>
                </div>
              </>

          }

          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink to="/" name="Home" className={`nav__link`}>Home</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/AddItem" name="About" className="nav__link">Add Item</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/SearchItems" name="Skills" className="nav__link" >Search Items</NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;
