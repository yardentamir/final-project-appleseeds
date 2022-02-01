
import { Link, NavLink } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { UserContext } from '../providers/user';
import "./styles/Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

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
                    <img src="assets/img/perfil.png" alt="" />
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
                <NavLink to="/SignIn" name="About" className="nav__link" >About</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/SignUp" name="Skills" className="nav__link" >Skills</NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;
