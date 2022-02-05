import { useState, useEffect, useContext, forwardRef, useImperativeHandle, useRef } from 'react';
import { FlexNoWrap } from "../../../components/styles/Flex.styled";
import "../styles/FormSteps.css";
import { ButtonToggle } from "../../../components/ToggleButton";
import Select from "../../../components/Select";
import { ProductContext } from "../../../providers/product.provider";
import { ITEM_TYPES, ITEM_TITLES } from "../../../constants/addItem.constants";

const Step1 = forwardRef(({ jumpToStep }, ref) => {
  const [title, setTitle] = useState(ITEM_TITLES[0]);
  const [type, setType] = useState('keys');
  const [description, setDescription] = useState('');
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
    setProduct({ ...product, type, description, title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, description, title]);



  return (
    <div className="center">
      <FlexNoWrap>
        {ITEM_TITLES.map((itemTitle) => (
          <ButtonToggle key={itemTitle} active={title === itemTitle} onClick={() => setTitle(itemTitle)}>
            {itemTitle}
          </ButtonToggle>
        ))}
      </FlexNoWrap>
      <div>
        <label htmlFor="type">Choose a type:</label>
        <Select array={ITEM_TYPES} type="type" onChange={({ target }) => setType(target.value)} />
      </div>
      <div>
        <label htmlFor="type">Write a description:</label>
        <textarea type="text" name="description" placeholder="description" ref={inputRef} onChange={({ target }) => { setDescription(target.value); inputRef.current.classList = ""; }} />
      </div>
    </div>
  );
});

export default Step1;