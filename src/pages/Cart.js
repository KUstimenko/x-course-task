import cart from "../utils/cart.svg";
import "../pages/cart.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { BookContext } from "../context/BookContext";

export default function Cart() {
  const navigate = useNavigate();
  const { books } = useContext(BookContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    const localCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (localCartItems) {
      setCartItems(localCartItems);
    }
  }, []);

  const handlePurchase = () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    setCartItems([]);
  };

  const total = cartItems.reduce(
    (acc, curr) => acc + curr.count * curr.price,
    0
  );

  return (
    <div className="cart">
      <div className="cart__header">
        <h2 className="cart__title">Shopping Cart</h2>
        <button
          className="cart__purchase-btn"
          onClick={handlePurchase}
          disabled={cartItems.length === 0}
        >
          Purchase
        </button>
      </div>
      {localStorage.getItem("cartItems") === "[]" ? (
        <div className="cart__info">
          <img src={cart} alt="cart" className="cart__img" />
          <h2 className="cart__text">Cart empty..</h2>
        </div>
      ) : (
        <div className="cart__content">
          <table className="cart__table">
            <thead>
              <tr>
                <th>Book name</th>
                <th>Count</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.count}</td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.count).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="cart__total">
                <td colSpan="3">Total price:</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
