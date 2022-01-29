
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { Navbar, MenuLink, Logo, Hamburger, Menu, Avatar } from './styles/Header.styled';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken } = useContext(UserContext);


  return (
    <header>
      <Navbar>
        {
          userToken ?
            <Link to="/SignIn"><Avatar>Sign In</Avatar></Link> :
            <Link to="/SignOut"><Avatar>Logged</Avatar></Link>
        }
        <Logo>
          Yad<span>1000</span>
        </Logo>
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu isOpen={isOpen}>
          <Link to="/"><MenuLink>Home</MenuLink></Link>
          <Link to="/SignIn"><span>name</span></Link>
        </Menu>
      </Navbar>
    </header>
  );
}

export default Header;
