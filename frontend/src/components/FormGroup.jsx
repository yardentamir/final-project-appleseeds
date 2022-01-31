import React from 'react';

function FormGroup({ text, callback, name, type }) {
  return (
    <div className="form-group">
      <label htmlFor={text}>{text}</label>
      <input id={text} type={type} placeholder={text} name={name} onChange={callback} required />
    </div>
  );
}

export default FormGroup;