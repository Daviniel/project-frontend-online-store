import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');
const rootElement = createRoot(root);

const startApp = async () => {
  rootElement.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

startApp();

// Restante do código permanece inalterado
serviceWorker.unregister();
