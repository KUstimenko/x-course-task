import React from "react";
import "./styles/main.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SpecificBook from "./pages/SpecificBook";
import BookList from "./pages/BookList";
import Signin from "./pages/Signin";
import BookContextProvider from "./context/BookContext";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./utils/scrollToTop";

export default function App() {
  return (
    <BookContextProvider>
      <HashRouter basename="/">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/specific-book/:id" element={<SpecificBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </BookContextProvider>
  );
}
