import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { UserProvider } from "./context/user";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/SignUp" exact element={<SignUp />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
