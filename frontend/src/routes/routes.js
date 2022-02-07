import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "../providers/product.provider";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UpdateUser from "../pages/UpdateUser";
import AddUpdateProduct from "../pages/AddUpdateProduct/AddUpdateProduct";
import SearchItems from "../pages/SearchItems";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
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
        path="/UpdateProduct"
        element={
          <ProductProvider>
            <AddUpdateProduct />
          </ProductProvider>
        }
      />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/SearchItems" element={<SearchItems />} />
    </Routes>
  );
}

export default AppRoutes;
