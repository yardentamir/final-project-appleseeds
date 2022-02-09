import { useEffect, useContext, forwardRef, useImperativeHandle, useRef } from 'react';
import { FlexNoWrap } from "../../../components/styles/Flex.styled";
import { ButtonToggle } from "../../../components/ToggleButton";
import Select from "../../../components/Select";
import { ProductContext } from "../../../providers/product.provider";
import { ITEM_TYPES, ITEM_TITLES } from "../../../constants/addItem.constants";
import "../styles/FormSteps.css";

const Step1 = forwardRef(({ jumpToStep }, ref) => {

  const { setProduct, product } = useContext(ProductContext);
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
  );
});

export default Step1;