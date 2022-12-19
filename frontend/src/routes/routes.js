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

import {
  HOME_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  UPDATE_USER_PATH,
  ADD_PRODUCT_PATH,
  UPDATE_PRODUCT_PATH,
  DASHBOARD_PATH,
  SEARCH_PRODUCTS_PATH,
} from "./routes.constants";

function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME_PATH} element={<Home />} />
      <Route path={SIGN_IN_PATH} element={<SignIn />} />
      <Route path={SIGN_UP_PATH} element={<SignUp />} />
      <Route element={<AuthRoute />}>
        <Route path={UPDATE_USER_PATH} element={<UpdateUser />} />
        <Route
          path={ADD_PRODUCT_PATH}
          element={
            <ProductProvider>
              <AddUpdateProduct />
            </ProductProvider>
          }
        />
        <Route
          path={UPDATE_PRODUCT_PATH + "/:id"}
          element={
            <ProductProvider>
              <AddUpdateProduct />
            </ProductProvider>
          }
        />
        <Route path={DASHBOARD_PATH} element={<Dashboard />} />
      </Route>
      <Route path={SEARCH_PRODUCTS_PATH} element={<SearchProducts />} />
    </Routes>
  );
}

export default AppRoutes;
