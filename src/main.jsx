import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './i18n';
import CartContext from '../Context/CartContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartContext>
    <BrowserRouter>
<HelmetProvider>

      <App />
</HelmetProvider>
    </BrowserRouter>
    </CartContext>
  </React.StrictMode>,
)
