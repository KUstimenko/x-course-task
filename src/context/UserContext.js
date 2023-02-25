import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = (props) => {

  const [auth, setAuth] = useState(false);
  useEffect(() => { 
    const username = localStorage.getItem('username');
    if (username) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [])
  
  return (
    <UserContext.Provider value={{ auth, setAuth }}>
    { props.children }
    </UserContext.Provider>
  )
}
  
//     const savedUser = localStorage.getItem("user");
//     localStorage.removeItem("user"); // remove the saved user here
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const handleSignOut = () => {
//     setUser(null);
//     localStorage.removeItem("cartItems");
//     localStorage.removeItem("user");
//     window.location.href = "/signin"; // redirect to signin page
//   };

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const contextValue = { user, setUser, handleSignOut };

//   return <UserContext.Provider value={contextValue} {...props} />;
// }

// import React, { createContext, useState, useEffect } from "react";

// export const UserContext = createContext(null);

// export function UserProvider(props) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const handleSignOut = () => {
//     setUser(null);
//     localStorage.removeItem('cartItems');
//     localStorage.removeItem("user");
//     window.location.href = "/signin"; // redirect to signin page
//   };

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const contextValue = { user, setUser, handleSignOut };

//   return <UserContext.Provider value={contextValue} {...props} />;
// }

// import React, { createContext, useState, useEffect } from "react";

// export const UserContext = createContext(null);

// export function UserProvider(props) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const handleSignOut = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     window.location.href = "/signin"; // redirect to signin page
//   };

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const contextValue = { user, setUser, handleSignOut };

//   return <UserContext.Provider value={contextValue} {...props} />;
// }

// export function UserProvider(props) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const handleSignOut = () => {
//     setUser(null);
//     localStorage.removeItem("cartItems");
//     localStorage.removeItem("books"); // видалення книг з localstorage
//     localStorage.removeItem("user");
//     window.location.href = "/signin";
//   };

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const contextValue = { user, setUser, handleSignOut };

//   return <UserContext.Provider value={contextValue} {...props} />;
// }
