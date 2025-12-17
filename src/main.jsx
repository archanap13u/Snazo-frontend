import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the Global CSS we created in the previous step
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <div class="bg-animation">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    </div>
    <App />
  </React.StrictMode>
);