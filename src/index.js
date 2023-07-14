import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextComponent, { AuthContext } from './context/authContextComponent';
import { Web3ContextProvider } from './context/web3Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextComponent>
    <Web3ContextProvider>
      <Router>
        <App />
      </Router>
    </Web3ContextProvider>
  </AuthContextComponent>
);

reportWebVitals();