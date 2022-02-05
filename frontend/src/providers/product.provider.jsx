import { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [product, setProduct] = useState({});
  const [pictureContext, setPictureContext] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <ProductContext.Provider value={{ product, setProduct, pictureContext, setPictureContext, isSubmitted, setIsSubmitted }}>{children}</ProductContext.Provider>
  )
};