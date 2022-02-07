import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "../providers/product.provider";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UpdateUser from "../pages/UpdateUser";
import AddItem from "../pages/AddItem/AddItem";
import SearchItems from "../pages/SearchItems";
import Management from "../pages/Management";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/UpdateUser" element={<UpdateUser />} />
      <Route
        path="/AddItem"
        element={
          <ProductProvider>
            <AddItem />
          </ProductProvider>
        }
      />
      <Route path="/Management" element={<Management />} />
      <Route path="/SearchItems" element={<SearchItems />} />
    </Routes>
  );
}

export default AppRoutes;
