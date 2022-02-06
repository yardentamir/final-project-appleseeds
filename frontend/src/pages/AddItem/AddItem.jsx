import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Container } from '../../components/styles/Container.styled';
import { ProductContext } from "../../providers/product.provider";
import { headersToken } from "../../utils/functions.utils";
import myApi from "../../api/Api";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

import StepZilla from "react-stepzilla";
import "./styles/FormSteps.css";

function AddItem() {

  const { product, pictureContext, isSubmitted, setIsSubmitted } = useContext(ProductContext);
  const [newProductId, setNewProductId] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    isSubmitted && onFormSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted])


  async function onFormSubmit() {
    try {
      await addProduct();
    } catch (err) {
      console.log(err);
    }
  }

  const addProduct = async () => {
    try {
      if (token) product.user = token;
      const { data } = await myApi.post("/products/addProduct", product, headersToken(token));
      setNewProductId(data._id)
      setIsSubmitted(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addPicture = useCallback(async () => {
    try {
      const data = new FormData();
      data.append("product", pictureContext);
      isSubmitted && await myApi.post(`/products/me/uploadProductImg/${newProductId}`, data, headersToken(token));
      console.log("did it!")
    } catch (error) {
      console.log(error.response.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictureContext, newProductId, token])

  useEffect(() => {
    async function avatar() {
      await addPicture()
    }
    token && avatar();
  }, [addPicture, token])

  const steps =
    [
      { name: 'Description', component: <Step1 /> },
      { name: 'Location', component: <Step2 /> },
      { name: 'Image', component: <Step3 /> },
    ];

  // render the progress bar
  return (
    <Container>
      <div className='step-progress add-item-main'>
        <StepZilla steps={steps} prevBtnOnLastStep={false} />
      </div>
    </Container>
  );
}

export default AddItem;