import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

// Test rendering a portal **and** a main component into root.
ReactDOM.render(<App modalRoot={rootElement} />, rootElement);
registerServiceWorker();
