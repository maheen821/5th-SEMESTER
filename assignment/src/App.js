import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const toggleCart = () => {
    setShowCart(!showCart);
    setShowPaymentInfo(false);
    setPaymentSuccess(false);
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (paymentMethod === "Cash on Delivery") {
      setPaymentSuccess(true);
    } else if (paymentMethod === "Bank Transfer") {
      setShowPaymentInfo(true);
    } else if (paymentMethod === "Credit Card") {
      setPaymentSuccess(true);
    }
  };

  const confirmBankTransfer = () => {
    setPaymentSuccess(true);
    setShowPaymentInfo(false);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1><FaShoppingCart /> React Store</h1>
        <div className="cart" onClick={toggleCart}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cartItems.length}</span>
        </div>
      </header>

      {/* Product Cards */}
      <div className="card-container">
        {products.length > 0 ? (
          products.map((product) => (
            <motion.div
              key={product.id}
              className="card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: product.id * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={product.image} alt={product.title} />
              <h3>{product.title.slice(0, 28)}...</h3>
              <p className="price">${product.price}</p>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => addToCart(product)}>
                Add to Cart
              </motion.button>
            </motion.div>
          ))
        ) : (
          <h3 className="loading">Loading Products...</h3>
        )}
      </div>

      {/* Cart Popup */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="cart-popup"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4 }}
          >
            <div className="cart-header">
              <h4><FaShoppingCart /> Your Cart</h4>
              <button className="close-btn" onClick={toggleCart}>✖</button>
            </div>

            {cartItems.length > 0 || showPaymentInfo || paymentSuccess ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="cart-info">
                      <h4>{item.title.slice(0, 25)}...</h4>
                      <p>${item.price}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <hr />
                {cartItems.length > 0 && <h3>Total: ${total}</h3>}

                {/* Payment Section */}
                {!paymentSuccess && !showPaymentInfo && cartItems.length > 0 && (
                  <div className="payment-section">
                    <h4>Select Payment Method:</h4>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                    </select>
                    <motion.button whileTap={{ scale: 0.95 }} className="pay-btn" onClick={handlePayment}>
                      Pay Now
                    </motion.button>
                  </div>
                )}

                {/* Bank Transfer Info */}
                {showPaymentInfo && paymentMethod === "Bank Transfer" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: "15px", padding: "15px", borderRadius: "12px", background: "#e0f2fe", color: "#1e3a8a" }}
                  >
                    <h4>Bank Transfer Details</h4>
                    <p>Bank: ABC Bank</p>
                    <p>Account No: 1234567890</p>
                    <p>IFSC: ABCD0123456</p>
                    <motion.button whileTap={{ scale: 0.95 }} className="pay-btn" onClick={confirmBankTransfer} style={{ marginTop: "10px" }}>
                      Confirm Payment
                    </motion.button>
                  </motion.div>
                )}

                {/* Payment Success */}
                {paymentSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: "15px", padding: "15px", borderRadius: "12px", background: "#d1fae5", color: "#065f46", fontWeight: 600, textAlign: "center" }}
                  >
                    Payment Successful! ✅
                  </motion.div>
                )}
              </div>
            ) : (
              <p className="empty-cart">Your cart is empty.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
