import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/signin.css";

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(username.length < 4 || username.length > 16);
  }, [username]);

  const handleSignIn = (event) => {
    event.preventDefault();
    sessionStorage.setItem("username", username);
    localStorage.removeItem("cartItems");
    navigate("/");
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  return (
    <div className="profile">
      <div className="profile-img"></div>
      <div className="profile-box">
        <form>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label>Username</label>
          </div>
          <button
            className="profile__btn"
            disabled={buttonDisabled}
            onClick={handleSignIn}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign-In
          </button>
        </form>
      </div>
    </div>
  );
}
