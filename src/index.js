import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'storeon/react';

import App from './App';
import { store } from './store';

import './styles/main.scss';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('app')
);
