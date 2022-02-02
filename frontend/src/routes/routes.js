import React from "react";
import { Routes, Route } from "react-router-dom";
// import { ProductProvider } from "../providers/product.provider";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UpdateUser from "../pages/UpdateUser";
import AddItem from "../pages/AddItem/AddItem";
import SearchItems from "../pages/SearchItems";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/UpdateUser" element={<UpdateUser />} />
      <Route path="/AddItem" element={<AddItem />} />
      <Route path="/SearchItems" element={<SearchItems />} />
    </Routes>
  );
}

export default AppRoutes;
