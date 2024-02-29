import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartBtn from './CartBtn';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <div className="logoTitle">
        <Link to="/">
          <img src="https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png" alt="Store logo." />
        </Link>
        <h1>Front-End Online Store</h1>
      </div>
      <CartBtn cartCount={cartCount} />
    </header>
  );
};

Header.propTypes = {
  cartCount: PropTypes.string,
};

export default Header;
