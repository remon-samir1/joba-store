import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import CartContext from '../Context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartContext>
    <BrowserRouter>

      <App />
    </BrowserRouter>
    </CartContext>
  </React.StrictMode>,
)
