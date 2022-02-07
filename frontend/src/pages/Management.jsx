import React, { useState, useEffect } from 'react';
import { FlexLeft } from "../components/styles/Flex.styled";
import { Container } from '../components/styles/Container.styled';
import Card from "../components/Card";
import myApi from "../api/Api";

function Management() {

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
      <FlexLeft>
        {renderProducts()}
      </FlexLeft>
    </Container>
  )
}

export default Management;