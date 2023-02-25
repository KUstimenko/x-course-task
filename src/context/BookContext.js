import React, { createContext, useState, useEffect } from "react";
import booksData from "../pages/books.json";

export const BookContext = createContext(null);

export default function BookContextProvider(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const localBooks = JSON.parse(localStorage.getItem("books"));
    if (localBooks) {
      setBooks(localBooks);
    } else {
      setBooks(booksData.books);
      localStorage.setItem("books", JSON.stringify(booksData.books));
    }
  }, []);

  return (
    <BookContext.Provider value={{ books }}>
      {props.children}
    </BookContext.Provider>
  );
}
