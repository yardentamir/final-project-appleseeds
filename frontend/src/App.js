import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import { GlobalProvider } from "./providers/global.provider";
import Routes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Header />
        <Routes />
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
