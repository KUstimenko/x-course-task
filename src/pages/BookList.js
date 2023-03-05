import React, { useContext, useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent";
import SortComponent from "../components/SortComponent";
import { BookContext } from "../context/BookContext";
import withAuth from "../components/withAuth";
import BookItem from "../components/BookItem";
import "../pages/bookslist.sass";
import TypedText from "../utils/TypedText";

const BookList = () => {
  const books = useContext(BookContext);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("All");

  useEffect(() => {
    let filteredBooksCopy = books;
    if (sortOption === "0-15") {
      filteredBooksCopy = books.filter((book) => book.price < 15);
    } else if (sortOption === "15-30") {
      filteredBooksCopy = books.filter(
        (book) => book.price >= 15 && book.price < 30
      );
    } else if (sortOption === "30+") {
      filteredBooksCopy = books.filter((book) => book.price >= 30);
    }

    filteredBooksCopy = filteredBooksCopy.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBooks(filteredBooksCopy);
  }, [books, searchTerm, sortOption]);

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="main">
      <div className="search-and-sort">
        <SearchComponent
          handleSearch={handleSearch}
          handleClear={handleClear}
        />
        <SortComponent handleSort={handleSort} />
      </div>
      {filteredBooks.length === 0 && (
        <div className="search__not-found">{<TypedText />}</div>
      )}
      <div className="container">
        <div className="books-list">
          {filteredBooks.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(BookList);
