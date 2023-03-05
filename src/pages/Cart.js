import cartImg from "../img/cart.svg";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import withAuth from "../components/withAuth";
import "./cart.sass";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.book.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleRemove = (bookId) => {
    removeFromCart(bookId);
  };

  const handleClear = () => {
    clearCart();
  };

  const handleAdd = (book, quantity) => {
    addToCart(book, quantity);
  };

  const handleDecrease = (book) => {
    const existingCartItem = cart.find((item) => item.book.id === book.id);

    if (existingCartItem) {
      if (existingCartItem.quantity === 1) {
        removeFromCart(book.id);
      } else {
        addToCart(book, -1);
      }
    }
  };

  const renderCartItems = () => {
    return cart.map((item) => {
      const { id, author, title, price } = item.book;
      const quantity = item.quantity;
      const total = (price * quantity).toFixed(2);
      return (
        <div key={id} className="cart-item">
          <div className="cart-item__info">
            <div className="cart-item__title">{title}</div>
            <div className="cart-item__author">{author}</div>
          </div>
          <div className="cart-item__quantity">
            <button
              onClick={() => handleDecrease(item.book)}
              className="cart-item__btn"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleAdd(item.book, 1)}
              className="cart-item__btn"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="cart-item__price">${price}</div>
          <div className="cart-item__total">${total}</div>
          <div className="cart-item__remove">
            <button
              onClick={() => handleRemove(id)}
              className="cart-item__btn-remove"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="cart">
      <button
        className="cart__purchase"
        onClick={handleClear}
        disabled={cart.length === 0}
      >
        Purchase
      </button>
      <h2 className="cart__title">Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <div className="cart-header">
            <div className="cart-header__info">Book</div>
            <div className="cart-header__quantity">Quantity</div>
            <div className="cart-header__price">Price</div>
            <div className="cart-header__total">Total</div>
            <div className="cart-header__remove"></div>
          </div>
          <div className="cart-items">{renderCartItems()}</div>
          <div className="cart-footer">
            <div className="cart-total">
              Total: <span>${calculateTotal()}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="cart__info">
          <img src={cartImg} alt="cart" className="cart__img" />
          <h2 className="cart__text">Cart empty..</h2>
          <button className="cart__back" onClick={() => navigate("/")}>
            Back to the BookList
          </button>
        </div>
      )}
    </div>
  );
};

export default withAuth(CartPage);
