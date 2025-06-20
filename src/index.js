import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Notifications from './components/Notification/notifications';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Notifications inUI={true} />
    <App />
  </React.StrictMode>
);

reportWebVitals();
