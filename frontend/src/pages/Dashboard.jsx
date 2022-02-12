import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FlexLeft } from "../components/styles/Flex.styled";
import { Container } from '../components/styles/Container.styled';
import { headersToken } from "../utils/functions.utils";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import myApi from "../api/Api";
import "./styles/Dashboard.css";

function Dashboard() {

  const [allUserProducts, setAllUserProducts] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState({});

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data: products } = await myApi.get("/products/loadProductsByUserId", headersToken(token));
        setAllUserProducts(products);
      } catch (err) {
        console.log(err)
      }
    }
    token && getAllProducts();
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
    <Modal condition={!token} onClick={() => navigate('/')} title="Please Sign in" text="you must sign in before to post">
      <Container>
        <div className="controllers-wrapper">
          <p>add your new lost/found product</p>
          <Link to="/AddProduct">
            <button className="btn-dashboard">Add product</button>
          </Link>
        </div>
        <div className="titles-wrapper">
          <h3>your lost /founds products that you posted</h3>
        </div>
        <FlexLeft>
          {token ? allUserProducts === "empty" ? <div>There is no posts</div> : allUserProducts.length > 0 ? renderProducts() : <Spinner /> : <div></div>}
        </FlexLeft>
      </Container>
    </Modal>
  )
}

export default Dashboard;