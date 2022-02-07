import { useState, useEffect, useContext, forwardRef, useImperativeHandle, useRef } from 'react';
import "../styles/FormSteps.css";
import Select from "../../../components/Select";
import axios from "axios";
import { ProductContext } from "../../../providers/product.provider";


const Step2 = forwardRef(({ jumpToStep }, ref) => {

  const [cities, setCities] = useState("");
  const [city, setCity] = useState("אבו גוש");
  const [phone, setPhone] = useState("");
  const { setProduct, product } = useContext(ProductContext);
  const inputRef = useRef();

  useEffect(() => {
    const getCities = async () => {
      const { data } = await axios.get("https://raw.githubusercontent.com/GabMic/israeli-cities-and-streets-list/master/israel_cities_names_and__geometric_data.json");
      const arrayOfCities = [].concat.apply([], data.map(item => item.name));
      setCities(arrayOfCities);
    }
    getCities();
  }, []);

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

  useEffect(() => {
    setProduct({ ...product, city, phone });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, phone])

  return (
    <div className="center">
      <div>
        <label htmlFor="type">Choose location:</label>
        {cities && <Select array={cities} type="cities" onChange={({ target }) => setCity(target.value)} />}
      </div>
      <div>
        <label htmlFor="type">Write your phone number:</label>
        <input type="tel" name="phone" ref={inputRef} placeholder="phone number" pattern="[0-9]" required onChange={({ target }) => { setPhone(target.value); inputRef.current.classList = ""; }} />
      </div>
    </div>
  );

});

export default Step2;