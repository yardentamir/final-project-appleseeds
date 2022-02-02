import React, { useContext, useEffect } from 'react';
import "./styles/FormSteps.css";
import { ProductProvider } from "./providers/product.provider";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import { Container } from '../../components/styles/Container.styled';

function AddItem() {


  function step1Validator() {
    // return a boolean

  }

  function step2Validator() {
    // return a boolean

  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  // render the progress bar
  return (
    <Container>
      <ProductProvider>
        <StepProgressBar
          startingStep={0}
          onSubmit={onFormSubmit}
          steps={[
            {
              label: 'Description',
              name: 'step 1',
              content: <Step1 />,
              // validator: step1Validator
            },
            {
              label: 'Location',
              name: 'step 2',
              content: <Step2 />,
              // validator: step2Validator
            },
            {
              label: 'Image',
              name: 'step 3',
              content: <Step3 />,
            }
          ]}
        />
      </ProductProvider>
    </Container>
  );
}

export default AddItem;