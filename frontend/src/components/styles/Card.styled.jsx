import styled from "styled-components";

export const CardStyled = styled.div`
height: auto;
border-radius: 1.5rem;
padding: 1.5rem;
overflow: hidden;
position: relative;
background-color: var(--color-light-gray);

.card-img-holder{
  width: 100%;
  height: auto;
}

.card-img-holder img{
  height: auto;
  object-fit: cover;
  border-radius: 1.5rem;
}

.lost-found-title{
  color: #22215B;
  padding: 0.5rem 0;
  font-size: 1rem;
  text-align: center;
  position:absolute;
  top: -20px;
  left:0;
  width:100px;
  background-color: ${({ title }) => title === "lost" ? "#FFCCCB" : "lightgreen"};
  border-radius: 0 0 20px 0;
}

.description{
  padding: 0.5rem 0;
  color: #22215B80;
  font-size: 1rem;
}

.lost-found-time{
  font-size: 1.2rem;
  color: #22215B;
}

.options{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
}

a {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-p);
  color: var(--color-white);
  border: 0;
  padding: 0.75rem;
  width: 100%;
  border-radius: 6px;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
a:hover {
  background-color: var(--color-dark);
}

.options span{
  font-weight: 600;
  color: #22215B;
}

.card-btn{
  font-weight: 400;
  max-width:100px
}

.modal__close {
  background: none;
  border: none;
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  transition: transform 0.4s ease;
  padding: 0;
  width: auto;
}
.modal__close p {
  background-color: red;
  font-size: 3rem;
  font-weight: 900;
  background-image: linear-gradient(
    45deg,
    var(--color-dark),
    var(--first-color),
    var(--color-dark)
  );
  background-size: 100%;
  background-repeat: repeat;
  margin: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.modal__close:hover {
  transform: rotate(90deg);
  background-color: transparent;
}

`;