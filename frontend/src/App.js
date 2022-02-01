import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import { UserProvider } from "./providers/user";
import Routes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
