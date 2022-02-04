import { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [product, setProduct] = useState({});
  const [pictureContext, setPictureContext] = useState({});

  return (
    <ProductContext.Provider value={{ product, setProduct, pictureContext, setPictureContext }}>{children}</ProductContext.Provider>
  )
};