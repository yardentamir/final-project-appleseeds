
import { Link, NavLink } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../providers/user.provider';
import { headersToken } from "../utils/functions.utils";
import myApi from "../api/Api";
import "./styles/Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState('');
  const tokenLocal = localStorage.getItem('token');


  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const { data } = await myApi.get("/users/me/avatar", headersToken(tokenLocal));
        setAvatar(data);
      } catch (err) {
        console.log(err)
      }
    }
    const getUser = async () => {
      try {
        const { data } = await myApi.get("/users/me", headersToken(tokenLocal));
        setUser(data);
      } catch (err) {
        console.log(err)
      }
    }
    tokenLocal && getUser();
    tokenLocal && loadAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenLocal])

  return (
    <header className="header">
      <p className="header__logo">Find Me</p>
      <ion-icon name="menu-outline" onClick={() => setIsOpen(!isOpen)} class="header__toggle" id="nav-toggle"></ion-icon>
      <nav className={`nav ${isOpen ? "show" : ""}`} id="nav-menu">
        <div className="nav__content bd-grid">
          <ion-icon name="close-outline" onClick={() => setIsOpen(false)} class="nav__close" id="nav-close"></ion-icon>
          {
            user ?
              <div className="nav__perfil">
                <div className="nav__img">
                  {avatar && <img src={`data:image/png;base64,${avatar}`} alt="avatar" />}
                </div>
                <div>
                  <Link to="/UpdateUser">{user.name}</Link>
                </div>
              </div>
              :
              <div className="nav__perfil">
                <div className="nav__img">
                </div>
                <div>
                  <Link to="/SignIn" className="nav__name">Sign In</Link>
                </div>
              </div>
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
