import React from 'react';

function FormGroup({ name, ...attributes }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <input {...attributes} name={name} placeholder={name} />
    </div>
  );
}

export default FormGroup;