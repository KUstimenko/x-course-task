import "./styles/main.sass";
import { Routes, Route, HashRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { BookContext } from "./context/BookContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SpecificBook from "./pages/SpecificBook";
import NotFound from "./pages/NotFound";
import BookList from "./pages/BookList";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";
import ScrollToTop from "./utils/scrollToTop";
import data from "./utils/books.json";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
    localStorage.setItem("username", name);
  };

  useEffect(() => {
    setBooks(data.books);
  }, []);

  return (
    <HashRouter>
      <UserContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}
      >
        <BookContext.Provider value={books}>
          <CartProvider>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route
                path="/signin"
                element={<Signin onLogin={handleLogin} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/book/:id"
                element={
                  <>
                    <SpecificBook />
                    <ScrollToTop />
                  </>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </CartProvider>
        </BookContext.Provider>
      </UserContext.Provider>
    </HashRouter>
  );
}
