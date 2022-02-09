import React, { useState, useRef, useContext, forwardRef, useEffect } from 'react';
import { ProductContext } from "../../../providers/product.provider";
import { headersToken } from "../../../utils/functions.utils";
import { useLocation, useParams } from 'react-router-dom';
import Modal from "../../../components/Modal";
import ImageUpload from "../../../components/ImageUpload";
import myApi from "../../../api/Api";
import { Buffer } from 'buffer';
import "../styles/FormSteps.css";


const Step3 = forwardRef(({ jumpToStep }, ref) => {

  const [image, setImage] = useState("");
  const [picture, setPicture] = useState("");
  const [newProductId, setNewProductId] = useState("");

  const { product } = useContext(ProductContext);
  const imageUploadRef = useRef(null);
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const { pathname } = useLocation();


  const fileUpload = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const file = e.target.files[0];
    fileReader.readAsDataURL(file);
    fileReader.onload = ({ target: { result } }) => {
      setImage(result)
    }
    setPicture(file);
  };

  useEffect(() => {
    if (!product.picture) return;

    const img = Buffer.from(product.picture).toString("base64");
    setImage(img)

    // const file = new File(product.picture.data, "oneLogo.png", {
    //   type: "image/png",
    // });
    // console.log(file)

    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(file);
    // fileReader.onload = ({ target: { result } }) => {
    //   console.log(result)
    //   setImage(result)
    // }
    // setPicture(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onFormSubmit() {
    try {
      if (pathname === "/AddProduct") {
        setNewProductId('');
        await addProduct();
      } else {
        setNewProductId(id);
        await updateProduct();
      }

    } catch (err) {
      console.log(err);
    }
  }

  const updateProduct = async () => {
    if (pathname !== "/AddProduct") {
      delete product.picture;
      delete product.createdAt;
      delete product.updatedAt;
      delete product.__v;
      delete product._id;
    }
    await myApi.put(`/products/updateProduct/${id}`, product, headersToken(token));
  }

  const addProduct = async () => {
    if (token) product.user = token;
    if (pathname !== "/AddProduct") {
      delete product.picture;
      delete product.createdAt;
      delete product.updatedAt;
      delete product.__v;
      delete product._id;
    }
    const { data } = await myApi.post("/products/addProduct", product, headersToken(token));
    setNewProductId(data._id)
  };

  const addPicture = async () => {
    try {
      const data = new FormData();
      data.append("product", picture);
      await myApi.post(`/products/uploadProductImg/${newProductId}`, data, headersToken(token));
    } catch (error) {
      console.log(error.response.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    async function invokeAddPicture() {
      await addPicture()
    }
    newProductId && image && invokeAddPicture();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProductId]);


  return (
    <Modal condition={newProductId} onClick={() => setNewProductId('')} title="Congratulations" text="You created your post successfully!">
      <div className="center">
        <ImageUpload imageUploadRef={imageUploadRef} onChange={fileUpload} image={image} />
      </div>
      <div className="footer-buttons">
        <button onClick={() => jumpToStep(1)}>Pervious</button>
        <button onClick={onFormSubmit}>Submit</button>
      </div>
    </Modal>
  );
});

export default Step3;