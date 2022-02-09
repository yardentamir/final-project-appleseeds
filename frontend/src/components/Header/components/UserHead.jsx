import React from 'react';
import { Link } from 'react-router-dom';

function UserHead({ children, text, link }) {
  return (
    <div className="nav__perfil">
      <div className="nav__img">
        {children}
      </div>
      <div>
        <Link to={`/${link}`}>{text}</Link>
      </div>
    </div>
  );
}

export default UserHead;