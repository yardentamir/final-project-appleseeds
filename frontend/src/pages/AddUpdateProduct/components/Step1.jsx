import { useState, useEffect, useContext, forwardRef, useImperativeHandle, useRef } from 'react';
import { FlexNoWrap } from "../../../components/styles/Flex.styled";
import { ButtonToggle } from "../../../components/ToggleButton";
import Select from "../../../components/Select";
import { ProductContext } from "../../../providers/product.provider";
import { ITEM_TYPES, ITEM_TITLES } from "../../../constants/addItem.constants";
import { useNavigate } from 'react-router-dom';
import "../styles/FormSteps.css";

const Step1 = forwardRef(({ jumpToStep }, ref) => {

  const { setProduct, product } = useContext(ProductContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    isValidated() {
      if (!product.description) {
        inputRef.current.classList = "error-style";
        return false;
      } else {
        return true;
      }
    }
  }));

  useEffect(() => {
    console.log(product)
  }, [product])

  return (
    // <section className="page-modal__wrapper">
    <div className="center">
      <FlexNoWrap>
        {ITEM_TITLES.map((itemTitle) => (
          <ButtonToggle key={itemTitle} active={product.title === itemTitle} onClick={() => setProduct({ ...product, title: itemTitle })}>
            {itemTitle}
          </ButtonToggle>
        ))}
      </FlexNoWrap>
      <div>
        <label htmlFor="type">Choose a type:</label>
        <Select array={ITEM_TYPES} type="type" selected={product.type} onChange={({ target }) => setProduct({ ...product, type: target.value })} />
      </div>
      <div>
        <label htmlFor="type">Write a description:</label>
        <textarea type="text" name="description" defaultValue={product.description} placeholder="description" ref={inputRef} onChange={({ target }) => { setProduct({ ...product, description: target.value }); inputRef.current.classList = ""; }} />
      </div>
    </div>
    //   {/* <div className={`modal__overlay ${token ? 'hidden' : ""}`}></div>
    //   <div
    //     role="dialog"
    //     aria-labelledby="dialog header"
    //     aria-modal="true"
    //     className={`modal__wrapper ${token ? 'hidden' : ""}`}
    //   >
    //     <div className="modal__header">
    //       <h2>Please Authenticate</h2>
    //       <button aria-label="Close modal" className="modal__close" onClick={() => navigate('/')}>
    //         <p>&times;</p>
    //       </button>
    //     </div>
    //     <p>
    //       To post a new item, first you need to sign in/up.
    //     </p>
    //     <p style={{ fontSize: `14px` }}>
    //       You can close it by clicking on the{" "}
    //       <strong>&times;</strong> button, <strong>ESC</strong> key or clicking
    //       outside it.</p>
    //   </div>
    // </section> */}
  );
});

export default Step1;