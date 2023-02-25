// import React, { useContext } from "react";
import React from "react";
import { NavLink } from "react-router-dom";

// import { Link } from "react-router-dom";
import "../pages/notfound.css";
// import { UserContext } from "../context/UserContext"; // Import UserContext

export default function NotFound() {
  // const { user } = useContext(UserContext); // Add UserContext
  const username = sessionStorage.getItem("username");
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>404</h1>
        </div>
        <h2>We are sorry, Page not found!</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <NavLink to="/">
          {username ? "Go to Home" : "Sign in to continue"}
        </NavLink>
      </div>
    </div>
  );
}
