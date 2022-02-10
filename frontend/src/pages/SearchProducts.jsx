import React, { useState, useEffect } from 'react';
import { Container } from '../components/styles/Container.styled';
import { FlexLeft } from '../components/styles/Flex.styled';
import Select from "../components/Select";
import { FILTERS_ARRAY } from "../constants/search.constants"
import SearchBar from '../components/SearchBar';
import Spinner from "../components/Spinner";
import Card from '../components/Card';
import myApi from "../api/Api";
import "./styles/SearchProducts.css";

function SearchProducts() {

  const [allProducts, setAllProducts] = useState([]);
  const [searchedProducts, setSearchProducts] = useState([]);
  const [filtersTypes, setFilterTypes] = useState({ type: "all", title: "all", city: "all" });
  const [inputVal, setInputVal] = useState("");

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
  }, [inputVal]);

  const filtersSearchInDB = async ({ target: { name, value } }) => {
    setFilterTypes({ ...filtersTypes, [name]: value });
    const { title, city, type } = filtersTypes;
    const { data: products } = await myApi.get(`/products/search?title=${title}&city=${city}&type=${type}`);
    setSearchProducts(products);
  }

  const handelFilters = ({ target: { name, value } }) => {
    setFilterTypes({ ...filtersTypes, [name]: value });
  }

  const renderProducts = (products) => {
    return products.map((product) => {
      return <Card key={product._id} product={product} />
    })
  }

  const renderFilters = () => {
    const filters = FILTERS_ARRAY();
    return filters && filters.map((filter) => {
      return (<div key={filter.name}>
        <label htmlFor="title">{filter.name}</label>
        <Select array={filter.array} name={filter.name} onChange={handelFilters} />
      </div>)
    })

  }

  return (
    <Container>
      <div className="parent-search">
        <div className="search-bar-container">
          <SearchBar value={inputVal} onChange={({ target }) => setInputVal(target.value)} />
        </div>
        <div className="filters-container">
          <h3>Filters</h3>
          {renderFilters()}
          <button onClick={filtersSearchInDB}>filter search</button>
        </div>
        <div className="products-container">
          <FlexLeft>
            {searchedProducts.length ? renderProducts(searchedProducts) : allProducts.length ? renderProducts(allProducts) : <Spinner />}
          </FlexLeft>
        </div>
      </div>
    </Container>
  );
}

export default SearchProducts;