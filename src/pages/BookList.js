import React, { useState, useEffect, useContext } from "react";
import "../pages/booklist.css";
import imageNotFound from "../utils/imageNotFound.png";
import { BookContext } from "../context/BookContext";
import { useNavigate } from "react-router-dom";

export default function BookList() {
  const { books } = useContext(BookContext);
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleSearch = (event) => {
    const search = event.target.value.toLowerCase();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(search)
    );
    setFilteredBooks(filteredBooks);
    setSearch(search);
    setSearchNotFound(filteredBooks.length === 0);
  };

  const handlePriceFilter = (event) => {
    const selectedPrice = event.target.value;
    const filteredBooks =
      selectedPrice === "all"
        ? books
        : books.filter((book) => {
            if (selectedPrice === "0-15") {
              return book.price > 0 && book.price < 15;
            } else if (selectedPrice === "15-30") {
              return book.price >= 15 && book.price < 30;
            } else if (selectedPrice === "30+") {
              return book.price >= 30;
            }
            return [];
          });

    setFilteredBooks(filteredBooks);
    setSearchNotFound(filteredBooks.length === 0);
  };

  const handleImageError = (event) => {
    event.target.src = imageNotFound;
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  const handleClear = () => {
    setFilteredBooks(books);
    setSearch("");
    setSearchNotFound(false);
  };

  return (
    <div className="main">
      <div className="main__search search">
        <form action="#" className="search__content">
          <input
            autoComplete="off"
            required
            type="text"
            name="search"
            className="search__input"
            placeholder="Search by book name"
            onChange={handleSearch}
            value={search}
          />
          {search && (
            <button type="button" className="clear__btn" onClick={handleClear}>
              <i className="fa-solid fa-close"></i>
            </button>
          )}
          <button type="button" className="search__btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="main__filter filter-price">
          <select
            name="select-price"
            id="select-price"
            required
            onChange={handlePriceFilter}
          >
            <option value="all">All </option>
            <option value="0-15">$0 - $15</option>
            <option value="15-30">$15 - $30</option>
            <option value="30+">$30 and above</option>
          </select>
        </div>
      </div>
      {searchNotFound && (
        <div className="search__not-found">Nothing found...🙄</div>
      )}

      <div className="books-list container">
        {filteredBooks.map((book) => (
          <figure className="books-item" key={book.id}>
            <div className="books-image ibg">
              <img
                src={book.image || imageNotFound}
                alt={book.title}
                className="books-img"
                onError={handleImageError}
              />
            </div>
            <div className="books">
              <h2 className="books__title">{truncateText(book.title, 24)}</h2>
              <p className="books__author">{book.author}</p>
              <div className="books__details">
                <span className="books__price">${book.price}</span>
                <button
                  className="books__btn"
                  onClick={() => navigate("/specific-book/" + book.id)}
                >
                  View
                </button>
              </div>
            </div>
          </figure>
        ))}
      </div>
      <div></div>
    </div>
  );
}
