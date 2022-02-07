import React from 'react';
import { Container } from '../../components/styles/Container.styled';

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

import StepZilla from "react-stepzilla";
import "./styles/FormSteps.css";

function AddItem() {

  const steps =
    [
      { name: 'Description', component: <Step1 /> },
      { name: 'Location', component: <Step2 /> },
      { name: 'Image', component: <Step3 /> },
    ];

  return (
    <Container>
      <div className='step-progress add-item-main'>
        <StepZilla steps={steps} prevBtnOnLastStep={false} />
      </div>
    </Container>
  );
}

export default AddItem;