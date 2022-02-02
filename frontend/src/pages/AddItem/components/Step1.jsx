import React, { useState, useEffect, useContext } from 'react';
import { FlexNoWrap } from "../../../components/styles/Flex.styled";
import "../styles/FormSteps.css";
import { ButtonToggle } from "../../../components/ToggleButton";
import Select from "../../../components/Select";
import { ProductContext } from "../providers/product.provider";
import { ITEM_TYPES, ITEM_TITLES } from "../../../constants/addItem.constants";


function Step1() {
  const [active, setActive] = useState(ITEM_TITLES[0]);
  const [type, setType] = useState('keys');
  const [description, setDescription] = useState('');
  const { setProduct, product } = useContext(ProductContext);


  useEffect(() => {
    setProduct({ ...product, type, description, active });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, description, active])


  return (
    <div className="add-item-main">
      <FlexNoWrap>
        {ITEM_TITLES.map((title) => (
          <ButtonToggle key={title} active={active === title} onClick={() => setActive(title)}>
            {title}
          </ButtonToggle>
        ))}
      </FlexNoWrap>
      <div>
        <label htmlFor="type">Choose a type:</label>
        <Select array={ITEM_TYPES} type="type" onChange={({ target }) => setType(target.value)} />
      </div>
      <div>
        <label htmlFor="type">Write a description:</label>
        <textarea type="text" name="description" placeholder="description" onChange={({ target }) => setDescription(target.value)} />
      </div>
    </div>
  );
}

export default Step1;