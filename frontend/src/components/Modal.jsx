

import React from 'react';
import { ModalStyled } from './styles/Modal.styled';

function Modal({ condition, onClick, title, children, text }) {
  return (
    <ModalStyled>
      {children}
      <div className={`modal__overlay ${condition ? '' : "hidden"}`}></div>
      <div
        role="dialog"
        aria-labelledby="dialog header"
        aria-modal="true"
        className={`modal__wrapper ${condition ? '' : "hidden"}`}
      >
        <div className="modal__header">
          <h2>{title}</h2>
          <button aria-label="Close modal" className="modal__close" onClick={onClick}>
            <p>&times;</p>
          </button>
        </div>
        <p>
          {text}
        </p>
        <p style={{ fontSize: `14px` }}>
          You can close it by clicking on the{" "}
          <strong>&times;</strong> button.</p>
      </div>
    </ModalStyled>
  );
}

export default Modal;
