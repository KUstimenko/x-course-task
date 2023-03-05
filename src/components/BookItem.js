import React from "react";
import imageNotFound from "../img/imageNotFound.png";
import { Link } from "react-router-dom";

const BookItem = ({ book }) => {
  const truncateTitle = (title) => {
    if (title.length > 24) {
      return title.slice(0, 24) + "...";
    }
    return title;
  };

  return (
    <figure key={book.id} className="books-item">
      <div className="books-image ibg">
        <img
          src={book.image || imageNotFound}
          alt={book.title}
          className="books-img"
        />
      </div>
      <div className="books">
        <h2 className="books__title">{truncateTitle(book.title)}</h2>
        <p className="books__author">{book.author}</p>
        <div className="books__details">
          <span className="books__price">${book.price}</span>
          <Link to={`/book/${book.id}`}>
            <button className="books__btn">View</button>
          </Link>
        </div>
      </div>
    </figure>
  );
};

export default BookItem;
