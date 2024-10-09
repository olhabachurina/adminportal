import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Используем createRoot
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);