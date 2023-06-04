import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TranslateProvider } from './context/TranslateContext';
import reportWebVitals from './reportWebVitals';
// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
const root = ReactDOM.createRoot(document.getElementById('root'));
// const data = TranslateProvider()
// console.log('index.js', data)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TranslateProvider>
          <App />
        </TranslateProvider>
      </AuthProvider>
      <NotificationContainer/>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
