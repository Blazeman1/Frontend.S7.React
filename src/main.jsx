import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.css'

// Punto de entrada de la aplicación: monta el componente raíz <App />
// dentro del <div id="root"> definido en index.html, usando la API
// moderna de React 18 (createRoot) en modo StrictMode para detectar
// problemas potenciales durante el desarrollo.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
