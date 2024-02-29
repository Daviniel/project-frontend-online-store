import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function CarBtn ({ cartCount }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    handleCart();
  }, [cartCount]);

  const handleCart = () => {
    if (!cartCount) {
      const cartItems = localStorage.getItem('quant');
      setCount(cartItems || 0);
    } else {
      setCount(cartCount);
    }
  };

  return (
    <Link data-testid='shopping-cart-button' to='/shoppingcart' className="cartLink">
      <div>
        <img src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="Cart icon." />
        {Number(count) !== 0 && (
          <div>
            <span data-testid="shopping-cart-size">{count}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

CarBtn.propTypes = {
  cartCount: PropTypes.string,
};

export default CarBtn;
