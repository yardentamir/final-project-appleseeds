import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlexLeft } from "../components/styles/Flex.styled";
import { Container } from '../components/styles/Container.styled';
import { headersToken } from "../utils/functions.utils";
import Card from "../components/Card";
import myApi from "../api/Api";
import "./styles/Dashboard.css";

function Dashboard() {

  const [allUserProducts, setAllUserProducts] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data: products } = await myApi.get("/products/loadProductsByUserId", headersToken(token));
        setAllUserProducts(products);
      } catch (err) {
        console.log(err)
      }
    }
    getAllProducts();
  }, [token, deletedProduct]);

  const handleDelete = async ({ target: { id } }) => {
    const { data } = await myApi.delete(`/products/deleteProduct/${id}`, headersToken(token));
    setDeletedProduct(data);
  }

  const renderProducts = () => {
    return allUserProducts.map((product) => {
      return <Card key={product._id} id={product._id} product={product} onClick={handleDelete} />
    })
  }

  return (
    <Container>
      <div className="controllers-wrapper">
        <p>add your new lost/found product</p>
        <Link to="/AddProduct">
          <button className="btn-dashboard">Add product</button>
        </Link>
      </div>
      <FlexLeft>
        {renderProducts()}
      </FlexLeft>
    </Container>
  )
}

export default Dashboard;