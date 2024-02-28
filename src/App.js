import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ProductPage from './pages/ProductPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={ Main } />
        <Route
            exact
            path="/product/:id"
            Component={ (props) => <ProductPage { ...props } /> }
          />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
