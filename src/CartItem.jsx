import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ setCount, onContinueShopping }) => {

  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (setCount) {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCount(totalItems);
    }
  }, [cart, setCount]); // Depend on Redux cart state to trigger updates


  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      let cost = parseFloat(item.cost.substring(1));
      let quantity = item.quantity;
      total += cost * quantity;
    });
    return total;

  };


  const handleContinueShopping = (e) => {
    if (typeof onContinueShopping === "function") {
      onContinueShopping(e); // Calls the function passed from the parent component
    }
  };


  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Make sure you pass just the name!
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let cost = parseFloat(item.cost.substring(1));
    return cost * item.quantity; // Return calculated subtotal
  };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => { handleDecrement(item); setCount((count) => count - 1) }}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => { handleIncrement(item); setCount((count) => count + 1) }}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => { handleRemove(item); setCount((count) => count - 1) }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => handleCheckoutShopping()}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


