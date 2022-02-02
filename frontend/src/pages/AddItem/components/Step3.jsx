import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProductContext } from "../providers/product.provider";
import "../styles/FormSteps.css";


function Step1() {

  const [image, setImage] = useState("");
  const [productFile, setProductFile] = useState("");
  const imageUploadRef = useRef(null);
  const { setProduct, product } = useContext(ProductContext);


  useEffect(() => {
    setProduct({ ...product, productFile });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productFile])


  useEffect(() => {
    console.log(product)
  }, [product])

  const fileUpload = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const file = e.target.files[0]; // e.target.files -> returns Array of Objects.
    fileReader.readAsDataURL(file);
    fileReader.onload = ({ target: { result } }) => {
      setImage(result)
    }
    setProductFile(file);
    console.log(image)
  };

  return (
    <div className="add-item-main">
      <input type="file" ref={imageUploadRef} id="mediaFile" accept="image/png, image/jpeg" onChange={fileUpload} />
      <div id="profile" onClick={() => imageUploadRef.current.click()} style={{ backgroundImage: "url(" + image + ")" }}>
        <div className="dashes"></div>
        <label className={image && "hasImage"}>Click to browse the item</label>
      </div>
    </div>
  );
}

export default Step1;