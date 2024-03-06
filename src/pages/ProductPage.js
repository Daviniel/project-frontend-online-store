import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import FreeShipping from '../components/FreeShipping';
import Header from '../components/Header';
import Rating from '../components/Rating';
import { getProductsFromId } from '../services/api';

function ProductPage() {
    const { id } = useParams();
    const [state, setState] = useState({
        email: '',
        evaluation: '',
        rating: '',
        productResume: [],
        arraylenght: true,
        cartCount: '',
        thumbnail: '',
        price: '',
        title: '',
        result: '',
        freeShipping: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getProductsFromId(id);
                const { thumbnail, price, title, shipping } = result;
                const { free_shipping: freeShipping } = shipping;

                setState((prevState) => ({
                    ...prevState,
                    thumbnail,
                    price,
                    title,
                    result,
                    freeShipping,
                }));

                if (!localStorage.getItem(id)) {
                    localStorage.setItem(id, '[]');
                    setState((prevState) => ({
                        ...prevState,
                        arraylenght: false,
                    }));
                }

                const aval = localStorage.getItem(id);
                const aval1 = JSON.parse(aval);

                setState((prevState) => ({
                    ...prevState,
                    productResume: aval1,
                }));

                handleCart();
            } catch (error) {
                console.error('Erro ao buscar dados do produto:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleCLick = (event) => {
        let { value } = event.currentTarget;
        let cart = localStorage.getItem('cartProducts');
        cart = JSON.parse(cart);
        value = JSON.parse(value);

        if (!cart) {
            localStorage.setItem('cartProducts', JSON.stringify([value]));
        } else {
            cart.push(value);
            localStorage.setItem('cartProducts', JSON.stringify(cart));
        }

        handleCart();
    };

    const handleAvaliation = () => {
        const { email, evaluation, rating } = state;
        const productEvaluation = { email, evaluation, rating };

        const aval = localStorage.getItem(id);
        const aval1 = JSON.parse(aval);

        setState((prevState) => ({
            ...prevState,
            productResume: aval1,
            email: '',
            evaluation: '',
            rating: '',
            arraylenght: true,
        }));

        setState((prevState) => ({
            ...prevState,
            productResume: [...prevState.productResume, productEvaluation],
        }));

        const { productResume } = state;
        localStorage.setItem(id, JSON.stringify(productResume));
    };

    const onChange = ({ target }) => {
        const { value, name } = target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCart = () => {
        const cartItems = localStorage.getItem('cartProducts');
        const cartCount = JSON.parse(cartItems).length;
        setState((prevState) => ({
            ...prevState,
            cartCount,
        }));
        localStorage.setItem('quant', cartCount);
    };

    const {
        thumbnail,
        price,
        title,
        result,
        email,
        evaluation,
        productResume,
        arraylenght,
        cartCount,
        freeShipping,
    } = state;

    return (
        <>
            <Header cartCount={cartCount} />
            <main className="productPageMain">
                <aside>
                    <img src={thumbnail} alt={title} />
                </aside>
                <section>
                    <h1 data-testid="product-detail-name">{title}</h1>
                    <FreeShipping price={price} freeShipping={freeShipping} />
                    <button
                        type="button"
                        data-testid="product-detail-add-to-cart"
                        onClick={handleCLick}
                        value={JSON.stringify(result)}
                    >
                        Adicionar ao Carrinho
                    </button>
                    <div className="rate">
                        <p>Avaliação: </p>
                        <span>Nome: </span>
                        <input
                            data-testid="product-detail-email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="namefield"
                        />
                        <span>Comentário:</span>
                        <textarea
                            data-testid="product-detail-evaluation"
                            type="text"
                            name="evaluation"
                            value={evaluation}
                            onChange={onChange}
                            className="txtareafield"
                        />
                        <span>Nota: </span>
                        <Rating onChangeFuncProp={onChange} />
                        <button
                            data-testid="submit-review-btn"
                            onClick={handleAvaliation}
                            type="button"
                        >
                            Submit
                        </button>
                    </div>
                </section>
                <section className="avaliations">
                    <h3>Avaliações</h3>
                    {arraylenght && (
                        productResume.map((elemento) => (
                            <section key={elemento.email} className="avaliations">
                                Email:
                                <span key={elemento.email}>{elemento.email}</span>
                                Avaliação:
                                <span>{elemento.evaluation}</span>
                                Nota:
                                <span>{elemento.rating}</span>
                                <hr />
                            </section>
                        ))
                    )}
                </section>
            </main>
        </>
    );
}

ProductPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default ProductPage;
