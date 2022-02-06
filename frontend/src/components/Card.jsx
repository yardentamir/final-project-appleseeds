import React, { useEffect } from 'react';
import { CardStyled } from './styles/Card.styled';
import { Buffer } from 'buffer';
import NoImg from "../images/no-image.png";

function Card({ product: { title, type, createdAt, description, picture, phone, city } }) {

  // const handelContactClick = () => {

  //   const whatsApp = `https://api.whatsapp.com/send?phone=+972${phone}&text=`

  // }

  return (
    <CardStyled>
      <div className="card-img-holder">
        {<img src={`${picture ? `data:image/png;base64,${Buffer.from(picture).toString('base64')}` : NoImg}`} alt="lost found" />}
      </div>
      <h3 className="lost-found-title">{title}</h3>
      <span className="lost-found-time">{title} {type} in {city}</span>
      <p className="description">{description}</p>
      <p className="description">{title === "lost" ? "Give back the item" : "Get back the item"}</p>
      <div className="options">
        {/* <button className="card-btn" onClick={handelContactClick}>Contact</button> */}
        <span>{`${new Date(createdAt).getDate()}/${new Date(createdAt).getMonth() + 1}/${new Date(createdAt).getFullYear()}`}</span>
      </div>
    </CardStyled>
  );
}

export default Card;