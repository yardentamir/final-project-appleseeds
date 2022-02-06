import React, { useState, useEffect } from 'react';
import { Container } from '../components/styles/Container.styled';
import { FlexLeft } from '../components/styles/Flex.styled';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import myApi from "../api/Api";
import "./styles/SearchItems.css";

function SearchItems() {

  const [allProducts, setAllProducts] = useState([]);

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

  return (
    <Container>
      <SearchBar />
      <FlexLeft>
        {renderProducts()}
      </FlexLeft>
    </Container>
  );
}

export default SearchItems;