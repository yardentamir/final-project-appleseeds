import React, { useContext, useEffect, useCallback } from 'react';
import { Container } from '../../components/styles/Container.styled';
import { ProductContext } from "../../providers/product.provider";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import "./styles/FormSteps.css";

function AddItem() {

  const { product, picture } = useContext(ProductContext);

  // useEffect(() => {
  //   // console.log(product);
  //     step1Validator(product);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [product])

  const step1Validator = async () => {
    console.log("no usefeect", product);
    return product?.description !== ""
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  function step2Validator() {
    // return a boolean
    console.log("p2", product);
    return true;
  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  // render the progress bar
  return (
    <Container>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: 'Description',
            name: 'step 1',
            content: <Step1 />,
            validator: step1Validator
          },
          {
            label: 'Location',
            name: 'step 2',
            content: <Step2 />,
            validator: step2Validator
          },
          {
            label: 'Image',
            name: 'step 3',
            content: <Step3 />,
          }
        ]}
      />
    </Container>
  );
}

export default AddItem;