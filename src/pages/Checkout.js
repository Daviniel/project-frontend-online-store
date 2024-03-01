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
    </>
  );
}

export default Checkout;
