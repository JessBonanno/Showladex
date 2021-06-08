import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { RootProvider } from './context/RootContext';

ReactDOM.render(
  <RootProvider>
    <App />
  </RootProvider>,
  document.getElementById('root'),
);
