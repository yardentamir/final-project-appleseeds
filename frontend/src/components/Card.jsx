import React from 'react';
import { CardStyled } from './styles/Card.styled';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import NoImg from "../images/no-image.png";

function Card({ product: { title, type, createdAt, description, picture, phone, city }, onClick, id }) {

  return (
    <CardStyled>
      {id && <button aria-label="Close modal" className="modal__close" onClick={onClick}>
        <p id={id}>&times;</p>
      </button>}
      <div className="card-img-holder">
        {<img src={`${picture ? `data:image/png;base64,${Buffer.from(picture).toString('base64')}` : NoImg}`} alt="lost found" />}
      </div>
      <h3 className="lost-found-title">{title}</h3>
      <span className="lost-found-time">{title} {type} in {city}</span>
      <p className="description">{description}</p>
      <p className="description">{title === "lost" ? "Give back the item" : "Get back the item"}</p>
      <div className="options">
        {id ? <Link className="card-btn" to={`/UpdateProduct/${id}`}>Update</Link> : <a className="card-btn" target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?phone=+972${phone.slice(1)}&text=Hi,%20I%20${title}%20${title === "lost" ? "my" : "your"}%20${type}!`}>Contact</a>}

        <span>{`${new Date(createdAt).getDate()}/${new Date(createdAt).getMonth() + 1}/${new Date(createdAt).getFullYear()}`}</span>
      </div>
    </CardStyled>
  );
}

export default Card;