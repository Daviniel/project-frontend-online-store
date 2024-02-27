import React from 'react';
import Header from '../components/Header';

const Main = ({ cartCount }) => {
  return (
    <>
      <div>
        <Header cartCount={cartCount} />
        <p data-testid='home-initial-message'>
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
      <ul>
        <span>Nenhum produto foi encontrado</span>
      </ul>
    </>
  );
};

export default Main;
