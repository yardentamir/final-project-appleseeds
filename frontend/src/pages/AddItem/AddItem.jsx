import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from '../../providers/user.provider';
import { Container } from '../../components/styles/Container.styled';
import { ProductContext } from "../../providers/product.provider";
import { headersToken } from "../../utils/functions.utils";
import myApi from "../../api/Api";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import "./styles/FormSteps.css";

function AddItem() {

  const { product, pictureContext } = useContext(ProductContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    console.log(product);
  }, [product])

  const step1Validator = () => {
    console.log(product);
    return Object.keys(product).length > 0;
  }

  function step2Validator() {
    return true;
  }

  async function onFormSubmit() {
    console.log("submit", product, pictureContext);
    try {
      await addProduct();
    } catch (err) {
      console.log(err);
    }
  }

  const addProduct = async () => {
    try {
      if (token) product.user = token;
      const { data } = await myApi.post("/products/addProduct", product);
      console.log(data)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addPicture = useCallback(async () => {
    try {
      const data = new FormData();
      data.append("product", pictureContext);
      await myApi.post("/users/me/uploadAvatar", data, headersToken(token));
    } catch (error) {
      console.log(error);
    }

  }, [pictureContext, token])

  useEffect(() => {
    async function avatar() {
      await addPicture()
    }
    token && avatar();
  }, [addPicture, token])

  const steps = [
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
  ]

  // render the progress bar
  return (
    <Container>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={steps}
      />
    </Container>
  );
}

export default AddItem;