import "../pages/specificbook.sass";
import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { BookContext } from "../context/BookContext";
import imageNotFound from "../img/imageNotFound.png";
import withAuth from "../components/withAuth";

const SpecificBook = () => {
  const { cart, addToCart } = useContext(CartContext);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState({});
  const [total, setTotal] = useState(0);
  const books = useContext(BookContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (books.length > 0) {
      const selectedBook = books.find((book) => book.id === parseInt(id));
      if (selectedBook) {
        setBook(selectedBook);
      } else {
        navigate("/notfound");
      }
    }
  }, [books, id, navigate]);

  useEffect(() => {
    const existingCartItem = cart.find((item) => item.book.id === book.id);
    if (existingCartItem) {
      setCartQuantity(existingCartItem.quantity);
    }
  }, [cart, book.id]);

  const handleQuantityChange = (e) => {
    let newQuantity = parseInt(e.target.value);
    if (newQuantity > 42) {
      newQuantity = 42;
    } else if (newQuantity < 1) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setCartQuantity(quantity + cartQuantity);
  };

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

  return (
    <div className="container">
      <div className="specific-book">
        <div className="book">
          <div className="book__img">
            <img
              src={book.image || imageNotFound}
              alt={book.title}
              onError={handleImageError}
            />
          </div>
          <div className="book__info">
            <h2 className="book__title">{book.title}</h2>
            <p className="book__text">{book.author}</p>
            <p className="book__description">{book.shortDescription}</p>
          </div>
          <form action="" className="book__form form-book">
            <div className="form-book__info">
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
                      value={quantity}
                      onChange={handleQuantityChange}
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
            </div>
            <div className="btn">
              <button
                className="form-book__btn"
                type="button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <div className="added-to-cart">
              <span className="added-to-cart__text">
                Added to cart: {cartQuantity}
              </span>
            </div>
          </form>
        </div>
        <div className="description-book">
          <h2 className="description-book__title">Description:</h2>
          <p className="description-book__text">{book.description}</p>
        </div>
      </div>
    </div>
  );
};
export default withAuth(SpecificBook);
