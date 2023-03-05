import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { cart, clearCart } = useContext(CartContext);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const handleLogout = () => {
    localStorage.clear();
    clearCart();
    navigate("/signin");
  };

  return (
    <header className="header">
      <h2 className="header__title">
        <Link to="/" className="header__logo" rel="noopener noreferrer">
          {username && <i className="fa-solid fa-house"></i>} js band store
        </Link>{" "}
        / <span className="fullname">Kostiantyn Ustymenko</span>
      </h2>
      {username && (
        <div className="info-header">
          <div className="info-header__buttons">
            <button
              type="button"
              className="info-header__cart"
              onClick={() => navigate("/cart")}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="info-header__count">{totalQuantity}</span>
            </button>
            <button className="info-header__btn" onClick={handleLogout}>
              Sign-Out
            </button>
          </div>
          <div className="info-header__user">
            <div className="info-header__avatar"></div>
            <span className="username">{username}</span>
          </div>
        </div>
      )}
    </header>
  );
}
