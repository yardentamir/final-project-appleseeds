import React, { useState, useRef, useContext, forwardRef, useEffect } from 'react';
import { ProductContext } from "../../../providers/product.provider";
import { headersToken } from "../../../utils/functions.utils";
import Modal from "../../../components/Modal";
import myApi from "../../../api/Api";
import "../styles/FormSteps.css";


const Step3 = forwardRef(({ jumpToStep }, ref) => {

  const [image, setImage] = useState("");
  const [picture, setPicture] = useState("");
  const [newProductId, setNewProductId] = useState("");

  const { product } = useContext(ProductContext);
  const imageUploadRef = useRef(null);
  const token = localStorage.getItem('token');


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

  async function onFormSubmit() {
    try {
      setNewProductId('');
      await addProduct();

    } catch (err) {
      console.log(err);
    }
  }

  const addProduct = async () => {
    if (token) product.user = token;
    const { data } = await myApi.post("/products/addProduct", product, headersToken(token));
    setNewProductId(data._id)
  };

  const addPicture = async () => {
    try {
      const data = new FormData();
      data.append("product", picture);
      await myApi.post(`/products/me/uploadProductImg/${newProductId}`, data, headersToken(token));
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
  }, [newProductId])

  return (
    <Modal condition={newProductId} onClick={() => setNewProductId('')} title="Congratulations" text="You created your post successfully!">
      <div className="center">
        <input type="file" ref={imageUploadRef} className="hidden-upload-file" accept="image/png, image/jpeg" onChange={fileUpload} />
        <div id="profile" onClick={() => imageUploadRef.current.click()} style={{ backgroundImage: "url(" + image + ")" }}>
          <div className="dashes"></div>
          <label className={image && "hasImage"}>Click to browse the item</label>
        </div>
      </div>
      <div className="footer-buttons">
        <button onClick={() => jumpToStep(1)}>Pervious</button>
        <button onClick={onFormSubmit}>Submit</button>
      </div>
    </Modal>
  );
});

export default Step3;