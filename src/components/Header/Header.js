import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.removeItem("username");
    navigate("/signin");
  };

  return (
    <header className="header">
      <h2 className="header__title">
        <Link to="/" className="header__logo" rel="noopener noreferrer">
          {username && <i className="fa-solid fa-house"></i>} js band store
        </Link>{" "}
        {username && (
          <>
            / <span className="username">{username}</span>
          </>
        )}
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
