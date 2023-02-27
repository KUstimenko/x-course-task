import React, { useState, useEffect, useContext } from "react";
import "../pages/specificbook.css";
import { useParams, useNavigate } from "react-router-dom";
import imageNotFound from "../utils/imageNotFound.png";
import { BookContext } from "../context/BookContext";

export default function SpecificBook() {
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const { books } = useContext(BookContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (books.length > 0) {
      const selectedBook = books.find((book) => book.id === parseInt(id));
      setBook(selectedBook);
    }
  }, [books, id]);

  useEffect(() => {
    setTotal(quantity * book.price);
  }, [book, quantity]);

  function increaseQuantity() {
    if (quantity < 42) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleImageError = (event) => {
    event.target.src = imageNotFound;
  };

  const addToCart = () => {
    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = existingItems.find((item) => item.id === book.id);
    if (existingItem) {
      const newCartItem = {
        ...existingItem,
        count: existingItem.count + quantity,
      };
      const newCartItems = existingItems.map((item) =>
        item.id === existingItem.id ? newCartItem : item
      );
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItem = { ...book, count: quantity };
      const newCartItems = [...existingItems, newCartItem];
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  return (
    <div className="specific-book">
      <div className="book container">
        <div className="book__img">
          <img
            src={book.image || imageNotFound}
            alt={book.title}
            onError={handleImageError}
          />
        </div>
        <div className="book__info">
          <h2 className="book__title">
            <strong>Book name:</strong> <br />
            {book.title}
          </h2>
          <p className="book__text">
            <strong>Book author:</strong> <br />
            {book.author}
          </p>
          <p className="book__text">
            <strong>Book level:</strong> begginner
          </p>
          <p className="book__text">
            <strong>Book tags:</strong> core
          </p>
        </div>
        <form action="" className="book__form form-book">
          <div className="form-book__price row">
            <label htmlFor="book-price">Price, $</label>
            <span id="price" disabled>
              {book.price}
            </span>
          </div>
          <div className="form-book__count count row">
            <label htmlFor="count__label">Count</label>
            <div className="count__wrapper">
              <div className="count__box1">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="42"
                  placeholder="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="count__box2">
                <div className="count__up">
                  <button
                    type="button"
                    id="increase"
                    onClick={increaseQuantity}
                  >
                    <i className="fa-solid fa-caret-up"></i>
                  </button>
                </div>
                <div className="count__down">
                  <button
                    type="button"
                    id="decrease"
                    onClick={decreaseQuantity}
                  >
                    <i className="fa-solid fa-caret-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-book__total row">
            <label htmlFor="total-price">Total price, $</label>
            <span type="text" id="total" disabled>
              {total.toFixed(2)}
            </span>
          </div>
          <div className="btn">
            <button
              className="form-book__btn"
              type="button"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>
      <div className="description-book container">
        <h2 className="description-book__title">Description:</h2>
        <p className="description-book__text">{book.description}</p>
      </div>
    </div>
  );
}
