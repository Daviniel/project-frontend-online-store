import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={ Main } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
