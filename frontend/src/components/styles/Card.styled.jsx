import styled from "styled-components";

export const CardStyled = styled.div`
width: 25rem;
height: auto;
border-radius: 1.5rem;
padding: 1.5rem;
overflow: hidden;
position: relative;
background-color: var(--color-light-gray);

.card-img-holder{
  width: 100%;
  height: auto;
  position: relative;
}

.card-img-holder img{
  width: 100%;
  height: auto;
  max-height: 15rem;
  object-fit: cover;
  border-radius: 1.5rem;
}

.lost-found-title{
  color: #22215B;
  padding: 1rem 0;
  font-size: 1.5rem;
  text-align: center;
    background-color: var(--color-mid-gray);
    border-radius: 15px;
    color: white
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

`;