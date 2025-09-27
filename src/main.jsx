import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { BrowserRouter } from 'react-router-dom'
import "./config/global.jsx"
import AuthContext from './contexts/Auth.jsx'
import CartProvider from './contexts/Cart.jsx'
import NewsLatterProvider from './contexts/NewsLetter.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <CartProvider>
          <NewsLatterProvider>
            <App />
          </NewsLatterProvider>
        </CartProvider>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>
)