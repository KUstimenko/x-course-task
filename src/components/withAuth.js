import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  const AuthWrapper = (props) => {
    const { username } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      if (!storedUsername) {
        navigate("/signin");
      }
    }, [username, navigate]);

    return <Component {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
