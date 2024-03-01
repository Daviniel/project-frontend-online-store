import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FreeShipping from './FreeShipping';

function CardProduct ({ list, handleCart }) {
  const handleClick = useCallback(() => {
    let cart = localStorage.getItem('cartProducts');
    cart = JSON.parse(cart);
    const value = list;

    if (!cart) {
      localStorage.setItem('cartProducts', JSON.stringify([value]));
    } else {
      cart.push(value);
      localStorage.setItem('cartProducts', JSON.stringify(cart));
    }

    handleCart();
  }, [handleCart, list]);

  const { title, thumbnail, price, shipping: { free_shipping: freeShipping } } = list;

  return (
    <div className="singleCardProduct">
      <Link to={`/product/${list.id}`} data-testid="product-detail-link" className="cardProduct">
        <li data-testid="product">
          <img src={thumbnail} alt={title} />
          <div className="productCardInfo">
            <span>{title}</span>
            <FreeShipping freeShipping={freeShipping} price={price} />
          </div>
        </li>
      </Link>
      <button
        type="button"
        data-testid="product-add-to-cart"
        onClick={handleClick}
        className="addCartBtn"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

CardProduct.propTypes = {
  handleCart: PropTypes.func.isRequired,
  list: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }),
  }).isRequired,
};

export default CardProduct;
