import { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { headersToken } from "../../utils/functions.utils";
import { Container } from '../../components/styles/Container.styled';
import { ProductContext } from "../../providers/product.provider";
import { ITEM_TITLES } from "../../constants/addItem.constants";
import myApi from "../../api/Api";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

import StepZilla from "react-stepzilla";
import "./styles/FormSteps.css";

function AddUpdateProduct() {

  const { setProduct, product } = useContext(ProductContext);
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {

    setProduct({ ...product, type: 'keys', description: "", title: ITEM_TITLES[0], city: "אבו גוש", phone: "" });

    if (pathname === "/AddProduct") return;

    const getProduct = async () => {
      const { data } = await myApi.get(`/products/loadProductById/${id}`, headersToken(localStorage.getItem('token')));
      setProduct(data);
    }

    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default AddUpdateProduct;