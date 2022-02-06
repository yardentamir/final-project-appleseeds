import React, { useState, useRef, useEffect, useContext, forwardRef } from 'react';
import { ProductContext } from "../../../providers/product.provider";
import "../styles/FormSteps.css";


const Step3 = forwardRef(({ jumpToStep }, ref) => {

  const [image, setImage] = useState("");
  const [picture, setPicture] = useState("");
  const imageUploadRef = useRef(null);
  const { setPictureContext, setIsSubmitted } = useContext(ProductContext);


  useEffect(() => {
    setPictureContext(picture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picture])


  const fileUpload = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const file = e.target.files[0]; // e.target.files -> returns Array of Objects.
    fileReader.onload = ({ target: { result } }) => {
      setImage(result)
    }
    setPicture(file);
  };

  return (
    <>
      <div className="center">
        <input type="file" ref={imageUploadRef} className="hidden-upload-file" accept="image/png, image/jpeg" onChange={fileUpload} />
        <div id="profile" onClick={() => imageUploadRef.current.click()} style={{ backgroundImage: "url(" + image + ")" }}>
          <div className="dashes"></div>
          <label className={image && "hasImage"}>Click to browse the item</label>
        </div>
      </div>
      <div className="footer-buttons">
        <button onClick={() => jumpToStep(1)}>Pervious</button>
        <button onClick={() => setIsSubmitted(true)}>Submit</button>
      </div>
    </>
  );
});

export default Step3;