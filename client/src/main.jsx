import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx' // <--- ¿Tienes esta línea?
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>   {/* <--- ¿Tienes esta etiqueta envolviendo a App? */}
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)