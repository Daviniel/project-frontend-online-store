import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Header from '../components/Header';

function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);

  useEffect(() => {
    createListItem();
  }, []);

  const addItem = (product) => {
    let cartItem = localStorage.getItem('cartProducts');
    cartItem = JSON.parse(cartItem);
    cartItem.push(product);
    localStorage.setItem('cartProducts', JSON.stringify(cartItem));
  };

  const removeItem = (product) => {
    let cartItem = localStorage.getItem('cartProducts');
    cartItem = JSON.parse(cartItem);

    let delIndex = 0;
    const lastFoundIndex = () => {
      cartItem.forEach((x, i) => {
        if (x.id === product.id) {
          delIndex = i;
        }
      });
    };

    lastFoundIndex();

    cartItem.splice(delIndex, 1);
    localStorage.setItem('cartProducts', JSON.stringify(cartItem));
  };

  const handleClick = (event) => {
    const { value, name } = event.target;
    if (name === 'add') {
      addItem(JSON.parse(value));
    } else {
      removeItem(JSON.parse(value));
    }
    createListItem();
    handleCart();
  };

  const createListItem = () => {
    let cartItems = localStorage.getItem('cartProducts');
    cartItems = JSON.parse(cartItems);
    const set = new Set();
    const filteredProducts = cartItems.filter((ele) => {
      const items = JSON.stringify(ele);
      return !set.has(items) && set.add(items);
    });

    setFilterProducts(filteredProducts);
    setProducts(cartItems);
  };

  const handleCart = () => {
    const cartItems = localStorage.getItem('cartProducts');
    const count = JSON.parse(cartItems).length;
    setCartCount(count);
    localStorage.setItem('quant', count);
  };

  const handleRedirectToCheckout = () => {
    setRedirectToCheckout(true);
  };

  if (redirectToCheckout) {
    return <Redirect to="/checkout" />;
  }

  return (
    <div>
      <Header cartCount={cartCount} />
      <main className="cartMain">
        {!products.length ? (
          <div>
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          </div>
        ) : (
          <>
            {filterProducts.map((element) => (
              <CartItem
                key={element.id}
                handle={handleClick}
                product={element}
                count={
                  products.reduce((acc, curr) => {
                    if (curr.id === element.id) {
                      acc += 1;
                    }
                    return acc;
                  }, 0)
                }
              />
            ))}
            <button
              data-testid="checkout-products"
              type="button"
              onClick={handleRedirectToCheckout}
              className="final-button"
            >
              Finalizar compra
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default ShoppingCart;
