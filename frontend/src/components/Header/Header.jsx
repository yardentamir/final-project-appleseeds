
import { NavLink } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../providers/global.provider';
import { NAVLINK_NAMES } from "../../constants/signs.constants";
import { headersToken } from "../../utils/functions.utils";
import UserHead from "./components/UserHead";
import myApi from "../../api/Api";
import "../styles/Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState('');

  const { user, setUser } = useContext(GlobalContext);

  useEffect(() => {

    async function getUser() {
      const token = localStorage.getItem('token');
      const { data } = await myApi.get("/users/me", headersToken(token));
      setUser(data);
    }

    async function loadAvatar() {
      const token = localStorage.getItem('token');
      const { data } = await myApi.get("/users/me/avatar", headersToken(token));
      setAvatar(data);
    }

    try {
      if (!localStorage.getItem('token')) return;
      const invokeUser = async () => {
        await getUser();
        await loadAvatar();
      }
      invokeUser();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('token')]);


  const renderNavLinks = () => {
    return NAVLINK_NAMES.map(item => <li key={item.name} className="nav__item">
      <NavLink to={item.route} className={`nav__link`}>{item.name}</NavLink>
    </li>)
  }


  return (
    <header className="header">
      <p className="header__logo">Find Me</p>
      <ion-icon name="menu-outline" onClick={() => setIsOpen(!isOpen)} class="header__toggle" id="nav-toggle"></ion-icon>
      <nav className={`nav ${isOpen ? "show" : ""}`} id="nav-menu">
        <div className="nav__content bd-grid">
          <ion-icon name="close-outline" onClick={() => setIsOpen(false)} class="nav__close" id="nav-close"></ion-icon>
          {
            user ?
              <UserHead text={user.name} link={"UpdateUser"}>{avatar && <img src={`data:image/png;base64,${avatar}`} alt="avatar" />}</UserHead>
              :
              <UserHead text="Sign In" link={"SignIn"} />
          }
          <div className="nav__menu">
            <ul className="nav__list">
              {renderNavLinks()}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
