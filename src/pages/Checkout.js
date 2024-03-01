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
      </main>
    </>
  );
}

export default Checkout;
