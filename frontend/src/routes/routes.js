import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "../providers/product.provider";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UpdateUser from "../pages/UpdateUser";
import AddUpdateProduct from "../pages/AddUpdateProduct/AddUpdateProduct";
import SearchProducts from "../pages/SearchProducts";
import Dashboard from "../pages/Dashboard";
import AuthRoute from "../routes/auth.route";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route element={<AuthRoute />}>
        <Route path="/UpdateUser" element={<UpdateUser />} />
        <Route
          path="/AddProduct"
          element={
            <ProductProvider>
              <AddUpdateProduct />
            </ProductProvider>
          }
        />
        <Route
          path="/UpdateProduct/:id"
          element={
            <ProductProvider>
              <AddUpdateProduct />
            </ProductProvider>
          }
        />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/SearchProducts" element={<SearchProducts />} />
    </Routes>
  );
}

export default AppRoutes;
