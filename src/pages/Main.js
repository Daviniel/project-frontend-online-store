import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import Header from '../components/Header';
import {
  getCategories,
  getProductsFromCategory,
  getProductsFromQuery,
} from '../services/api';

function Main() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    categoriesList: [],
    queryInput: '',
    productList: [],
    containerHeight: '82vh',
    cartCount: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesList = await getCategories();
        setState((prevState) => ({ ...prevState, categoriesList }));
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchData();
  }, []);

  const adjustContainerHeight = (productList) => {
    const NUMBER_OF_PRODUCTS = 2;
    const containerHeight = productList.length > NUMBER_OF_PRODUCTS ? '100%' : '82vh';
    setState((prevState) => ({ ...prevState, containerHeight }));
  };

  const handleClick = async ({ target }) => {
    const { id } = target;
    try {
      const response = await getProductsFromCategory(id);
      const productList = response.results;
      setState((prevState) => ({ ...prevState, productList }));
      adjustContainerHeight(productList);
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
    }
  };

  const handleButton = async () => {
    const { queryInput } = state;
    try {
      const response = await getProductsFromQuery(queryInput);
      const productList = response.results;
      setState((prevState) => ({ ...prevState, productList }));
      adjustContainerHeight(productList);
    } catch (error) {
      console.error('Erro ao buscar produtos por consulta:', error);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCart = () => {
    const cartItems = localStorage.getItem('cartProducts');
    const cartCount = JSON.parse(cartItems).length;
    setState((prevState) => ({ ...prevState, cartCount }));
    localStorage.setItem('quant', cartCount);
  };

  const { categoriesList, queryInput, productList, containerHeight, cartCount } = state;

  return (
    <div>
      <Header cartCount={cartCount} />
      <main className="main">
        <aside className="categoriesList" style={{ overflowY: 'scroll', height: containerHeight }}>
          <h3>Categorias</h3>
          {categoriesList.map(({ id, name }) => (
            <div key={id}>
              <button type="button" data-testid="category" id={id} onClick={handleClick}>
                {name}
              </button>
            </div>
          ))}
        </aside>
        <section className="productShowroom">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <label htmlFor="queryInput">
            <input
              id="queryInput"
              data-testid="query-input"
              name="queryInput"
              onChange={handleChange}
              value={queryInput}
              type="text"
            />
            <button data-testid="query-button" type="button" onClick={handleButton}>
              Pesquisar
            </button>
          </label>
          <ul className={productList.length === 0 ? 'noProduct' : 'productList'}>
            {productList.length ? (
              productList.map((list) => (
                <CardProduct key={list.id} list={list} handleCart={handleCart} />
              ))
            ) : (
              <span>Nenhum produto foi encontrado</span>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Main;
