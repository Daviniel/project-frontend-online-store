import React from 'react';
import Header from '../components/Header';

export default function Main() {
    return(
        <div>
            <Header cartCount={ cartCount } />
            <p data-testid='home-initial-message' > Digite algum termo de pesquisa ou escolha uma categoria.</p>
        </div>
    );
};