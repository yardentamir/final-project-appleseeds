
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import "./styles/Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedNavItem, setSelectedNavItem] = useState('Home');
  const { userToken } = useContext(UserContext);


  return (
    <header className="header">
      <p className="header__logo">Find Me</p>

      <ion-icon name="menu-outline" onClick={() => setIsOpen(!isOpen)} class="header__toggle" id="nav-toggle"></ion-icon>

      <nav className={`nav ${isOpen ? "show" : ""}`} id="nav-menu">
        <div className="nav__content bd-grid">

          <ion-icon name="close-outline" onClick={() => setIsOpen(false)} class="nav__close" id="nav-close"></ion-icon>

          {
            userToken ?
              <>
                <div className="nav__perfil">
                  <div className="nav__img">
                    <img src="assets/img/perfil.png" alt="" />
                  </div>

                  <div>
                    <a href="#" className="nav__name">iilhamriz</a>
                  </div>
                </div>
              </>
              :
              <>
                <div className="nav__perfil">
                  <div className="nav__img">
                    <p></p>
                  </div>

                  <div>
                    <Link to="/SignIn" className="nav__name">Sign In</Link>
                  </div>
                </div>
              </>

          }

          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item"><Link to="/" className="nav__link active">Home</Link></li>
              <li className="nav__item"><a href="#" className="nav__link">About</a></li>
              <li className="nav__item"><a href="#" className="nav__link">Skills</a></li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;
