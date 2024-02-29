import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function CarBtn ({ cartCount })  {
    const [localCartCount, setLocalCartCount] = useState(0);

    useEffect(() => {
        handleCart();
    }, [cartCount]);

    const handleCart = () => {
        if (!cartCount) {
            const storedCartCount = localStorage.getItem('quant') || 0;
            setLocalCartCount(Number(storedCartCount));
        } else {
            setLocalCartCount(Number(cartCount));
        }
    };

    return (
        <Link data-testid='shopping-cart-button' to='/shoppingcart' className="cartLink">
            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="Cart icon." />
                {localCartCount !== 0 && (
                    <div>
                        <span data-testid="shopping-cart-size">{localCartCount}</span>
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
