import React, { useState } from 'react';
import { Container } from '../components/styles/Container.styled';
import FormSteps from "../components/FormSteps";

function AddItem() {

  return (
    <Container>
      <h1>add item</h1>
      <FormSteps />
    </Container>
  );
}

export default AddItem;