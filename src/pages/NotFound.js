import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import "../pages/notfound.sass";

const NotFound = () => {
  const { username } = useContext(UserContext);
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
};
export default NotFound;
