import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book, quantity) => {
    const existingCartItem = cart.find((item) => item.book.id === book.id);
    let updatedQuantity = quantity;

    if (existingCartItem) {
      updatedQuantity += existingCartItem.quantity;
    }

    if (updatedQuantity > 42) {
      updatedQuantity = 42;
    } else if (updatedQuantity < 1) {
      updatedQuantity = 1;
    }

    const updatedCart = existingCartItem
      ? cart.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: updatedQuantity }
            : item
        )
      : [...cart, { book, quantity: updatedQuantity }];
    setCart(updatedCart);
  };

  const updateQuantity = (bookId, newQuantity) => {
    let updatedQuantity = newQuantity;

    if (updatedQuantity > 42) {
      updatedQuantity = 42;
    } else if (updatedQuantity < 1) {
      updatedQuantity = 1;
    }

    const updatedCart = cart.map((item) =>
      item.book.id === bookId ? { ...item, quantity: updatedQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter((item) => item.book.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
