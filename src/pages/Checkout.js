import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function Checkout() {
    const [state, setState] = useState({
        listCheckout: [],
        fullName: '',
        email: '',
        cpf: '',
        cep: '',
        phone: '',
        fullAddress: '',
        fullPrice: 0,
        cartItems: [],
    });
    
    useEffect(() => {
        createListItem();
    }, []);
    
    const createListItem = () => {
        let cartItems = localStorage.getItem('cartProducts');
        cartItems = JSON.parse(cartItems);
        const fullPrice = cartItems.reduce((acc, curr) => {
            acc += curr.price;
            return acc;
        }, 0);
        const set = new Set();
        const listCheckout = cartItems.filter((ele) => {
            const items = JSON.stringify(ele);
            return !set.has(items) && set.add(items);
        });
        setState((prevState) => ({
            ...prevState,
            listCheckout,
            cartItems,
            fullPrice,
        }));
    };
    
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };
    
    const countItems = (id, cartItems) => cartItems
        .reduce((acc, curr) => {
          if (curr.id === id) {
            acc += 1;
          }
          return acc;
    }, 0);
    
    const redirectToCheckout = () => {
        // Implemente a lógica para o pagamento aqui
        // Pode ser redirecionamento para uma página de pagamento ou outra ação desejada
        console.log('Realizando o pagamento...');
        
        // Simulando um pagamento concluído após 2 segundos
        setTimeout(() => {
          setCheckout(); // Chama a função setCheckout após o pagamento ser concluído
        }, 2000);
    };
    
    const setCheckout = () => {
        // Lógica para ser executada após o pagamento ser concluído
        console.log('Pagamento concluído!');
    
        // Exemplo: Redirecionar para outra página
        // history.push('/order-confirmation');
    };
    
    const {
        listCheckout,
        cartItems,
        fullName,
        email,
        cpf,
        cep,
        phone,
        fullAddress,
        fullPrice,
    } = state;

  return (
    <>
        <Header />
        <main className="checkout-main">
            <section>
            <h3>Revise seus produtos: </h3>
            {listCheckout.map(({ id, thumbnail, title, price }) => (
                <div key={id} className="checkout-product">
                <img src={thumbnail} alt={title} />
                <p>{title}</p>
                <p>{`${countItems(id, cartItems)} uni.`}</p>
                <p>{`R$ ${Number(this.countItems(id, cartItems) * price).toFixed(2).replace('.', ',')}`}</p>
                </div>
            ))}
            <div className="totalCheckout">
                <p>{`Total: R$ ${Number(fullPrice).toFixed(2).replace('.', ',')}`}</p>
            </div>
            </section>
            <form className="checkoutForm">
            <h3>Informações do comprador</h3>
            <label htmlFor="userFullName">
                <h5>Nome completo</h5>
                <input
                data-testid="checkout-fullname"
                id="userFullName"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                />
            </label>
            {/* Restante do seu formulário */}
            <button type="button" onClick={redirectToCheckout}>
                Comprar
            </button>
            </form>
        </main>
    </>
  );
}

export default Checkout;
