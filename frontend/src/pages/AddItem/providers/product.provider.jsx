import { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [product, setProduct] = useState({});

  return (
    <ProductContext.Provider value={{ product, setProduct }}>{children}</ProductContext.Provider>
  )

};