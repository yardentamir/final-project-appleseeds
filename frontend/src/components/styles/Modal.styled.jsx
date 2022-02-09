import styled from "styled-components";

export const ModalStyled = styled.section`
.page-modal__header {
  font-size: 3rem;
  color: #464646;
  margin: 0 0 2rem;
  text-align: center;
}
.page-modal__text {
  font-size: 1.2rem;
  margin: 0 0 3rem;
  text-align: center;
}
  display: flex;
  align-items: center;
  justify-content: center;
  

.modal__overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
}
.modal__overlay.hidden {
  display: none;
}
.modal__wrapper {
  max-width: 500px;
  padding: 10px 30px;
  width: 100%;
  box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 2;
  background: whitesmoke;
  opacity: 1;
  pointer-events: auto;
  -webkit-transform: translateY(0px);
  -ms-transform: translateY(0px);
  transform: translateY(0px);
  -webkit-transition: opacity 0.2s ease, -webkit-transform 0.3s ease;
  transition: opacity 0.2s ease, -webkit-transform 0.3s ease;
  -o-transition: transform 0.3s ease, opacity 0.2s ease;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transition: transform 0.3s ease, opacity 0.2s ease,
    -webkit-transform 0.3s ease;
}
.modal__wrapper.hidden {
  opacity: 0;
  pointer-events: none;
  -webkit-transform: translateY(-50px);
  -ms-transform: translateY(-50px);
  transform: translateY(-50px);
}
.modal__header {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0;
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
  z-index: 2;
  margin-right: 10px;
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
  z-index: 3;
}
.modal__close:hover {
  transform: rotate(90deg);
  background-color: transparent;
  z-index: 3;
}


`;