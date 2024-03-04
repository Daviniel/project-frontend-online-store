import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Header from '../components/Header';

function Checkout() {
  const [listCheckout, setListCheckout] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [fullPrice, setFullPrice] = useState(0);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [phone, setPhone] = useState('');
  const [fullAddress, setFullAddress] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    createListItem();
  }, []);

  const createListItem = () => {
    let storedCartItems = localStorage.getItem('cartProducts');
    storedCartItems = JSON.parse(storedCartItems);
    
    const totalPrice = storedCartItems.reduce((acc, curr) => acc + curr.price, 0);
    
    const uniqueProducts = Array.from(new Set(storedCartItems.map(JSON.stringify)))
      .map((stringified) => JSON.parse(stringified));

    setListCheckout(uniqueProducts);
    setCartItems(storedCartItems);
    setFullPrice(totalPrice);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'cpf':
        setCpf(value);
        break;
      case 'cep':
        setCep(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'fullAddress':
        setFullAddress(value);
        break;
      default:
        break;
    }
  };

  const countItems = (id) => cartItems
    .reduce((acc, curr) => (curr.id === id ? acc + 1 : acc), 0);

  const handleBuy = () => {
    // Lógica de pagamento aqui
    // Após o pagamento, pode redirecionar para uma página de confirmação
    navigate('/confirmation');
  };

  return (
    <>
      <Header />
      <main className="checkout-main">
        <section>
          <h3>Revise seus produtos:</h3>
          {listCheckout.map(({ id, thumbnail, title, price }) => (
            <div key={id} className="checkout-product">
              <img src={thumbnail} alt={title} />
              <p>{title}</p>
              <p>{`${countItems(id)} uni.`}</p>
              <p>{`R$ ${Number(countItems(id) * price).toFixed(2).replace('.', ',')}`}</p>
            </div>
          ))}
          <div className="totalCheckout">
            <p>{`Total: R$ ${fullPrice.toFixed(2).replace('.', ',')}`}</p>
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
              value={ fullName }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="userEmail">
            <h5>Email</h5>
            <input
              data-testid="checkout-email"
              id="userEmail"
              name="email"
              value={ email }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="userCpf">
            <h5>CPF</h5>
            <input
              data-testid="checkout-cpf"
              id="userCpf"
              name="cpf"
              value={ cpf }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="userPhone">
            <h5>Telefone</h5>
            <input
              data-testid="checkout-phone"
              id="userPhone"
              name="phone"
              value={ phone }
              onChange={  handleChange }
            />
          </label>
          <label htmlFor="userCep">
            <h5>CEP</h5>
            <input
              data-testid="checkout-cep"
              id="userCep"
              name="cep"
              value={ cep }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="userFullAddress">
            <h5>Endereço</h5>
            <input
              data-testid="checkout-address"
              id="userFullAddress"
              name="fullAddress"
              value={ fullAddress }
              onChange={ handleChange }
            />
          </label>


          <button type="button" onClick={handleBuy}>
            Comprar
          </button>
        </form>
      </main>
    </>
  );
}

export default Checkout;
