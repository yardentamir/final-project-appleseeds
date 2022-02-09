import React from 'react';

function FormGroupInput({ name, ...attributes }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <input {...attributes} name={name} placeholder={name} />
    </div>
  );
}

export default FormGroupInput;