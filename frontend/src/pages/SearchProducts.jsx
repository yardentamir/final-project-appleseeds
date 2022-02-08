import React, { useState, useEffect, useContext } from 'react';
import { Container } from '../components/styles/Container.styled';
import { FlexLeft } from '../components/styles/Flex.styled';
import Select from "../components/Select";
import { ITEM_TYPES, ITEM_TITLES } from "../constants/addItem.constants";
import { GlobalContext } from '../providers/global.provider';
import SearchBar from '../components/SearchBar';
import Spinner from "../components/Spinner";
import Card from '../components/Card';
import myApi from "../api/Api";
import "./styles/SearchProducts.css";

function SearchProducts() {

  const [allProducts, setAllProducts] = useState([]);
  const [searchedProducts, setSearchProducts] = useState([]);
  const [type, setType] = useState("all");
  const [title, setTitle] = useState("all");
  const [city, setCity] = useState("all");
  const [inputVal, setInputVal] = useState("");

  const { cities } = useContext(GlobalContext);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await myApi.get("/products/loadProducts");
        setAllProducts(data);
      } catch (err) {
        console.log(err)
      }
    }
    getAllProducts();
  }, [])

  const renderProducts = () => {
    return allProducts.map((product) => {
      return <Card key={product._id} product={product} />
    })
  }
  const renderSearchedProducts = () => {
    return searchedProducts.map((product) => {
      return <Card key={product._id} product={product} />
    })
  }

  const handleInput = ({ target: { value } }) => {
    setInputVal(value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {

      const startWithInputVal = new RegExp(`^${inputVal}.*$`);
      const newProducts = allProducts.filter(product => {
        const { title, description, type, city } = product
        return [title, description, type, city].some(value => startWithInputVal.test(value.trim(" ")))
      })
      console.log(newProducts);
      setSearchProducts(newProducts)

    }, 100)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVal])

  const searchInDB = async () => {

    const newProducts = allProducts.filter(product => {
      const { title: productTitle, type: productType, city: productCity } = product
      return [productTitle, productType, productCity].some(value => {
        return value === type || value === title || value === city;
      })

    })
    console.log(newProducts);
    setSearchProducts(newProducts)
  }
  const freeSeachInDB = async () => {
    const { data: products } = await myApi.get(`/products/search/${inputVal}`)
    console.log(products);
  }
  console.log(inputVal);
  return (
    <Container>
      <div className="parent-search">
        <div className="search-bar-container">
          <SearchBar value={inputVal} onChange={handleInput} onClick={searchInDB} />
        </div>
        <div className="filters-container">
          <h3>Filters</h3>
          <div>
            <label htmlFor="title">Title</label>
            <Select array={["all", ...ITEM_TITLES]} type="title" onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <Select array={["all", ...ITEM_TYPES]} type="type" onChange={({ target }) => setType(target.value)} />
          </div>
          <div>
            <label htmlFor="city">City</label>
            {cities && <Select array={["all", ...cities]} type="city" onChange={({ target }) => setCity(target.value)} />}
          </div>
        </div>
        <div className="products-container">
          <FlexLeft>
            {searchedProducts.length ? renderSearchedProducts() : allProducts.length ? renderProducts() : <Spinner />}
          </FlexLeft>
        </div>
      </div>
    </Container>
  );
}

export default SearchProducts;