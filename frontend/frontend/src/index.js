import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 syntax
import './index.css';
import RoutesSetup from './App'; // Import the RoutesSetup component for routing
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesSetup /> {/* Render RoutesSetup, which contains routing */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
