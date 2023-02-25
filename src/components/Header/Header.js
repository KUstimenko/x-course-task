import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { UserContext } from "../../context/UserContext";

export default function Header() {
  // const { user, handleSignOut } = useContext(UserContext);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.removeItem("username");
    // localStorage.removeItem("cartItems");
    navigate("/signin");
  };

  return (
    <header className="header">
      <h2 className="header__title">
        <Link to="/" className="header__logo" rel="noopener noreferrer">
          js band store
        </Link>{" "}
        {username && (
          <>
            /{" "}
            <span className="username">
              {sessionStorage.getItem("username")}
            </span>
          </>
        )}
      </h2>
      {username && (
        <div div className="info-header">
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
          <div className="info-header__avatar"></div>
          <span className="username">{sessionStorage.getItem("username")}</span>
        </div>
      )}
    </header>
  );
}
