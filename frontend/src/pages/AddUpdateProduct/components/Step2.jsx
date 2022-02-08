import { useContext, forwardRef, useImperativeHandle, useRef } from 'react';
import "../styles/FormSteps.css";
import Select from "../../../components/Select";
import { GlobalContext } from '../../../providers/global.provider';
import { ProductContext } from "../../../providers/product.provider";

const Step2 = forwardRef(({ jumpToStep }, ref) => {

  const { setProduct, product } = useContext(ProductContext);
  const { cities } = useContext(GlobalContext);
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    isValidated() {
      if (isNaN(product.phone) || product.phone.length < 8) {
        inputRef.current.classList = "error-style";
        return false;
      } else {
        return true;
      }
    }
  }));

  return (
    <div className="center">
      <div>
        <label htmlFor="type">Choose location:</label>
        {cities && <Select array={cities} type="cities" onChange={({ target }) => setProduct({ ...product, city: target.value })} selected={product.city} />}
      </div>
      <div>
        <label htmlFor="type">Write your phone number:</label>
        <input type="tel" name="phone" ref={inputRef} defaultValue={product.phone} placeholder="phone number" pattern="[0-9]" required onChange={({ target }) => { setProduct({ ...product, phone: target.value }); inputRef.current.classList = ""; }} />
      </div>
    </div>
  );

});

export default Step2;