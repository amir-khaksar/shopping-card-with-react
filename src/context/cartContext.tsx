import React, { createContext, useEffect, useState } from "react";
import { product } from "../Components/Products.types";
import axios from "axios";

type CartContextProviderProps = {
  children: React.ReactNode;
};

type CartContextType = {
  UserCart: product[];
  addProduct: (id: number) => void;
  removeProduct: (id: number) => void;
  removeAll: () => void;
  shop: product[];
};

export const CartContext = createContext({} as CartContextType);

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [UserCart, setUserCart] = useState<product[]>([]);
  const [shop, setShop] = useState<product[]>([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setShop(response.data);
    });
  }, []);

  const addProduct = (id: number) => {
    setUserCart((prevProduct) => {
      const mainProductInCart = UserCart.find((product) => product.id === id);

      if (mainProductInCart) {
        return prevProduct.map((product) => {
          if (product.id === id) {
            return { ...product, count: product.count + 1 };
          } else {
            return product;
          }
        });
      } else {
        const mainProductInShop = shop.find(
          (product) => product.id === id
        ) as product;
        return [...prevProduct, { ...mainProductInShop, count: 1 }];
      }
    });
  };
  const removeProduct = (id: number) => {
    setUserCart((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };
  const removeAll = () => setUserCart([]);

  return (
    <CartContext.Provider
      value={{ addProduct, removeProduct, removeAll, shop, UserCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
